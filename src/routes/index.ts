import { Router } from 'express';

import AuthMiddleware from '../app/middlewares/authMiddleware';
import UserController from '../app/controllers/UserController';
import AuthController from '../app/controllers/AuthController';

const routes = Router();

// Cria usuário
routes.post('/users', UserController.store);
// Gera tokem do usuário
routes.post('/auth', AuthController.authenticate);
// Teste de autenticação
routes.get('/users', AuthMiddleware, UserController.index);
// Teste de conexão
routes.get('/', (request, response) => {
  return response.json({ message: 'Hello world' })
})

export default routes;
