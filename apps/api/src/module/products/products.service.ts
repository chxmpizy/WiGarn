import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ProductDto } from './dto/ProductDto';

@Injectable()
export class ProductsService {
  constructor(private readonly database: DatabaseService) {}

  create(createProduct: ProductDto) {
    return this.database.scrapItems.create({
      data: {
        ...createProduct,
      },
    });
  }

  findAll() {
    return this.database.scrapItems.findMany();
  }

  findOne(id: number) {
    return this.database.scrapItems.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateProduct: ProductDto) {
    return this.database.scrapItems.update({
      where: {
        id,
      },
      data: {
        ...updateProduct,
      },
    });
  }

  remove(id: number) {
    return this.database.scrapItems.delete({
      where: {
        id: id,
      },
    });
  }
}
