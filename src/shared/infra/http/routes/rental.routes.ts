import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ListRentalsController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsController';
import { RentalReturnController } from '@modules/rentals/useCases/rentalReturn/RentalReturnController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const rentalReturnController = new RentalReturnController();
const listRentalsController = new ListRentalsController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  rentalReturnController.handle
);

rentalRoutes.get('/user', ensureAuthenticated, listRentalsController.handle);

export { rentalRoutes };
