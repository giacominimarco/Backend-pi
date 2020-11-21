import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import RequestHoursRepository from '../repositories/RequestHoursRepository';
import SolicitationRepository from '../repositories/Solicitation';
import FileRepository from '../repositories/FileReposity';

class RequestHoursController {

  async createRequestHour(request: Request, response: Response) {
    const requestHoursRepository = getCustomRepository(RequestHoursRepository);
    const solicitationRepository = getCustomRepository(SolicitationRepository);
    const fileRepository = getCustomRepository(FileRepository);

    const { typeHourId, stateId, userId, hour, calculatedHours, description, order } = request.body;

    console.log(order, description);
    const solicitation = solicitationRepository.create({
      order,
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


    console.log(responseFiles[0].id)

    const requestHoursSave = requestHoursRepository.create({
      user_id: userId,
      type_hour_id: typeHourId,
      state_id: stateId,
      solicitation_id: responseSolicitation.id,
      file_id: responseFiles[0].id.toString(),
      hour,
      calculated_hours: calculatedHours
    })

    const responseRequestHour = await requestHoursRepository.save(requestHoursSave);

    // const existUser = await userRepository.findOne({ email });
    // if (existUser) {
    //   return response.status(400).json({ message: "Usuário já cadastrado!" });
    // }

    // const existsRoles = await roleRepository.findByIds(roles);

    // const requestFiles = request.files as Express.Multer.File[];
    // const files = requestFiles.map(file => {
    //   return { path: file.filename}
    // })

    // const responseUser =  await userRepository.save(user);
    // console.log(responseUser.id)

    // const infoStudent = studentRepository.create({
    //   user_id: responseUser.id,
    //   registration,
    //   course,
    //   team,
    //   college,
    // });




    return response.status(201).json(responseRequestHour);
  }

}

export default new RequestHoursController();




