import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';





@Module({
  controllers: [ServiceController],
  providers: [ServiceService,PrismaService],
  imports: [AuthModule]

})
export class ServiceModule {}
