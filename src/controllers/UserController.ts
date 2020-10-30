import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import RoleRepository from "../repositories/RoleRepository";
import StudentRepository from "../repositories/StudentRepository";
import AdminRepository from "../repositories/AdminRepository";

class UserController {
  // index(req: Request, res: Response) {
  //   return res.send({ userID: req.userId });
  //   // return res.json({message: 'testeeeeeeee'});
  // }
  async index(request: Request, response: Response) {
    const alluser = getCustomRepository(UserRepository);
    const users = await alluser.find();
    return response.json(users);
  }

  //Função para pesquisar um usuário específico do banco de dados
  async indexOne(request: Request, response: Response) {
    const userInfo = getCustomRepository(UserRepository);
    const studentRepository = getCustomRepository(StudentRepository);
    const { id } = request.params;
    console.log(id);
    const user = await userInfo.findOne({
      where: {
        id: id,
      },
    });
    const studentInfo = await studentRepository.findOne({
      where: {
        user_id: id,
      },
    });

    if (user === null) {
      return response.status(422).send({ message: "Não existe este usuário" });
    }
    const dataUser = {
      name: user?.name,
      lastName: user?.last_name,
      email: user?.email,
      registration: studentInfo?.registration,
      team: studentInfo?.team,
      college: studentInfo?.college

    }
    return response.status(200).send({ user: dataUser });
  }

  async createStudent(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const roleRepository = getCustomRepository(RoleRepository);
    const studentRepository = getCustomRepository(StudentRepository);

    const { name, lastName, email,
      registration, phone, course,
      college, password, cpf, bornDate, roles, team } = request.body;

    const existUser = await userRepository.findOne({ email });
    if (existUser) {
      return response.status(400).json({ message: "Usuário já cadastrado!" });
    }

    const existsRoles = await roleRepository.findByIds(roles);

    const user = userRepository.create({
      name,
      last_name: lastName,
      email,
      phone,
      born_date: bornDate,
      password,
      cpf,
      roles: existsRoles,
    });

    const responseUser =  await userRepository.save(user);
    console.log(responseUser.id)

    const infoStudent = studentRepository.create({
      user_id: responseUser.id,
      registration,
      course,
      team,
      college,
    });

    await studentRepository.save(infoStudent);


    return response.status(201).json(user);
  }

  async createAdmin(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const roleRepository = getCustomRepository(RoleRepository);
    const adminRepository = getCustomRepository(AdminRepository);
    //Inserir ao cadastrar a roles de administrador.

    const { name, lastName, email,
      registration, phone, job,
      college, password, cpf, bornDate, roles } = request.body;
    console.log(request.body);

    const existUser = await userRepository.findOne({ email });
    if (existUser) {
      return response.status(400).json({ message: "Usuário já cadastrado!" });
    }

    const existsRoles = await roleRepository.findByIds(roles);

    const user = userRepository.create({
      name,
      last_name: lastName,
      email,
      phone,
      born_date: bornDate,
      password,
      cpf,
      roles: existsRoles,
    });

    const responseUser = await userRepository.save(user);


    const infoAdmin = adminRepository.create({
      user_id: responseUser.id,
      registration,
      job,
      college
    });

    const responseAdmin = await adminRepository.save(infoAdmin);

    const adminData = {
      name: responseUser.name,
      lastName: responseUser.last_name,
      email: responseUser.email,
      phone: responseUser.phone,
    }

    return response.status(201).json(adminData);
  }

}

export default new UserController();



