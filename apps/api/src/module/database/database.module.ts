import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UsersModule } from '../users/users.module';
import { StoreModule } from 'src/module/store/store.module';

@Global()
@Module({
  imports: [UsersModule, StoreModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
