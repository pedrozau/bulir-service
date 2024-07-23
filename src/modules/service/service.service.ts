import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceDTO } from './DTO/service.dto';

@Injectable()
export class ServiceService {
   constructor(private prisma:PrismaService) {}
    

   /**  verificar o salod do cliente para comprar o serviço  */
   async checkBalanceToService(userId: string, serviceId: string) {
        try {
      
           const user =  await this.prisma.user.findFirst({where:{id:userId}}) 

           const service =  await this.prisma.service.findFirst({where:{id:serviceId}})


           const mybalance =  user.balance 
           const serviceprice = service.price

           if(mybalance >= serviceprice) {
               return true
           } else {
               return false


           }
           
           
 


        }catch(error) {
            console.log(error)
        }
   }


  /**  verificar o cliente     */
   async checkClient(id: string) {
    try {
       
        const get_provider = await this.prisma.user.findFirst({
            where: {id}
        })

       if(get_provider.role == "cliente") {
           return true
        } else {
           return false

       }

        

     }catch (err) {
        console.log(err)
     }

   }
     

    /**  verificar o prestador     */

   async checkProvider(id: string) {
      try {
       
         const get_provider = await this.prisma.user.findFirst({
             where: {id}
         })

        if(get_provider.role == "prestador") {
            return true
         } else {
            return false
 
        }

         

      }catch (err) {
         console.log(err)
      }
   }

  
    /**  criar um serviço      */
   async createService({title,description, price, providerId}:ServiceDTO) {
     try{

         const check_provider = await this.checkProvider(providerId)

         if(check_provider) {
             
             const create_service = this.prisma.service.create({
                  data: {
                     title,
                     description,
                     price,
                     providerId
                  }
             })
             return create_service
         }else {

             throw new Error("Não es prestador")
         }



     }catch(error) {
        console.log(error)
     }
   }

  /**  pegar todos os serviços      */
   async getAllServices() {
     
       return await this.prisma.service.findMany() 

   }
 
    /**  pegar um serviço por id      */
   async getServiceById(id: string) {
       
     try {
      
        const check_id = await this.prisma.service.findFirst({
             where: { id }
 
        })

        if(!check_id) {
            throw new Error("Service not found")
        }

        const service = await this.prisma.service.findFirst({
             where: { id: check_id.id }
        })


        return service

     }catch(error) {
        console.log(error)
     }
      

   }

    /**  atualizar um serviço      */
   async updateService({title, description, price, providerId }:ServiceDTO, id:string) {
       try{

         const check_id = await this.prisma.service.findFirst({
             where:{ id}
         })

        if(!check_id) {
            throw new Error("Service not found")
        }

         const updated_service = await this.prisma.service.update({
             where: { id: check_id.id },
             data: { title, description, price, providerId }
         })

         return updated_service

       }catch(error) {
         console.log(error)
       }
   }
 
    /**  deletar serviço    */

   async deleteService(id: string){

       try{

        const check_id = await this.prisma.service.findFirst({
            where:{ id}
        })

       if(!check_id) {
           throw new Error("Service not found")
       }

       return await this.prisma.service.delete({
         where: { id: check_id.id }

       })

       }catch(error) { 
       
        console.log(error)

       }
   }


   

  
    /**  contratar serviços     */ 

   async hireService(serviceId: string, userId: string) {

       const check_balance = await this.checkBalanceToService(userId, serviceId)

       if(check_balance) {
        
       const service = await this.prisma.service.findFirst({where:{id: serviceId}})
       const user = await this.prisma.user.findFirst({where:{id: userId}})

       const  current_balance =  user.balance - service.price  // saldo atual


      
         await this.prisma.transaction.create({
          data: {
             serviceId: service.id,
             clientId: user.id,
             amount: service.price,
             providerId: service.providerId

          }
         })
      
       await this.prisma.user.update({where:{id: userId}, data:{balance: current_balance}}) // atualizado o saldo 


          
           

       }else {
          throw new Error("Saldo insuficiente")
       }


   }     






}
