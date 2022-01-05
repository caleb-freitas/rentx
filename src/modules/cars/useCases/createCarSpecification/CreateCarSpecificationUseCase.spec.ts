import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/inMemory/SpecificationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });
  it('should not be able to add a new specification to a non-existing car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['5432'];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to add a new car specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'name',
      description: 'description',
      daily_rate: 0,
      license_plate: 'license_plate',
      fine_amount: 0,
      brand: 'brand',
      category_id: 'category_id'
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test'
    });
    const specifications_id = [specification.id];
    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
  });
});
