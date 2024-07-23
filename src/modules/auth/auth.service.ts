import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   
    constructor(
        private prisma:PrismaService,
        private jwtService: JwtService,
    ) {} 



     async signIn({email, password}:AuthDto){
        
             try {

               const checkemail =  await this.prisma.user.findFirst({
                  where:{
                        email
                    }
               })


               if(!checkemail){
                   throw new HttpException('Email ou  Senha  incorreta', 400);
               }
               
               const chackpassword =  await bcrypt.compare(password, checkemail.password)

               if(!chackpassword){
                   throw new HttpException('Email ou  Senha  incorreta', 400);
               }


               const data_ = await this.prisma.user.findFirst({
                 where:{
                    email
                  },
                  select:{
                    id:true,
                    email:true,
                    nif:true,
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




             }catch(error){
                 throw new HttpException('Invalid credentials', 400);
             }

        
    }


    async logout(){
        return {
            message: 'Logout Success'
        }
    }

}
