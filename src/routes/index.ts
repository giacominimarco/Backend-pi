import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload'
import AuthMiddleware from '../middlewares/authMiddleware';
import UserController from '../controllers/UserController';
import SessionController from "../controllers/SessionController";
import PermissionController from "../controllers/PermissionController";
import RoleController from "../controllers/RoleController";

const routes = Router();
const upload = multer(uploadConfig);

import { is } from "../middlewares/permission";
import StateController from '../controllers/StateController';
import TypeHourController from '../controllers/TypeHourController';
import RequestHoursController from '../controllers/RequestHoursController';
import SolicitationController from '../controllers/SolicitationController';

// Cria usuário / cadastro
routes.post("/users", UserController.createStudent);
routes.post("/createUserAdmin", UserController.createAdmin);
// Gera tokem do usuário / login
routes.post("/sessions", SessionController.create);
routes.post("/permissions", PermissionController.create);
routes.post("/roles", RoleController.create);
routes.post("/states", StateController.createState);
routes.post("/typeHour", TypeHourController.createTypeHour);
routes.post("/requestHours", upload.array('File'), RequestHoursController.createRequestHour);
// Se tiver um tokem ele vai acessar a rota
routes.get('/users', UserController.index);
routes.get('/user/:id', AuthMiddleware, UserController.indexOne);
routes.get("/typeHours", TypeHourController.index);
routes.get("/mySolicitations", SolicitationController.indexForUser);

//routes.get('/form', formController);
// Teste de conexão
routes.get('/home', AuthMiddleware, (request, response) => {
  return response.json({ message: 'Hello world' })
})


export { routes };
