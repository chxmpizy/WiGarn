import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './module/database/database.module';
import { UsersModule } from './module/users/users.module';
// import { ControllerService } from './module/controller/controller.service';
import { DatabaseService } from './module/database/database.service';
import { PrismaController } from './module/database/database.controller';
import { AuthModule } from './module/auth/auth.module';
import { StoreModule } from './module/store/store.module';
// import { ProductModule } from './module/product/product.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    StoreModule,
    // ProductModule,
  ],
  controllers: [AppController, PrismaController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
