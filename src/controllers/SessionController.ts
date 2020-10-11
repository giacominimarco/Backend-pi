import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

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

    const roles = user.roles.map((role) => role.name);

    const token = sign({ roles }, "93eea6a2c12628b3a3b7618f6882c912", {
      subject: user.id,
      expiresIn: "1d",
    });

    return response.json({
      token,
      user,
    });
  }
}

export default new SessionController();
