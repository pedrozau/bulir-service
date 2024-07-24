import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './auth.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   
    constructor(
        private prisma:PrismaService,
        private jwtService: JwtService,
    ) {} 


    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return await argon2.verify(hashedPassword, password);
      }


     async signIn({email, password}:AuthDto){
        
        

               const checkemail =  await this.prisma.user.findFirst({
                  where:{
                        email
                    }
               })

               
               if(!checkemail){
                   throw new HttpException('Email ou  Senha  incorreta', 400);
               }
               
               const chackpassword = await this.comparePasswords(password, checkemail.password)
             

               if(chackpassword){
                   throw new HttpException('Email ou  Senha  incorreta', 400);
               }else {
                

                const data_ = await this.prisma.user.findFirst({
                    where:{
                       email
                     },
                     select:{
                       id:true,
                       email:true,
                       nif:true,
                       balance:true,
                       role:true,
                     }
                  })
   
                  const payload = {
                   id: checkemail.id,
                   email:checkemail.email,
                   role:checkemail.role,
                  }
                 
   
                  return {
   
                      access_token: this.jwtService.sign(payload),
                      user: data_
                  }


               }

        
    }


    async logout(){
        return {
            message: 'Logout Success'
        }
    }

}
