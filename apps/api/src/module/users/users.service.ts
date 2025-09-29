import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma, users } from '../../../generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<users[]> {
    return await this.databaseService.users.findMany();
  }

  async findOne(id: string): Promise<users | null> {
    return await this.databaseService.users.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateUserDto: Prisma.usersUpdateInput,
  ): Promise<users> {
    return await this.databaseService.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<users> {
    return await this.databaseService.users.delete({ where: { id } });
  }
}
