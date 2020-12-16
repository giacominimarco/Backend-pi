import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import LogsRequestHoursRepository from "../repositories/LogsRequestHoursRepository";

class LogsRequestController {
  async getLogForRequest(request: Request, response: Response) {
    const logRequestRepository = getCustomRepository(LogsRequestHoursRepository)
    const { id } = request.params;
    console.log(id)
    const allLogsForRequest = await logRequestRepository.createQueryBuilder(`logsRequestHours`)
    .where({
      request_hour_id: id
    })
    .leftJoinAndSelect("logsRequestHours.upload_file", "File")
    .leftJoinAndSelect("logsRequestHours.states", "States")
    .leftJoinAndSelect("logsRequestHours.typeHours", "TypeHours")
    .leftJoinAndSelect("logsRequestHours.solicitation", "Solicitation")
    .leftJoinAndSelect("Solicitation.infoStudent", "InfoStudent")
    .leftJoinAndSelect("InfoStudent.users", "User")
    .getMany()

    const send = {
      title: "Enviado",
      description: "Sem comentários"
    }
    if(allLogsForRequest.length === 0){
      return response.json([send]);
    }
    else{
      const status = [
        'Enviado',
        'Em análise pelo auxiliar de Coordenação',
        'Em análise pela coordenação',
        'Em análise pela secretaria',
        'Aprovado'
      ]
      const allLogsResponse = allLogsForRequest.map((item, index)=>{
        const allLogs = {
          title: item.states.name === status[index] ? status[index+1] : status[index],
          description: item.comments,
          createdAt: item.created_at
        }
        return allLogs
      })
      const logsOrdened = allLogsResponse.sort((a,b)=>b.createdAt.getTime()-a.createdAt.getTime());
      const set = [...logsOrdened, send]
      return response.json(set);

    }

  }
}

export default new LogsRequestController();
