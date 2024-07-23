import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ServiceModule } from './modules/service/service.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [UserModule, ServiceModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
