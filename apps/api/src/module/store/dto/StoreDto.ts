import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsUrl,
  IsArray,
  IsBoolean,
} from 'class-validator';

export enum StoreSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export class StoreDto {
  @IsString()
  s_name: string;
  @IsString()
  user_id: string;
  @IsEnum(StoreSize)
  s_size: StoreSize;

  @IsDateString()
  estimated_date: string;

  @IsUrl({}, { each: true })
  @IsArray()
  s_imgUrl: string[];

  @IsString()
  s_house_number: string;

  @IsOptional()
  @IsString()
  s_road?: string;

  @IsOptional()
  @IsString()
  s_sub_district?: string;

  @IsOptional()
  @IsString()
  s_district?: string;

  @IsOptional()
  @IsString()
  s_province?: string;

  @IsBoolean()
  s_status: boolean;
}
