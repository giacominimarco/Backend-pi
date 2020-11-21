import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TypeHourRepository from '../repositories/TypeHours';

class TypeHourController {

  async createTypeHour(request: Request, response: Response) {
    const typeHourRepository = getCustomRepository(TypeHourRepository);

    const { name, description } = request.body;

    const typeHour = typeHourRepository.create({
      name,
      description
    });

    const responseTypeHour =  await typeHourRepository.save(typeHour);


    return response.status(201).json(responseTypeHour);
  }

}

export default new TypeHourController();



