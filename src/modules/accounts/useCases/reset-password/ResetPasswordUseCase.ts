import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt'

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);
    if(!userToken) {
      throw new AppError('Invalid token')
    }

    const expiresDate = userToken.expires_date;
    const currentDate = this.dateProvider.dateNow()
    const tokenIsExpired = this.dateProvider.compare(expiresDate, currentDate)

    if(tokenIsExpired) {
      throw new AppError('Token expired')
    }
    const user = await this.usersRepository.findById(userToken.user_id)
    user.password = await hash(password, 8)
    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id)

  }
}

export { ResetPasswordUseCase };