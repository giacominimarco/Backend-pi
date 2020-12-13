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
import EspecifyTypeHourController from '../controllers/EspecifyTypeHourController';
import EventController from '../controllers/EventController';

// Cria usuário / cadastro
routes.post("/users", UserController.createStudent);
routes.post("/createUserAdmin", UserController.createAdmin);
// Gera tokem do usuário / login
routes.post("/sessions", SessionController.create);
routes.post("/sendToken", SessionController.createTokenTwoAuth)
routes.post("/validate", SessionController.validatedUser);

routes.post("/permissions", PermissionController.create);
routes.post("/roles", RoleController.create);
routes.post("/states", StateController.createState);
routes.post("/typeHour", TypeHourController.createTypeHour);
routes.post("/requestHours", upload.array('File'), RequestHoursController.createRequestHour);
routes.post("/especifyTypeHour", EspecifyTypeHourController.createEspecifyTypeHour);


routes.post("/event", EventController.createPDF);

// Se tiver um tokem ele vai acessar a rota
routes.get('/users', UserController.index);
routes.get("/myHours/:id", UserController.getTotalHoursOfStudent)
routes.get('/user/:id', AuthMiddleware, UserController.indexOne);
routes.get("/typeHours", TypeHourController.index);
routes.get("/mySolicitations", SolicitationController.indexForUser);
routes.get("/especifyTypeHour", EspecifyTypeHourController.index);
routes.get("/teste/:id", RequestHoursController.indexRequestHour)
routes.post("/event", EventController.createPDF);
routes.get("/downloadFile", RequestHoursController.downloadFiles);
routes.get("/allRequisitions", RequestHoursController.allRequestHours);


routes.put("/updateStudent", UserController.updateStudent);
routes.put("/updateAdmin", UserController.updateAdmin);


routes.get('/home', (request, response) => {
  return response.json({ message: 'O servidor está funcionando' })
})


export { routes };
