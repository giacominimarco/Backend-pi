import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import RoleRepository from "../repositories/RoleRepository";

class UserController {
  index(req: Request, res: Response) {
    return res.send({ userID: req.userId });
    // return res.json({message: 'testeeeeeeee'});
  }
  async create(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const roleRepository = getCustomRepository(RoleRepository);

    const { name, lastName, email,
      registration, phone, course,
      classe, college, password,bornDate, roles, } = request.body;


    const existUser = await userRepository.findOne({ email });
    if (existUser) {
      return response.status(400).json({ message: "Usuário já cadastrado!" });
    }

    const existsRoles = await roleRepository.findByIds(roles);

    const user = userRepository.create({
      name,
      last_name: lastName,
      email,
      registration,
      phone,
      course,
      classe,
      college,
      born_date: bornDate,
      password,
      roles: existsRoles,
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  }
}

export default new UserController();



