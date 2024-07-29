import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
   
   @Post('signin')
   @ApiBody({type:[AuthDto]})
   async signIn(@Body() data:AuthDto) {
      return await this.authService.signIn(data)
   }
   
   


}
