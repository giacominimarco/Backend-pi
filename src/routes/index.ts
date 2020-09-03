import { Router } from 'express';

import AuthMiddleware from '../app/middlewares/authMiddleware';
import UserController from '../app/controllers/UserController';
import AuthController from '../app/controllers/AuthController';

const routes = Router();

// Cria usuário / cadastro
routes.post('/users', UserController.store);
// Gera tokem do usuário / login
routes.post('/auth', AuthController.authenticate);
// Se tiver um tokem ele vai acessar a rota
routes.get('/users', AuthMiddleware, UserController.index);
// Teste de conexão
routes.get('/home', AuthMiddleware, (request, response) => {
  return response.json({ message: 'Hello world' })
})

export default routes;
