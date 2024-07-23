import { IsEmail, IsNotEmpty, IsNumber, IsNumberString } from "class-validator"

enum Role {
    cliente = 'cliente',
    prestador = 'prestador'
   }



export class UserDTO {
     
     @IsNotEmpty()     
     
     fullname: string 

     @IsEmail()
     email: string

     @IsNotEmpty()
     @IsNumberString()
     nif: string  

     @IsNotEmpty()
     password: string 
     
     @IsNotEmpty()
     role: Role
     
     @IsNumber()
     balance?: number
     
     

}

