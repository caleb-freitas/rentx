import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      description: 'Car description',
      daily_rate: 100.0,
      license_plate: 'ABC-0123',
      fine_amount: 10,
      brand: 'Brand',
      category_id: 'category_id'
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Brand'
    });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Another Car 1',
      description: 'Car description',
      daily_rate: 100.0,
      license_plate: 'ABC-0124',
      fine_amount: 10,
      brand: 'Brand Test',
      category_id: 'category_id'
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Brand Test'
    });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Another Car',
      description: 'Car description',
      daily_rate: 100.0,
      license_plate: 'ABC-0125',
      fine_amount: 10,
      brand: 'Brand Test',
      category_id: 'category_id'
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Another Car'
    });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Another Car 2',
      description: 'Car description',
      daily_rate: 100.0,
      license_plate: 'ABC-0126',
      fine_amount: 10,
      brand: 'Brand Test',
      category_id: '0000'
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '0000'
    });
    expect(cars).toEqual([car]);
  });
});
