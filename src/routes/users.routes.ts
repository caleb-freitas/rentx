import { Router } from 'express';
import { CreateUserControlle } from '../modules/accounts/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserControlle();

usersRoutes.post('/', createUserController.handle);

export { usersRoutes };
