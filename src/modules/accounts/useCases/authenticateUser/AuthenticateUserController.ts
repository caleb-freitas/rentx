import { Request, response, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUserCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;
    const authentiateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const token = await authentiateUserUseCase.execute({
      password,
      email
    });
    return response.json(token);
  }
}

export { AuthenticateUserController };
