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
import { id } from "pdfkit/js/reference";
import RequestsHours from "../models/RequestsHours";
import UserRepository from "../repositories/UserRepository";
import LogsRequestHours from "../models/LogsRequestHours";
import LogsRequestHoursRepository from "../repositories/LogsRequestHoursRepository";
import AdminRepository from "../repositories/AdminRepository";

interface DataProps{
  hour: number;
  calculatedHours: number;
  typeHourId: string;
  optionHourId: string;
  emissionDate: Date;
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



    const dataStates = await statesRepository.find({ where: {
      name: 'Enviado'
    }});
    const dataStudent = await studentRepository.findOne({
      where: {
        user_id: payload?.sub
      }
    })
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
      inputEmpty(data.optionHourId);


      const requestHoursSave = requestHoursRepository.create({
        type_hour_id: data.typeHourId,
        state_id: dataStates[0].id,
        solicitation_id: responseSolicitation.id.toString(),
        file_id: responseFiles[0].id.toString(),
        especify_type_hour_id: data.optionHourId,
        hour: data.hour,
        calculated_hours: 0,
        eventType: 1, //EVENTO EXTERNO
        dateOfIssue: data.emissionDate
      })
      await requestHoursRepository.save(requestHoursSave);
    }

    if(typeof(object) === "object"){
      object.map(async(item: string, index: number)=>{
        const data: DataProps = JSON.parse(item)
        console.log(data)
        const requestHoursSave = requestHoursRepository.create({
          type_hour_id: data.typeHourId,
          state_id: dataStates[0].id,
          especify_type_hour_id: data.optionHourId,
          solicitation_id: responseSolicitation.id.toString(),
          file_id: responseFiles[index].id.toString(),
          hour: data.hour,
          calculated_hours: 0,
          eventType: 1, //EVENTO EXTERNO
          dateOfIssue: data.emissionDate
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

    console.log(id)
    const allRequestHours = await requestHoursRepository.find({
      where: {
        solicitation_id: id
      }
    })
    console.log(allRequestHours)
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
        id: item.id,
        states_id: item.state_id,
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

    return response.json(RequestHour_Views.renderMany(requestHoursInfo))
  }
  async allRequestHours(request: Request, response: Response) {
    const requestHoursRepository = getCustomRepository(RequestHoursRepository);


    const allRequestHours = await requestHoursRepository.find()
    console.log(allRequestHours)
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



    const requestHoursInfo = requestHours.map((item)=>{
      const requestHour = {
        id: item.id,
        states_id: item.state_id,
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

    return response.json(RequestHour_Views.renderMany(requestHoursInfo))
  }

  async downloadFiles(request: Request, response: Response) {
    const fileRepository = getCustomRepository(FileRepository);

    const multer = require("multer");
    const path = require("path");

   const file = path.join(__dirname, '..', '..', `uploads/${fileRepository}`)
    response.download(file)

  }

async requestNext(request: Request, response: Response) {
    const requestHoursRepository = getCustomRepository(RequestHoursRepository);
    const statesRepository = getCustomRepository(StatesRepository);
    const especifyRepository = getCustomRepository(EspecifyTypeHourRepository)
    const adminRepository = getCustomRepository(AdminRepository);
    const logsRequestHours = getCustomRepository(LogsRequestHoursRepository);
    const { calculated_hours, comments, status } = request.body;
    const { id } = request.params;


    const requestHoursInfo = await requestHoursRepository.findOne({
      where: {
        id: id
      }
    })

    const authHeader = request.headers.authorization || "";

    const [, token] = authHeader?.split(" ");

    const payload = decode(token);

    const requestInfoAdmin = await adminRepository.findOne({
      where: {
        user_id: payload?.sub
      }
    })

    const requestInfoStatus = await statesRepository.findOne({
      where: {
        id: status
      }
    })

    if(requestInfoStatus?.name === "Negado") {
      await requestHoursRepository.createQueryBuilder("requestsHours")
      .update({
        state_id: status
      })
      .where(
        { id: id }
      ).updateEntity(true).execute();

    }else {
      const allStates = ["Negado",
      "Enviado",
      "Em análise pelo auxiliar de Coordenação",
      "Em análise pela coordenação",
      "Em análise pela secretaria",
      "Aprovado",]

      const requestEspecifyStatus = await statesRepository.findOne({
        where: {
          id: requestHoursInfo?.state_id
        }
      })

      for (let index = 0; index < allStates.length; index++) {
        if(requestEspecifyStatus?.name === allStates[index]){
          console.log(allStates[index+1])
          const requestNext = await statesRepository.findOne({
            where: {
              name: allStates[index+1]
            }
          })

          await requestHoursRepository.createQueryBuilder("requestsHours")
          .update({
            state_id: requestNext?.id
          })
          .where(
            { id: id }
          ).updateEntity(true).execute();
        }

      }

    }

    const createLogs = await logsRequestHours.create({
      calculated_hours: calculated_hours,
      dateOfIssue: requestHoursInfo?.dateOfIssue,
      comments: comments,
      especify_type_hour_id: requestHoursInfo?.especify_type_hour_id,
      eventType: requestHoursInfo?.eventType,
      file_id: requestHoursInfo?.file_id,
      updated_by_admin_id: requestInfoAdmin?.id,
      hour: requestHoursInfo?.hour,
      solicitation_id: Number(requestHoursInfo?.solicitation_id),
      type_hour_id: requestHoursInfo?.type_hour_id,
      state_id: requestHoursInfo?.state_id,
    })
    const responseLogs = await logsRequestHours.save(createLogs);


    return response.json(responseLogs)

  }

}

export default new RequestHoursController();




