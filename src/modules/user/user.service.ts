import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './DTO/user.dto';
import * as argon2 from 'argon2';


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}


  async hashPassword(password: string): Promise<string> {
   return await argon2.hash(password);
 }


   
// Cadastro de usuarios
 async createUser({fullname,email,password,nif,role,balance}:UserDTO) {

     let hashedPassword = "" 
     
     
      const checkemail  = await this.prisma.user.findFirst({where: {email}})
       const checknif  = await this.prisma.user.findFirst({where: {nif}})

       if(checknif) {
         throw new HttpException('O NIF fornecido já está em uso. Por favor, verifique se o número está correto ou escolha um diferente', HttpStatus.BAD_REQUEST)
       }
       if(checkemail) {
        throw new HttpException('Este e-mail já está em uso. Por favor, insira um e-mail diferente.', HttpStatus.BAD_REQUEST)
      }

      if(password.length < 8) {
        throw new HttpException('A senha deve ter no mínimo 8 caracteres.', HttpStatus.BAD_REQUEST)
      }else {

         hashedPassword = await this.hashPassword(password)

      }
      


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




}


// Busca de todos os usuarios
async getAllUsers() {
   return await this.prisma.user.findMany({
       select: {
         id:true,
         fullname: true,
         email:true,
         nif: true,
         role: true,
         creatAt: true, 
         balance: true
      
       }
   })
}

 
// Busca de usuarios por email
async getUserByEmail(email: string) {

    try {

      const checkEmail = await this.prisma.user.findFirst({where: {email: email}}) 
      if(!checkEmail) {
         throw new HttpException('Email informado não encontrado', HttpStatus.BAD_REQUEST)
      }

    }catch(error) {
       throw new HttpException("Error na aplicação por favor contacta a equipe de desenvolvimento.",HttpStatus.BAD_REQUEST)
    }

   return await this.prisma.user.findFirst({where: {email: email}, select: {
         id:true,
         fullname: true,
         email:true,
         nif: true,
         role: true,
         creatAt: true, 
         balance: true
   }})
}



// busca de usuarios por id
async getUserById(id: string) {

    try {

      const checkId = await this.prisma.user.findFirst({where: {id}})

      if(!checkId) {
         throw new HttpException('Id informado não encontrado', HttpStatus.BAD_REQUEST)
      }

      return await this.prisma.user.findFirst({where: {id},select: {
         id:true,
         fullname: true,
         email:true,
         nif: true,
         role: true,
         creatAt: true, 
         balance: true

      } })

    }catch(error) {
       throw new HttpException("Error na aplicação por favor contacta a equipe de desenvolvimento.",HttpStatus.BAD_REQUEST)
    }
  
}


// deletar usuarios
async deleteUser(id: string) {
   
    try {
       const checkId = await this.prisma.user.findFirst({where: {id}})

        if(!checkId) {
          throw new HttpException('Id informado não encontrado', HttpStatus.BAD_REQUEST)
       }

       return await this.prisma.user.delete({where: {id}})


    }catch(error) {
        throw new HttpException("Error na aplicação por favor contacta a equipe de desenvolvimento.",HttpStatus.BAD_REQUEST)
    }

   
}


// atualizar saldo de usuarios
async updateBalance(balance: number, userId: string) {

         try {

          const user = await this.prisma.user.findFirst({where:{id: userId}})

       if(!user) {
           throw new HttpException('Id informado não encontrado', HttpStatus.BAD_REQUEST)
       }

       const current_balance = user.balance + balance

      return await this.prisma.user.update({where:{id: userId}, data:{balance:current_balance}})

         }catch(error) {
            throw new HttpException("Error na aplicação por favor contacta a equipe de desenvolvimento.",HttpStatus.BAD_REQUEST)
         }

      
       


}

// atualizar usuarios
async updateUser(id: string, data: UserDTO) {

   let passwd = ""

   try {

    const checkId = await this.prisma.user.findFirst({where: {id}})

   

    if(!checkId) {
      throw new HttpException('Id informado não encontrado', HttpStatus.BAD_REQUEST)
    }


    if(data.password != "") {
      
       passwd = await this.hashPassword(data.password)

    }else {
     
      passwd = checkId.password

    }

   

    return await this.prisma.user.update({where: {id}, data: {
         fullname: data.fullname,
      email: data.email,
      nif: data.nif,
      password: passwd,
      role: data.role,
      balance: data.balance
    }})

   }catch(error) {
      throw new HttpException("Error na aplicação por favor contacta a equipe de desenvolvimento.",HttpStatus.BAD_REQUEST)
   }

   

}



}
