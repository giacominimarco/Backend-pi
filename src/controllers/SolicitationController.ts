import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import SolicitationRepository from "../repositories/Solicitation";
import StudentRepository from "../repositories/StudentRepository";

class SolicitationController {

  async indexForUser(request: Request, response: Response) {
    const allSolicitation = getCustomRepository(SolicitationRepository);
    const studentRepository = getCustomRepository(StudentRepository)
    const authHeader = request.headers.authorization || "";

    const [, token] = authHeader?.split(" ");

    const payload = decode(token);
    console.log(payload)
    const searchIdStudent = await studentRepository.findOne({
      where: {
        user_id: payload?.sub
      }
    })
    const searchInSolicitation = await allSolicitation.find(
      {
        where: {
          student_id: searchIdStudent?.id
        }
      }
    )
    console.log(searchInSolicitation)
    return response.json(searchInSolicitation);
  }
}

export default new SolicitationController();



