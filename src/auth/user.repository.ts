import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: AuthCredentialsDto): Promise<void> {
    const { username, password } = dto;
    const salt = await bcrypt.genSalt();
    const hashedPw = await bcrypt.Hash(password, salt);
    const user = this.create({ username, password: hashedPw });
    // const user = this.create({ username, password });
    // try {
    //   await this.save(user);
    // } catch (err) {
    //   console.log(`err:${err}`);
    //   if (err.code === '23505') {
    //     throw new ConflictException('Existing username');
    //   } else {
    //     throw new InternalServerErrorException();
    //   }
    // }
    await this.save(user)
      .then()
      .catch((err): Error => {
        if (err.code === '23505') {
          throw new ConflictException('Existing username');
        } else {
          throw new InternalServerErrorException();
        }
      });
  }
}
