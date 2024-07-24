import { Body, Controller, Post,Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './DTO/user.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

    // Cadastro de usuarios

    @Post('create')
    async signup(@Body()  data:UserDTO) {

      return this.userService.createUser(data)

    }

    

    // Busca de todos os usuarios
    
    @Get('getAll')
    @UseGuards(AuthGuard)
    async getAllUsers() {
      return this.userService.getAllUsers()
    } 
    

    // Busca de usuarios por email
    @Get('getByEmail')
    @UseGuards(AuthGuard)
    async getUserByEmail(@Body('email') email: string) {
      return this.userService.getUserByEmail(email)
    }
    
    @Post('updateBalance')
    @UseGuards(AuthGuard)
    async updateBalance(@Body('balance') balance: number, @Body('userId') userId: string) {
      return this.userService.updateBalance(balance, userId)
    }
    

    // Busca de usuarios por id
    @Get('getById/:id')
    @UseGuards(AuthGuard)
    async getUserById(@Param('id') id: string) {
      return this.userService.getUserById(id)
    } 
    
    // Atualização de usuarios
    @Put('update/:id')
    @UseGuards(AuthGuard)
    async userUpdate(@Param('id') id: string, @Body() data: UserDTO) {
        return this.userService.updateUser(id, data)
    }
    
    // Deletar usuarios
    @Delete('delete/:id')
    @UseGuards(AuthGuard)
    async deleteUser(@Param('id') id: string) {
      return this.userService.deleteUser(id)
    }



}
