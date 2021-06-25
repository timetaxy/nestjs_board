import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
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
  signIn(@Body(ValidationPipe) dto: AuthCredentialsDto) {
    return this.authService.signIn(dto);
  }
}
