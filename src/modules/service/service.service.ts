import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceDTO, ServiceHire, ServiceSearch} from './DTO/service.dto';

@Injectable()
export class ServiceService {
   constructor(private prisma: PrismaService) {}
    

   // buscar usuario pelo id 

   async getUserById(userid: string) {
         try {

            const checkId = await this.prisma.user.findFirst({
                where:{ 
                   id: userid 
                }
            })

          if(!checkId) {
            throw new HttpException("id informado não encontrado",404)
          }

          return checkId


         }catch(error) {
            throw new HttpException("problema na aplicação",400)
         }
   }


   // buscar serviço pelo id 


   async getServiceById(id: string) {
         try {

            const service = await this.prisma.service.findFirst({
                where: { id }
            })

            if(!service) {
               throw new HttpException("id informado não encontrado",404)
            }

            return service

         }catch(error) {
            throw new HttpException("problema na aplicação ",400)
         }
   }
  

   /** Verificar o saldo do cliente para comprar o serviço */

     async checkBalance(serviceId: string, userId: string) {
          
      const service = await this.getServiceById(serviceId)
      const user = await this.getUserById(userId)
        
      if(service.price > user.balance)  {
         throw new HttpException("Saldo insuficiente para contratar um serviço.",400)
      }
      
        
        
 


     }
  
   /** Verificar se o usuário é cliente */

   async checkUser(userId: string) {
      const  user = await this.prisma.user.findFirst({
         where: {
           id: userId 
         }
      })

      if(!user)  throw new HttpException("usuario não encontrado.",404)

       return user.role == 'cliente'
      
 
   }
  
   /** Verificar se o usuário é prestador */

   async checkProvider(providerId: string) {
      const  provider = await this.prisma.user.findFirst({
         where: {
           id: providerId
         }
      })

      if(!provider)  throw new HttpException("prestador não encontrado.",404)

       return provider.role == 'prestador'
      
 
   }
   

   /** Criar um serviço */

     async createService(data:ServiceDTO) {
         
        try {

         if(this.checkProvider) {
            return await this.prisma.service.create({
              data
            })

         }else {

            throw new HttpException("Um cliente não poder criar um serviço.",400)
         }


        }catch(error) { 
         throw new HttpException("Error ao salvar serviço.",400)

        }


     }

 // buscar service pelo seu title

 async getServiceByTitle({title}:ServiceSearch) {
           
     try {

      return await this.prisma.service.findMany({
         where: {
            title
         }
      })

     }catch(error) {
         
        throw new HttpException("problema na aplicação",400)

     }

      
   }


  

   /** Pegar todos os serviços */

   async getAllService() {

       return await this.prisma.service.findMany() 
   }
   

   /** Pegar um serviço por id */

     async getById(id: string) {
       return await this.getServiceById(id)
     }
   

   /** Atualizar um serviço */

   async updateService(data:ServiceDTO, serviceId: string) {
      
           
         const checkservice = await this.getServiceById(serviceId)

         
         return await this.prisma.service.update({
          data,
          where: {
             id: checkservice.id 
          }
         })
 
       
   }
   
   /** Deletar serviço */

   async deleteService(id: string) {

     const service = await  this.getServiceById(id) 

     return await this.prisma.user.delete({
         where: {
             id: service.id
         }
     })
   
   }


   // calcular restante  o saldo para o cleinte e prestador 


   async calc_balance({clientId, serviceId}:ServiceHire) {
      
      const user = await this.getUserById(clientId) 
      const service = await this.getServiceById(serviceId) 

      const provider = await this.getUserById(service.providerId)

      const current_balance_client = user.balance - service.price 
      const current_balance_provider = provider.balance + service.price

      const balance_cleint = await this.prisma.user.update({
           data: {
            balance: current_balance_client
           },
           where: {
              id: user.id
           }
      })

      const balance_provider = await this.prisma.user.update({
          data: {
             balance: current_balance_provider
          },
          where: {
            id: service.providerId
          }
      })


      return {
          balance_cleint,
          balance_provider
      }


      
      
   }





   /** Contratar serviços */

   async servicehire({clientId, serviceId}:ServiceHire) {
       
       const user = await this.getUserById(clientId) 
       const service = await this.getServiceById(serviceId) 
       
       
          await this.checkBalance(service.id, user.id)
       
          
           const  data_user =  this.calc_balance({clientId, serviceId})

           return  await  this.prisma.transaction.create({
                 data: {
                    clientId: (await data_user).balance_cleint.id,
                    providerId: service.providerId,
                    serviceId: service.id,
                    amount: service.price

                 }
           })
         

       




   }

   
}