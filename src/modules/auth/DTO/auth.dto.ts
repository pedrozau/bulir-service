import { IsEmail, IsNotEmpty} from "class-validator"

export class signInDto   {

    @IsNotEmpty()
    @IsEmail() 
    email: string 

    @IsNotEmpty()
    password: string


}