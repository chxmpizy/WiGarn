import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
// import { ControllerService } from './module/controller/controller.service';
import { DatabaseService } from './database/database.service';
import { PrismaController } from './database/database.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule],
  controllers: [AppController, PrismaController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
