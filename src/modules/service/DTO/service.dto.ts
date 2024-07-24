import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsNotEmpty, IsNumber } from "class-validator"




export class ServiceDTO  {
    
    @IsNotEmpty()
    @ApiProperty()
    @Expose()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    description: string

    @ApiProperty()
    @Expose()
    @IsNumber()
    price: number

    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    providerId: string


}

export class ServiceHire {
     
    @ApiProperty() 
    @Expose()
    @IsNotEmpty()
     clientId: string
     

     @ApiProperty() 
     @Expose()
     @IsNotEmpty()
     serviceId: string 


}