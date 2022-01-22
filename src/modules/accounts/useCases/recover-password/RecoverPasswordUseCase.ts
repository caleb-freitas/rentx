import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from 'uuid';

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

@injectable()
class RecoverPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)
    if(!user) {
      throw new AppError('User does note exists')
    }
    const token = uuidv4()
    const expires_date = this.dateProvider.addHours(3)
    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })
  }
}

export { RecoverPasswordUseCase };