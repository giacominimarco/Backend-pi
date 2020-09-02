import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

class UserController {
  index(req: Request, res: Response) {
    return res.send({ userID: req.userId });
    // return res.json({message: 'testeeeeeeee'});
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(User)
    const { name, email, password } = req.body;
    const useExistes = await repository.findOne({ where: {email} });

    if (useExistes) {
      return res.sendStatus(409);
    }

    const user = repository.create({
      name,
      email,
      password
    });
    await repository.save(user);

    return res.json(user);
  }
}

export default new UserController();
