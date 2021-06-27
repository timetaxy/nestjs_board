import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(dto);
  }

  async signIn(dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = dto;
    const user = await this.userRepository.findOne(username);
    if (user && (await bcrypt.compare(user.password, password))) {
      // secret+payload 토큰생성
      const payload = { username }; //중요한 정보는 x
      const accessToken = await this.jwtService.sign(payload);
      // return `login Success`;
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('login fail');
    }
  }
}
