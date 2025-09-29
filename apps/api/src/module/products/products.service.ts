import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ProductsService {
  constructor(private readonly database: DatabaseService) {}

  create(createProduct: Prisma.Scrap_ItemsCreateInput) {
    return this.database.scrap_Items.create({
      data: {
        ...createProduct,
      },
    });
  }

  findAll() {
    return this.database.scrap_Items.findMany();
  }

  findOne(id: number) {
    return this.database.scrap_Items.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateProduct: Prisma.Scrap_ItemsUpdateInput) {
    return this.database.scrap_Items.update({
      where: {
        id: id,
      },
      data: {
        ...updateProduct,
      },
    });
  }

  remove(id: number) {
    return this.database.scrap_Items.delete({
      where: {
        id: id,
      },
    });
  }
}
