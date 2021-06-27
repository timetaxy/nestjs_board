import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(dto);
  }
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) dto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(dto);
  }
  @Post('/test')
  @UseGuards(AuthGuard()) //AuthGuard jwt.strategy.ts 에서 validate 리턴 user 값을 넣음, 토큰 없거나 잘 못된 경우 unauthorized
  test(@Req() req) {
    console.log(`req:${req}`);
  }
}
