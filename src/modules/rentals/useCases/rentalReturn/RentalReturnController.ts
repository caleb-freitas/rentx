import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RentalReturnUseCase } from './RentalReturnUseCase';

class RentalReturnController {
  async handle(request: Request, response: Response): Promise<Response> {
    const rentalReturnUseCase = container.resolve(RentalReturnUseCase);
  }
}

export { RentalReturnController };
