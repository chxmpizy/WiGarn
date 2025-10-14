import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/module/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StoreService {
  constructor(private readonly database: DatabaseService) {}
  create(createStore: Prisma.storesCreateInput) {
    return this.database.stores.create({
      data: {
        ...createStore,
      },
    });
  }

  findAll() {
    return this.database.stores.findMany();
  }

  findOne(id: number) {
    return this.database.stores.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateStore: Prisma.storesUpdateInput) {
    return this.database.stores.update({
      where: { id: id },
      data: {
        ...updateStore,
      },
    });
  }

  remove(id: number) {
    return this.database.stores.delete({
      where: {
        id: id,
      },
    });
  }
}
