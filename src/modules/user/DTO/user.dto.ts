import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString } from "class-validator"




enum Role {
    cliente = 'cliente',
    prestador = 'prestador'
   }



export class UserDTO {
     
     @IsNotEmpty()    
     @Expose() 
     @ApiProperty()
     fullname: string 

     @IsEmail()
     @IsNotEmpty()
     @Expose()
     @ApiProperty()
     email: string

     @IsNotEmpty()
     @ApiProperty()
     @Expose()
     @IsNumberString()
     nif: string  

     @IsNotEmpty()
     @Expose()
     @ApiProperty()
     password: string 

     @ApiProperty()
     @Expose()
     @IsNotEmpty()
     role: Role
     
     @IsNumber()
     @Expose()
     @ApiProperty()
     balance?: number
     
     

}

