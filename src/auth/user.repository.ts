import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: AuthCredentialsDto): Promise<void> {
    const { username, password } = dto;
    const user = this.create({ username, password });
    await this.save(user);
  }
}
