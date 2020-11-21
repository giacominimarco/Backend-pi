import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import StatesRepository from '../repositories/StatesRepository';

class StateController {

  async createState(request: Request, response: Response) {
    const statesRepository = getCustomRepository(StatesRepository);

    const { name, description } = request.body;

    const state = statesRepository.create({
      name,
      description
    });

    const responseState =  await statesRepository.save(state);


    return response.status(201).json(responseState);
  }

}

export default new StateController();



