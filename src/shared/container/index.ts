import { container } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UserRepository } from '@modules/accounts/infra/repositories/UsersRepository';
import { CategoriesRepository } from '@modules/cars/infra/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/repositories/SpecificationsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);
