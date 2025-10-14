import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly database: DatabaseService) {}

  create(createProduct: Prisma.ScrapItemsCreateInput) {
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
        id: id,
      },
    });
  }

  update(id: number, updateProduct: Prisma.ScrapItemsUpdateInput) {
    return this.database.scrapItems.update({
      where: {
        id: id,
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
