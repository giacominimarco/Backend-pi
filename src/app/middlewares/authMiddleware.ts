import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPlayload {
  id: string,
  iat: number,
  exp: number,
}

export default function authMiddleware(
  req: Request, res: Response, next: NextFunction,
) {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    return res.sendStatus(401);
  }

  // Trocando Bearer por vazio e tirando espassos em branco.
  const token = authorization.replace('Bearer', '').trim();
  console.log(token);

  try {
    const data = jwt.verify(token, 'secret');
    const { id } = data as TokenPlayload;

    req.userId = id;
    return next();

  } catch {
    return res.sendStatus(401);
  }
}
