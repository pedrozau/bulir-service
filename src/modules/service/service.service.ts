import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceDTO } from './DTO/service.dto';

@Injectable()
export class ServiceService {
   constructor(private prisma: PrismaService) {}

   async getUserById(id: string) {
      const user = await this.prisma.user.findFirst({ where: { id } });
      if (!user) {
         throw new HttpException('usuario não encontrado', 404);
      }
      return user;
   }

    async getServiceById(id: string) {
      const service = await this.prisma.service.findFirst({ where: { id } });
      if (!service) {
         throw new HttpException('Service não encontrado', 404);
      }
      return service;
   }

   /** Verificar o saldo do cliente para comprar o serviço */
   async checkBalanceToService(userId: string, serviceId: string) {
      try {
         const user = await this.getUserById(userId);
         const service = await this.getServiceById(serviceId);

         return user.balance >= service.price;
      } catch (error) {
         throw new HttpException("Erro ao verificar saldo", 400);
      }
   }

   /** Verificar se o usuário é cliente */
   async checkClient(id: string) {
      try {
         const user = await this.getUserById(id);
         return user.role === 'cliente';
      } catch (err) {
         throw new HttpException('Erro ao verificar cliente', 400);
      }
   }

   /** Verificar se o usuário é prestador */
   async checkProvider(id: string) {
      try {
         const user = await this.getUserById(id);
         return user.role === 'prestador';
      } catch (err) {
         throw new HttpException('Erro ao verificar prestador', 400);
      }
   }

   /** Criar um serviço */
   async createService({ title, description, price, providerId }: ServiceDTO) {
      try {
         if (await this.checkProvider(providerId)) {
            return await this.prisma.service.create({
               data: { title, description, price, providerId },
            });
         } else {
            throw new HttpException('Não é prestador', 400);
         }
      } catch (error) {
         console.error(error);
         throw new HttpException('Erro ao criar serviço', 400);
      }
   }

   /** Pegar todos os serviços */
   async getAllServices() {
      return await this.prisma.service.findMany();
   }

   /** Pegar um serviço por id */
   

   /** Atualizar um serviço */
   async updateService({ title, description, price, providerId }: ServiceDTO, id: string) {
      try {
         await this.getServiceById(id);
         return await this.prisma.service.update({
            where: { id },
            data: { title, description, price, providerId },
         });
      } catch (error) {
         console.error(error);
         throw new HttpException('Erro ao atualizar serviço', 400);
      }
   }

   /** Deletar serviço */
   async deleteService(id: string) {
      try {
         await this.getServiceById(id);
         return await this.prisma.service.delete({ where: { id } });
      } catch (error) {
         console.error(error);
         throw new HttpException('Erro ao deletar serviço', 400);
      }
   }

   /** Contratar serviços */
   async hireService(serviceId: string, userId: string) {
      try {
         if (await this.checkBalanceToService(userId, serviceId)) {
            return await this.prisma.$transaction(async (prisma) => {
               const service = await this.getServiceById(serviceId);
               const user = await this.getUserById(userId);
               const current_balance = user.balance - service.price;

               const provider = await this.prisma.user.findFirst({
                   where: {
                     id: service.providerId
                   }
               })


               const current_balance_provider = provider.balance +  service.price

               await  this.prisma.user.update({
                    where: { id: provider.id },
                    data: {
                      balance: current_balance_provider
                    }
               })



               await this.prisma.transaction.create({
                  data: {
                     serviceId: service.id,
                     clientId: user.id,
                     amount: service.price,
                     providerId: service.providerId,
                  },
               });

               await prisma.user.update({
                  where: { id: userId },
                  data: { balance: current_balance },
               });

               return true;
            });
         } else {
            throw new HttpException('Saldo insuficiente', 400);
         }
      } catch (error) {
         console.error(error);
         throw new HttpException('Erro ao contratar serviço', 400);
      }
   }
}
