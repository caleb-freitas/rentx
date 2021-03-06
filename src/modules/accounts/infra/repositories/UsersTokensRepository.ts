import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUsersTokensDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { getRepository, Repository } from 'typeorm';
import { UserTokens } from '../typeorm/entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({refresh_token})
    return userToken
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const usersTokens = await this.repository.findOne({
      user_id,
      refresh_token
    })
    return usersTokens
  }

  async create({
    user_id,
    expires_date,
    refresh_token
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token
    });
    await this.repository.save(userToken);
    return userToken;
  }
}

export { UsersTokensRepository };
