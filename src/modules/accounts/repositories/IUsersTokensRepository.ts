import { ICreateUserTokenDTO } from '../dtos/ICreateUsersTokensDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token
  }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens>
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
