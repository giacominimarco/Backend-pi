import { Request, Response } from "express";
import { getCustomRepository, In } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import RoleRepository from "../repositories/RoleRepository";
import StudentRepository from "../repositories/StudentRepository";
import AdminRepository from "../repositories/AdminRepository";
import UserHourRepository from "../repositories/UserHourRepository";
import { decode } from "jsonwebtoken";
import { data } from "pdfkit/js/reference";

class UserController {

  async index(request: Request, response: Response) {
    const alluser = getCustomRepository(UserRepository);
    const allStudent = getCustomRepository(StudentRepository);
    const users = await alluser.find();
    const usersIds = users.map((user)=>user.id)

    const students = await allStudent.createQueryBuilder(`infoStudent`)
    .leftJoinAndSelect("infoStudent.users", "User").where({
      user_id: In(usersIds),
    }).getMany()

    const studentsInfo = students.map((student)=>{
      const userInfo = {
        name: student.users.name,
        last_name: student.users.last_name,
        email: student.users.email,
        phone: student.users.phone,
        registration: student.registration,
        team: student.team,
        course: student.course,
      }
      return userInfo
    })


    return response.json(studentsInfo);
  }

  //Função para pesquisar um usuário específico do banco de dados
  async indexOne(request: Request, response: Response) {
    const userInfo = getCustomRepository(UserRepository);
    const studentRepository = getCustomRepository(StudentRepository);
    const { id } = request.params;
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
      college: studentInfo?.college,
      phone: user?.phone,
      bornDate: user?.born_date,
      course: studentInfo?.course
    }
    return response.status(200).send({ user: dataUser });
  }
  async getTotalHoursOfStudent(request: Request, response: Response) {
    const userInfo = getCustomRepository(UserRepository);
    const studentRepository = getCustomRepository(StudentRepository);
    const userHourRepository = getCustomRepository(UserHourRepository);

    const { id } = request.params;
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
    const userHourInfo = await userHourRepository.findOne({
      where:{
        student_id: studentInfo?.id
      }
    })
    if (user === null) {
      return response.status(422).send({ message: "Não existe este usuário" });
    }

    const allHours = {
      teaching: userHourInfo?.max_teaching,
      extension: userHourInfo?.max_extension,
      research: userHourInfo?.max_research,
    }

    return response.status(200).send(allHours);
  }

  async createStudent(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const roleRepository = getCustomRepository(RoleRepository);
    const studentRepository = getCustomRepository(StudentRepository);
    const userHourRepository = getCustomRepository(UserHourRepository)
    const { name, lastName, email,
      registration, phone, course,
      college, password, cpf, bornDate, team, yearOfEntry } = request.body;

    const existUser = await userRepository.findOne({ email });
    if (existUser) {
      return response.status(400).json({ message: "Usuário já cadastrado!" });
    }

    const dataRoles = await roleRepository.find({ where: {
      name: 'ROLE_STUDENT'
    }});

    const user = userRepository.create({
      name,
      last_name: lastName,
      email,
      phone,
      born_date: bornDate,
      password,
      cpf,
      roles: dataRoles,
      isValidate: false
    });

    const responseUser =  await userRepository.save(user);

    const infoStudent = studentRepository.create({
      user_id: responseUser.id,
      registration,
      course,
      team,
      college,
      yearOfEntry: yearOfEntry,
    });
    await studentRepository.save(infoStudent);

    const userHour = userHourRepository.create({
      student_id: infoStudent.id,
      max_teaching: 0,
      max_extension: 0,
      max_research: 0
    })

    await userHourRepository.save(userHour);

    return response.status(201).send({Message: `Usuário salvo com sucesso!`});
  }

  async updateStudent(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const {email, phone } = request.body;

    const authHeader = request.headers.authorization || "";

    const [, token] = authHeader?.split(" ");

    const payload = decode(token);

    const user = await userRepository.findOne({
      where: {
        id: payload?.sub,
      },
    });

    if (user === null) {
      return response.status(422).send({ message: "Não existe este usuário" });
    }

    await userRepository.createQueryBuilder("users")
    .update({
      email,
      phone
    })
    .where(
      { id: payload?.sub }
    ).updateEntity(true).execute();

    return response.status(201).json({message: 'Dados atualizados com sucesso'});
  }

  async updateAdmin(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const adminRepository = getCustomRepository(AdminRepository);
    const { job, college, phone, email } = request.body;

    const authHeader = request.headers.authorization || "";

    const [, token] = authHeader?.split(" ");

    const payload = decode(token);

    const user = await adminRepository.findOne({
      where: {
        id: payload?.sub,
      },
    });

    if (user === null) {
      return response.status(422).send({ message: "Não existe este usuário" });
    }

    await adminRepository.createQueryBuilder("infoAdmin")
    .update({
      job,
      college,
    })
    .where(
      { user_id: payload?.sub }
    ).updateEntity(true).execute();

    await userRepository.createQueryBuilder("users")
    .update({
      email,
      phone
    })
    .where(
      { id: payload?.sub }
    ).updateEntity(true).execute();

    return response.status(201).json({message: 'Dados atualizados com sucesso'});
  }

  async createAdmin(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const roleRepository = getCustomRepository(RoleRepository);
    const adminRepository = getCustomRepository(AdminRepository);
    //Inserir ao cadastrar a roles de administrador.

    const { name, lastName, email,
      registration, phone, job,
      college, password, cpf, bornDate, roles } = request.body;

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
      isValidate: false
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



