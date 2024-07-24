import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty } from "class-validator"

export class AuthDto {

    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    @IsEmail()
    email:string

    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    password:string
}