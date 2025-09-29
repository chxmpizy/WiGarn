import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './dto/AuthDto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() register: AuthRegisterDto) {
    return this.authService.register(register);
  }

  @Post('login')
  login(@Body() login: AuthLoginDto) {
    return this.authService.login(login);
  }
}
