import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { sendMail } from "../config/e-mail";
import { createSecret } from "../config/twoAuth";
import Speakeasy from 'speakeasy';
import User from "../models/User";

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

    // const responseSecretKey = `Prezado ${user?.name},

    // Para util: ${token.token}`
    // sendMail( user?.email.toString(), responseMail, 's', 'Código de acesso')


    const token = {
      token: Speakeasy.time({
        secret: "KRAEII3FLZLWM4ZF",
        encoding: "base32",
        step: 1500,
      })
    }

    const responseMail = `Prezado ${user?.name},

    Para se autenticar na sua conta basta digitar esse código de acesso: ${token.token}`
    sendMail( user?.email.toString(), responseMail, 's', 'Código de acesso')

    response.send({ message: "Deu certo krl"})
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
      step: 1500,
      window: 0
    })
    console.log(valid)

    if (!user) {
      return response.status(400).json({ error: "Usuário ou senha inválidos" });
    }

    if (!valid) {
      return response.status(400).json({ error: "Token Expirado ou inválido!!" });
    }
    const userSave = userRepository.update(
      {
        isValidate: valid
      },user)

    return response.json(userSave);
  }
}

export default new SessionController();
