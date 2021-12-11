import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'name',
      description: 'description',
      daily_rate: 0,
      license_plate: 'license_plate',
      fine_amount: 0,
      brand: 'brand',
      category_id: 'category_id'
    });
    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with an existing license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'car_1',
        description: 'description',
        daily_rate: 0,
        license_plate: 'repeated_license_plate',
        fine_amount: 0,
        brand: 'brand',
        category_id: 'category_id'
      });

      await createCarUseCase.execute({
        name: 'car_2',
        description: 'description',
        daily_rate: 0,
        license_plate: 'repeated_license_plate',
        fine_amount: 0,
        brand: 'brand',
        category_id: 'category_id'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new car with availability for rent', async () => {
    const car = await createCarUseCase.execute({
      name: 'car_1',
      description: 'description',
      daily_rate: 0,
      license_plate: 'RRR-0000',
      fine_amount: 0,
      brand: 'brand',
      category_id: 'category_id'
    });
    expect(car.available).toBe(true);
  });
});
