import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(dto);
  }

  async signIn(dto: AuthCredentialsDto): Promise<string> {
    const { username, password } = dto;
    const user = await this.userRepository.findOne(username);
    if (user && (await bcrypt.compare(user.password, password))) {
      return `login Success`;
    } else {
      throw new UnauthorizedException('login fail');
    }
  }
}
