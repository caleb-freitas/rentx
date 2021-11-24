import { inject, injectable } from 'tsyringe';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    email,
    driver_license,
    password
  }: ICreateUserDTO): Promise<void> {
    await this.userRepository.create({
      name,
      username,
      email,
      driver_license,
      password
    });
  }
}

export { CreateUserUseCase };