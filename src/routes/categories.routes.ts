import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { CreateCategoryUseCase } from '../modules/cars/useCases/createCategory/CreateCategoryUseCase';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/categories', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/categories', (request, response) => {
  const categories = categoriesRepository.list();
  return response.json(categories);
});

export { categoriesRoutes };
