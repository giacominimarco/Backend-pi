import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import RequestHoursRepository from "../repositories/RequestHoursRepository";
import SolicitationRepository from "../repositories/Solicitation";
import TypeHourRepository from '../repositories/TypeHours';

class SolicitationController {

  async indexForUser(request: Request, response: Response) {
    const allRequestsHours = getCustomRepository(RequestHoursRepository);
    const allSolicitation = getCustomRepository(SolicitationRepository)
    const authHeader = request.headers.authorization || "";

    const [, token] = authHeader?.split(" ");

    const payload = decode(token);

    const searchInRequestHours = await allRequestsHours.find({
      where: {
        user_id: payload?.sub
      }
    });
    const solicitationIds = searchInRequestHours.map((item)=>item.solicitation_id)

    const searchInSolicitation = await allSolicitation.findByIds(
      solicitationIds
    )



    return response.json(searchInSolicitation);
  }



}

export default new SolicitationController();



