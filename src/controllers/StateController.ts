import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import StatesRepository from '../repositories/StatesRepository';

class StateController {

  async createNewState(request: Request, response: Response) {
    const statesRepository = getCustomRepository(StatesRepository);

    const { name, description } = request.body;

    const state = statesRepository.create({
      name,
      description
    });

    const responseState =  await statesRepository.save(state);


    return response.status(201).json(responseState);
  }

  async createState(request: Request, response: Response) {
    const statesRepository = getCustomRepository(StatesRepository);

    const allStates = [
      'Negado',
      "Enviado",
      "Em análise pelo auxiliar de Coordenação",
      "Em análise pela coordenação",
      "Em análise pela secretaria",
      "Aprovado"
    ]

    const createAll = allStates.map((item)=>{
      const states = statesRepository.create({
        name: item,
        description: item,
      });
      return states
    })

    const responseState =  await statesRepository.save(createAll);


    return response.status(201).json(responseState);
  }

}

export default new StateController();



