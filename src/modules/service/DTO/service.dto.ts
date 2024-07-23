import { IsNotEmpty, IsNumber } from "class-validator"



export class ServiceDTO  {
    
    
    title: string
    description: string
    @IsNumber()
    price: number
    providerId: string


}