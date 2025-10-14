import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.users.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.users.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: Prisma.UsersUpdateInput) {
    return await this.databaseService.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.users.delete({ where: { id } });
  }
}
