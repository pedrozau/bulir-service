import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString } from "class-validator"




enum Role {
    cliente = 'cliente',
    prestador = 'prestador'
   }



export class UserDTO {
     
     @IsNotEmpty()     
     @ApiProperty()
     fullname: string 

     @IsEmail()
     @ApiProperty()
     email: string

     @IsNotEmpty()
     @ApiProperty()
     @IsNumberString()
     nif: string  

     @IsNotEmpty()
     @ApiProperty()
     password: string 

     @ApiProperty()
     @IsNotEmpty()
     role: Role
     
     @IsNumber()
     @ApiProperty()
     balance?: number
     
     

}

