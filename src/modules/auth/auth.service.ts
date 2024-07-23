import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { signInDto } from './DTO/auth.dto';
import * as crypto from 'bcrypt'
@Injectable()
export class AuthService {
  constructor(
     private prisma: PrismaService,
    private jwtService: JwtService
  ) {}


 async login({email, password}:signInDto) { 

       const  checkEmail = await this.prisma.user.findFirst({where:{email}})


       if(!checkEmail) {
            throw new UnauthorizedException('Email ou password não está correcto.')
       }

       const checkPassword =  await  crypto.compare(password, checkEmail.password)


       if(!checkPassword) {
            throw new UnauthorizedException('Email ou password não está correcto.')
       }


       const payload = { id: checkEmail.id, email: checkEmail.email }


       return { accessToken: this.jwtService.sign(payload) }
  }
    


 }

 
