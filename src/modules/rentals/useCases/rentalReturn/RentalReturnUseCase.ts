import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class RentalReturnUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimumDaily = 1;

    if (!rental) {
      throw new AppError('Rental does not exists');
    }

    const currentDate = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delayInReturn = this.dateProvider.compareDays(
      currentDate,
      rental.expected_return_date
    );

    let total = 0;

    if (delayInReturn > 0) {
      const calculateFine = delayInReturn * car.fine_amount;
      total = calculateFine;
    }
    total += daily * car.daily_rate;
    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;
    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);
    return rental;
  }
}

export { RentalReturnUseCase };
