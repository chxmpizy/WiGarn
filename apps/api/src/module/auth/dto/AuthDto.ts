import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
}

export class AuthLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class AuthRegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  house_number: string;

  @IsOptional()
  @IsString()
  s_road?: string | null;

  @IsString()
  sub_district: string;

  @IsString()
  district: string;

  @IsString()
  province: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  b_date: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  postcode: string;

  @IsString()
  @MinLength(8)
  password: string;
}
