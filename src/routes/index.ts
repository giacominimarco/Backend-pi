import { Router } from 'express';

import AuthMiddleware from '../middlewares/authMiddleware';
import UserController from '../controllers/UserController';
import SessionController from "../controllers/SessionController";
import PermissionController from "../controllers/PermissionController";
import RoleController from "../controllers/RoleController";

const routes = Router();

import { is } from "../middlewares/permission";

// Cria usuário / cadastro
routes.post("/users", UserController.createStudent);
routes.post("/createUserAdmin", UserController.createAdmin);
// Gera tokem do usuário / login
routes.post("/sessions", SessionController.create);
routes.post("/permissions", PermissionController.create);
routes.post("/roles", RoleController.create);
// Se tiver um tokem ele vai acessar a rota
routes.get('/users', AuthMiddleware, UserController.index);
routes.get('/user/:id', AuthMiddleware, UserController.indexOne);
// Teste de conexão
routes.get('/home', AuthMiddleware, (request, response) => {
  return response.json({ message: 'Hello world' })
})


export { routes };
