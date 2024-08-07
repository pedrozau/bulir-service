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

    const client = await this.getUserById(clientId);
    const service = await this.getServiceById(serviceId);
    const provider = await this.getUserById(service.providerId);





    
}


 
async serviceHire({ clientId, serviceId }: ServiceHire) {
   
        // Obtenha o cliente e o serviço
       
        const client = await this.prisma.user.findFirst({ where: { id: clientId } });
        const service = await this.getServiceById(serviceId);
        const provider = await this.getUserById(service.providerId);
       

      

       

        if(await this.isClient(clientId) === false) {
            throw new HttpException('Only clients can hire services', 400);

        }

        
        if(client.balance < service.price) {
            throw new HttpException('Insufficient funds', 400);

        }

        // Calcule o saldo do cliente e do prestador
        const clientBalance = client.balance - service.price;
        const providerBalance = provider.balance + service.price;

        const transactions = await this.prisma.$transaction(async (tx) => {
          const clientUpdate = await tx.user.update({
            where: { id: client.id },
            data: { balance: clientBalance },
            select: {
              password:false,
              id:true,
              balance:true,
              role:true,

            },
          });

          const providerUpdate = await tx.user.update({
            where: { id: provider.id },
            data: { balance: providerBalance },
          });

          const hire = await tx.transaction.create({
            data: {
              clientId: client.id,
              providerId: provider.id,
              serviceId: service.id,
              amount: service.price,
            },
          });

          return { clientUpdate, providerUpdate, hire };
        });

        return transactions;
   
}




}

   
