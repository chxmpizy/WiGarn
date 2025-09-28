import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRegisterDto, AuthLoginDto } from './dto/AuthDto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly jwt: JwtService,
  ) {}
  async register(register: AuthRegisterDto) {
    const h_password = await bcrypt.hash(register.password, 10);
    const user = this.database.users.create({
      data: {
        ...register,
        password: h_password,
      },
    });
    return { message: 'Register Successfully -> ', user };
  }

  async login(login: AuthLoginDto) {
    try {
      const user = await this.database.users.findUnique({
        where: {
          email: login.email,
        },
      });
      if (!user) throw new Error('Invalid credentials');
      const bcryptCompare = await bcrypt.compare(login.password, user.password);
      if (!bcryptCompare) {
        throw new Error('Invalid credentials');
      }
      const payload = { sub: user.id, email: user.email };
      const token = this.jwt.sign(payload);
      return { access_token: token };
    } catch (error) {
      console.log('Jwt Error -> ', error);
    }
  }
}
