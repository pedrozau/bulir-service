import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
    constructor(private prisma:PrismaService){}


    async checkUser(userid: string) {
        try {

            const user = await this.prisma.user.findFirst({
                 where: {
                     id: userid
                 }
            })

            if(!user) {
               throw new HttpException("usuario não econtrado",404)
            }

            return user

        }catch(error) {
             throw new HttpException("Erro na aplicação contacta a equipa de desenvolvimento",400)
        }
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



    async getUserTransactions(userId: string) {

          try{
          
            const {id} = await this.checkUser(userId)

           const isClient = await this.isClient(userId)
           const isProvider = await this.isProvider(userId)


           if(isClient) {

            return await this.prisma.transaction.findMany({
                 include: {
                    service: true,
                 },
                 where: {
                     clientId: id
                 }
              })
           }

           if(isProvider) {
            return await this.prisma.transaction.findMany({
                 include: {
                    service: true,
                 },
                 where: {
                     providerId: id
                 }
            })
           }

          }catch(error) {

            throw new HttpException("Erro na aplicação contacta a equipa de desenvolvimento",400)

          }


          
          


    }

    
     
    

    

}
