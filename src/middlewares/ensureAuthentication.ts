import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../modules/accounts/repositories/implemetations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub: user_id } = verify(
      token,
      '21d5dff97f925a602197498996c4e945'
    ) as IPayload;

    const usersRepository = new UserRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User does not exists', 401);
    }
    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
