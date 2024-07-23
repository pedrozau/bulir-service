import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"



export class ServiceDTO  {
    
    @IsNotEmpty()
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string

    @ApiProperty()
    @IsNumber()
    price: number

    @ApiProperty()
    providerId: string


}