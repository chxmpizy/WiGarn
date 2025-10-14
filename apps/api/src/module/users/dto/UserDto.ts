import {
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
}

export class UserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

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
}
