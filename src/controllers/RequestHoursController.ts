import { Request, Response } from "express";
import { getCustomRepository, In } from "typeorm";
import RequestHoursRepository from '../repositories/RequestHoursRepository';
import SolicitationRepository from '../repositories/Solicitation';
import FileRepository from '../repositories/FileReposity';
import { decode } from "jsonwebtoken";
import StatesRepository from "../repositories/StatesRepository";
import StudentRepository from "../repositories/StudentRepository";
import EspecifyTypeHourRepository from "../repositories/EspecifyTypeHourRepository";
import RequestHour_Views from "../views/RequestHour_Views";

interface DataProps{
  hour: number;
  calculatedHours: number;
  typeHourId: string;
  optionHourId: string;
}

class RequestHoursController {

  async createRequestHour(request: Request, response: Response) {
    const requestHoursRepository = getCustomRepository(RequestHoursRepository);
    const solicitationRepository = getCustomRepository(SolicitationRepository);
    const fileRepository = getCustomRepository(FileRepository);
    const statesRepository = getCustomRepository(StatesRepository);
    const studentRepository = getCustomRepository(StudentRepository)
    const { description, object } = request.body;

    const authHeader = request.headers.authorization || "";

    const [, token] = authHeader?.split(" ");

    const payload = decode(token);

    function inputEmpty(item: any){
      if(item === '' || item === null || item === undefined){
        return response.status(400).send({message: `Precisa preencher todos os campos`});
      }
    }
    inputEmpty(description);
    inputEmpty(object);

    console.log(object)

    const dataStates = await statesRepository.find({ where: {
      name: 'Enviado'
    }});
    const dataStudent = await studentRepository.findOne({
      where: {
        user_id: payload?.sub
      }
    })
    console.log(dataStates)
    const solicitation = solicitationRepository.create({
      student_id: dataStudent?.id,
      description
    });

    const responseSolicitation = await solicitationRepository.save(solicitation);

    const requestFiles = request.files as Express.Multer.File[];

    const files = requestFiles.map(file => {
      return { path: file.filename}
    })

    const filesSave = fileRepository.create(
      files,
    );

    const responseFiles = await fileRepository.save(filesSave);

    if(typeof(object) === "string"){
      const data: DataProps = JSON.parse(object)
      inputEmpty(data.hour);
      inputEmpty(data.calculatedHours);
      inputEmpty(data.optionHourId);


      const requestHoursSave = requestHoursRepository.create({
        type_hour_id: data.typeHourId,
        state_id: dataStates[0].id,
        solicitation_id: responseSolicitation.id.toString(),
        file_id: responseFiles[0].id.toString(),
        especify_type_hour_id: data.optionHourId,
        hour: data.hour,
        calculated_hours: data.calculatedHours,
      })
      await requestHoursRepository.save(requestHoursSave);
    }

    if(typeof(object) === "object"){
      object.map(async(item: string, index: number)=>{
        const data: DataProps = JSON.parse(item)
        const requestHoursSave = requestHoursRepository.create({
          type_hour_id: data.typeHourId,
          state_id: dataStates[0].id,
          especify_type_hour_id: data.optionHourId,
          solicitation_id: responseSolicitation.id.toString(),
          file_id: responseFiles[index].id.toString(),
          hour: data.hour,
          calculated_hours: data.calculatedHours,
        })
        await requestHoursRepository.save(requestHoursSave);
      })
    }

     return response.status(201).send({message: `Pedido efetuado com sucesso!`});
  }
  async indexRequestHour(request: Request, response: Response) {
    const requestHoursRepository = getCustomRepository(RequestHoursRepository);
    const solicitationRepository = getCustomRepository(SolicitationRepository);
    const fileRepository = getCustomRepository(FileRepository);
    const statesRepository = getCustomRepository(StatesRepository);
    const studentRepository = getCustomRepository(StudentRepository);
    const especifyRepository = getCustomRepository(EspecifyTypeHourRepository)
    const { id } = request.params;


    const allRequestHours = await requestHoursRepository.find({
      where: {
        solicitation_id: id
      }
    })
    const allFileId = allRequestHours.map((item) => item.file_id)

    const requestHours = await requestHoursRepository
      .createQueryBuilder(`requestsHours`)
      .leftJoinAndSelect("requestsHours.upload_file", "File")
      .where({
      file_id: In(allFileId),
      })
      .leftJoinAndSelect("requestsHours.states", "States")
      .leftJoinAndSelect("requestsHours.typeHours", "TypeHours")
      .leftJoinAndSelect("requestsHours.solicitation", "Solicitation")
      .leftJoinAndSelect("Solicitation.infoStudent", "InfoStudent")
      .leftJoinAndSelect("InfoStudent.users", "User")
      .getMany()

    const requestHoursInfo = requestHours.map((item,index)=>{

      const requestHour = {
        name: item.solicitation.infoStudent.users.name,
        lastName: item.solicitation.infoStudent.users.last_name,
        registration: item.solicitation.infoStudent.registration,
        course: item.solicitation.infoStudent.course,
        team: item.solicitation.infoStudent.team,
        dateRequisition: item.created_at,
        typeHour: item.typeHours.name,
        hour: item.hour,
        file: item.upload_file
      }
      return requestHour
    })

    return response.json(RequestHour_Views.render(requestHoursInfo[0]))
  }

}

export default new RequestHoursController();




