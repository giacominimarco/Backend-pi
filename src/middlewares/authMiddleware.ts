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

  if (!authorization) {
    return res.sendStatus(401);
  }

  // Trocando Bearer por vazio e tirando espassos em branco.
  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, '93eea6a2c12628b3a3b7618f6882c912');
    const { id } = data as TokenPlayload;

    req.userId = id;
    return next();

  } catch {
    return res.sendStatus(401);
  }
}
