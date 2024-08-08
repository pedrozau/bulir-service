import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceDTO, ServiceHire, ServiceSearch } from './DTO/service.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  // Get user by ID
  async getUserById(userId: string) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id: userId } });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (error) {
      throw new HttpException('Application error', 500);
    }
  }

  // Get service by ID
  async getServiceById(serviceId: string) {
    try {
      const service = await this.prisma.service.findFirst({ where: { id: serviceId } });
      if (!service) {
        throw new HttpException('Service not found', 404);
      }
      return service;
    } catch (error) {
      throw new HttpException('Application error', 500);
    }
  }

  // Check user's balance
  async checkBalance(serviceId: string, userId: string) {
   const service = await this.getServiceById(serviceId);
   const user = await this.getUserById(userId);
   
    return {
      balance:user.balance,
      price: service.price,
      
    };

  }

  // Check if user is a client
  async isClient(userId: string) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user.role === 'cliente';
  }

  // Check if user is a provider
  async isProvider(userId: string) {
    const provider = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!provider) {
      throw new HttpException('Provider not found', 404);
    }
    return provider.role === 'prestador';
  }

  // Create a service
  async createService(data: ServiceDTO) {
    try {
      const isProvider = await this.isProvider(data.providerId);
      if (!isProvider) {
        throw new HttpException('Only providers can create services', 400);
      }
      return await this.prisma.service.create({ data });
    } catch (error) {
      throw new HttpException('Error creating service', 400);
    }
  }

  // Get service by title
  async getServiceByTitle({ title }: ServiceSearch) {
    try {
      return await this.prisma.service.findMany({ where: { description: {
              contains: title,
      } } });
    } catch (error) {
      throw new HttpException('Application error', 500);
    }
  }

  // Get all services
  async getAllServices() {
    try {
      return await this.prisma.service.findMany();
    } catch (error) {
      throw new HttpException('Application error', 500);
    }
  }

  // Update a service
  async updateService(serviceId: string, data: ServiceDTO) {
    const existingService = await this.getServiceById(serviceId);
    try {
      return await this.prisma.service.update({
        where: { id: existingService.id },
        data,
      });
    } catch (error) {
      throw new HttpException('Error updating service', 400);
    }
  }

 



async deleteService(serviceId: string) {
   try {
     const service = await this.getServiceById(serviceId);
 
     // Delete related transactions first (or handle in another way)
     await this.prisma.transaction.deleteMany({
       where: { serviceId: serviceId },
     });
 
     // Now delete the service
     return await this.prisma.service.delete({
       where: { id: serviceId },
     });
   } catch (error) {
     if (error instanceof PrismaClientKnownRequestError) {
       // Handle the specific error
       console.error('Error deleting service:', error.message);
     } else {
       // Handle other errors
       console.error('Unexpected error:', error);
     }
     throw error; // or handle it accordingly
   }
 }


  // Calculate balance for client and provider
  async calcBalance({ clientId, serviceId }: ServiceHire) {
    try {
        // Utilize uma transação para garantir que todas as operações sejam atômicas
        const [client, service, provider] = await this.prisma.$transaction([
            this.prisma.user.findUnique({ where: { id: clientId } }),
            this.prisma.service.findUnique({ where: { id: serviceId } }),
            this.prisma.user.findUnique({ where: { id: (await this.prisma.service.findUnique({ where: { id: serviceId } })).providerId } })
        ]);

        // Verifique se todos os dados necessários foram encontrados
        if (!client || !service || !provider) {
            throw new Error('Client, service, or provider not found');
        }

        if (!this.isClient(client.id)) {
            throw new Error('Invalid client');
        }

        const updatedClientBalance = client.balance - service.price;
        const updatedProviderBalance = provider.balance + service.price;

        // Atualize os saldos de cliente e provedor dentro da transação
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: client.id },
                data: { balance: updatedClientBalance }
            }),
            this.prisma.user.update({
                where: { id: provider.id },
                data: { balance: updatedProviderBalance }
            })
        ]);

        return {
            clientBalance: updatedClientBalance,
            providerBalance: updatedProviderBalance
        };
    } catch (error) {
        // Lide com o erro de forma apropriada
        console.error(error);
        throw new Error('Failed to calculate balance');
    }
}


  // Hire a service
//   async serviceHire({ clientId, serviceId }: ServiceHire) {
     
//       try {
//         const client = await this.getUserById(clientId);
//     const service = await this.getServiceById(serviceId);

//      await this.calcBalance({ clientId, serviceId });

//     return await this.prisma.transaction.create({
//       data: {
//         clientId: client.id,
//         providerId: service.providerId,
//         serviceId: service.id,
//         amount: service.price,
//       },
//     });
//   }catch (error) {
//         throw new HttpException('Error hiring service', 400);
//       }
// }

async serviceHire({ clientId, serviceId }: ServiceHire) {
  try {
      // Inicie uma transação para garantir atomicidade
      const result = await this.prisma.$transaction(async (prisma) => {
          // Obtenha o cliente e o serviço dentro da transação
          const [client, service] = await Promise.all([
              prisma.user.findUnique({ where: { id: clientId } }),
              prisma.service.findUnique({ where: { id: serviceId } })
          ]);

          // Verifique se o cliente e o serviço existem
          if (!client || !service) {
              throw new HttpException('Client or service not found', 404);
          }

          // Calcule o saldo e atualize os saldos dos usuários
          const { clientBalance, providerBalance } = await this.calcBalance({ clientId, serviceId });
              console.log(clientBalance)
              console.log(providerBalance)
          // Crie a transação de serviço
          const transaction = await prisma.transaction.create({
              data: {
                  clientId: client.id,
                  providerId: service.providerId,
                  serviceId: service.id,
                  amount: service.price,
              },
          });

          // Retorne a transação criada
          return transaction;
      });

      return result;
  } catch (error) {
      // Lide com o erro de forma apropriada e forneça uma mensagem detalhada
      console.error(error);
      throw new HttpException('Failed to hire service. Please try again later.', 500);
  }
}



}

   
