// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayloadProps {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: configService.get<string>('JWT_SECRET')!, // ใช้ ConfigService เพื่อดึงค่า JWT_SECRET และ ! ยืนยันว่าไม่เป็น null
    });
  }

  async validate(payload: JwtPayloadProps) {
    return { id: payload.sub, email: payload.email };
  }
}
