import { Request, Response } from 'express';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const categories = this.listCategoriesUseCase.execute();
    return response.json(categories);
  }
}

export { ListCategoriesController };
