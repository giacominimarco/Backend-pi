import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { sendMail } from "../config/e-mail";
import Speakeasy from 'speakeasy';

class SessionController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(
      { email },
      { relations: ["roles"] }
      );

    if (!user) {
      return response.status(400).json({ error: "Usuário ou senha inválidos" });
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      return response
        .status(400)
        .json({ error: "Usuário ou senha inválidos" });
    }

    const isValid = user.isValidate
    if (!isValid ) {
      return response.status(401).json({ error: "Você ainda não confirmou seu e-mail no sistema"}
      )
    }

    const roles = user.roles.map((role) => role.name);

    const token = sign({ roles }, "93eea6a2c12628b3a3b7618f6882c912", {
      subject: user.id,
      expiresIn: "1d",
    });

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    return response.json({
      token,
      userInfo,
    });
  }

  async createTokenTwoAuth(request: Request, response: Response) {
    const {email} = request.body

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(
      { email },
      { relations: ["roles"] }
      );

    const token = {
      token: Speakeasy.time({
        secret: "KRAEII3FLZLWM4ZF",
        encoding: "base32",
        step: 300, //5 minutos
      })
    }

    const responseMail = `Prezado ${user?.name},

Para se autenticar na sua conta basta digitar esse código de acesso: ${token.token}`
    sendMail( user?.email.toString(), responseMail, 's', 'Código de acesso')

    response.status(201).send({ message: "Foi encaminhado um email com o código de confirmação"})
  }

  async validatedUser(request: Request, response: Response) {
    const { token, email} = request.body

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(
      { email },
      { relations: ["roles"] }
      );

    const valid = Speakeasy.time.verify({
      secret: "KRAEII3FLZLWM4ZF",
      encoding: "base32",
      token,
      step: 300,
      window: 0
    })

    if (!user) {
      return response.status(400).json({ error: "Usuário ou senha inválidos!" });
    }

    if (!valid) {
      return response.status(400).json({ error: "Token Expirado ou inválido!" });
    }

    await userRepository.createQueryBuilder("users")
    .update({
      isValidate: true
    })
    .where(
      { id: user.id }
    ).updateEntity(true).execute();


    return response.status(201).json({message: 'Código validado com sucesso.'});
  }
}

export default new SessionController();
