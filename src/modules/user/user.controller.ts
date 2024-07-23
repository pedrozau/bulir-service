import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './DTO/user.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

   

    @Post('/')
    async signup(@Body()  data:UserDTO) {

      return this.userService.createUser(data)

    }

}
