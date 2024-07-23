import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './DTO/user.dto';
import * as crypto from 'bcrypt';


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  
  // Cadastro de usuarios 

 async createUser({fullname,email,password,nif,role,balance}:UserDTO) {

  
     
     try {

      
       const hashedPassword = await crypto.hash(password, 10);


       const user = await this.prisma.user.create({
         data: {
           fullname,
           email,
           nif,
           password: hashedPassword,
           role,
           balance
         }
       })

       return user


 }catch(error) {
   console.log(error)
 }

}

 

async getUserByEmail(email: string) {
   return await this.prisma.user.findFirst({where: {email: email}})
}


async getUserById(id: string) {
   return await this.prisma.user.findFirst({where: {id: id}})
}



async deleteUser(id: string) {
   await this.prisma.user.delete({where: {id: id}})
}



async updateBalance(balance: number, userId: string) {
      
       const user = await this.prisma.user.findFirst({where:{id: userId}})

       if(!user) {
          throw new Error('User not found')
       }

      return await this.prisma.user.update({where:{id: userId}, data:{balance}})


}




}
