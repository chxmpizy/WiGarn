import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './dto/AuthDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() register: AuthRegisterDto) {
    return await this.authService.register(register);
  }
  @Post('login')
  async login(@Body() login: AuthLoginDto, @Res() res: Response) {
    const token = await this.authService.login(login);
    return res
      .cookie('token', token, { httpOnly: true, sameSite: 'lax' })
      .json({ message: 'Login Successfully' });
  }
}
