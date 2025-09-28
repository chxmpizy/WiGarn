import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
  imports: [UsersModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
