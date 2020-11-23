import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import RequestHoursRepository from '../repositories/RequestHoursRepository';
import SolicitationRepository from '../repositories/Solicitation';
import FileRepository from '../repositories/FileReposity';
import { decode } from "jsonwebtoken";
import StatesRepository from "../repositories/StatesRepository";

interface DataProps{
  hour: number;
  calculatedHours: number;
  typeHourId: string;
}

class RequestHoursController {

  async createRequestHour(request: Request, response: Response) {
    const requestHoursRepository = getCustomRepository(RequestHoursRepository);
    const solicitationRepository = getCustomRepository(SolicitationRepository);
    const fileRepository = getCustomRepository(FileRepository);
    const statesRepository = getCustomRepository(StatesRepository)
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

    console.log(dataStates)
    const solicitation = solicitationRepository.create({
      user_id: payload?.sub,
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
      console.log(data.typeHourId)
      inputEmpty(data.hour);
      inputEmpty(data.calculatedHours);

      const requestHoursSave = requestHoursRepository.create({
        type_hour_id: data.typeHourId,
        state_id: dataStates[0].id,
        solicitation_id: responseSolicitation.id,
        file_id: responseFiles[0].id.toString(),
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
          solicitation_id: responseSolicitation.id,
          file_id: responseFiles[index].id.toString(),
          hour: data.hour,
          calculated_hours: data.calculatedHours,
        })
        await requestHoursRepository.save(requestHoursSave);
      })
    }

     return response.status(201).send({message: `Pedido efetuado com sucesso!`});
  }

}

export default new RequestHoursController();




