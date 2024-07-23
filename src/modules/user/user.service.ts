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


 }catch(error) {
   console.log(error)
 }

}
}
