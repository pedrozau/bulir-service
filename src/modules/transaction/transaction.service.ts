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



    async getUserTransactions(userId: string) {

          try{
          
            const {id} = await this.checkUser(userId)

            return await this.prisma.transaction.findMany({
                 include: {
                    service: true, 
                 },
                 where: {
                     clientId: id
                 }
            })

          }catch(error) {

            throw new HttpException("Erro na aplicação contacta a equipa de desenvolvimento",400)

          }


          
          


    }

    
     
    

    

}
