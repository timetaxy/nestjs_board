import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(dto);
  }
}
