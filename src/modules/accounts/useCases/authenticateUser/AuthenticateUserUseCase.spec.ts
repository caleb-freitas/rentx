import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUserCase';
import { UsersTokensRepository } from '@modules/accounts/infra/repositories/UsersTokensRepository';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepository: UsersTokensRepository;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepository
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate a user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'test@mail.com',
      password: '1234',
      name: 'user'
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty('token');
  });

  it('should not be able to autenticate a non-existing user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'test@mail.com',
        password: '1234'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '000123',
        email: 'test@mail.com',
        name: 'user',
        password: '1234'
      };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: 'test@mail.com',
        password: '4321'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
