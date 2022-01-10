import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const minimumHours = 24;
    const carNotAvailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carNotAvailable) {
      throw new AppError('The car it is not available');
    }

    const userAlreadyRented = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userAlreadyRented) {
      throw new AppError('The user already rented a car');
    }

    const compare = this.dateProvider.compareHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    if (compare < minimumHours) {
      throw new AppError('Invalid return time');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    });
    await this.carsRepository.updateAvailable(car_id, false);
    return rental;
  }
}

export { CreateRentalUseCase };
