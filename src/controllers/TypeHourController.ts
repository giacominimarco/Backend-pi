import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import TypeHourRepository from '../repositories/TypeHours';

class TypeHourController {

  async createNewTypeHour(request: Request, response: Response) {
    const typeHourRepository = getCustomRepository(TypeHourRepository);

    const { name, description } = request.body;

    const typeHour = typeHourRepository.create({
      name,
      description
    });

    const responseTypeHour =  await typeHourRepository.save(typeHour);


    return response.status(201).json(responseTypeHour);
  }

  async index(request: Request, response: Response) {
    const typeHour = getCustomRepository(TypeHourRepository);
    const typeHours = await typeHour.find();

    return response.json(typeHours);
  }

  async createTypeHour(request: Request, response: Response) {
    const typeHourRepository = getCustomRepository(TypeHourRepository);

    const allTypeHours = ['Ensino', 'Pesquisa', 'Extensão']

    const createAll = allTypeHours.map((item)=>{
      const typeHour = typeHourRepository.create({
        name: item,
        description: item,
      });
      return typeHour
    })

    const responseTypeHour =  await typeHourRepository.save(createAll);


    return response.status(201).json(responseTypeHour);
  }

}

export default new TypeHourController();



