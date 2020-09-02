import { Router } from 'express';
import UserController from '../app/controllers/UserController';

const routes = Router();

routes.post('/users', UserController.store);

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello world' })
})

export default routes;
