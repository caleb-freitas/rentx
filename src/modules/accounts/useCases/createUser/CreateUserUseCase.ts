import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    driver_license,
    password
  }: ICreateUserDTO): Promise<void> {
    const emailAlreadyRegistered = await this.usersRepository.findByEmail(
      email
    );

    if (emailAlreadyRegistered) {
      throw new AppError('E-mail already registered');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      driver_license,
      password: passwordHash
    });
  }
}

export { CreateUserUseCase };
