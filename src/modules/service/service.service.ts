import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceDTO } from './DTO/service.dto';

@Injectable()
export class ServiceService {
   constructor(private prisma:PrismaService) {}

   async createService({title,description, price, providerId}:ServiceDTO) {
     try{

        const create_service = this.prisma.service.create({
             data: {
                title,
                description,
                price,
                providerId
             }
        })

        return create_service

     }catch(error) {
        console.log(error)
     }
   }


}
