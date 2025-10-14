import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
  @IsString()
  item_name: string;
  @IsString()
  item_desc: string;
  @IsNumber()
  price: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  rating: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  store_id: number;
}
