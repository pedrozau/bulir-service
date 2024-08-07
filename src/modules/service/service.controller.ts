import { Body, Controller, Post, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceDTO, ServiceHire, ServiceSearch } from './DTO/service.dto';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';



@ApiTags('Service')
@ApiSecurity('basic')
@Controller('api/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
  

  @Post('create')
  @UseGuards(AuthGuard)
  async createService(@Body() data:ServiceDTO) {

     return await this.serviceService.createService(data)
    
  }

   @Get('getAll')
   @UseGuards(AuthGuard)
   async  getAllServices() {
     return await this.serviceService.getAllServices()
   }

    @Get('search/:title')
    async getByTitle(@Param('title') title: ServiceSearch) {
      return await this.serviceService.getServiceByTitle(title)
      
    }

   

   @Get('getById/:id')
   @UseGuards(AuthGuard)
   async getServiceById(@Param('id') id: string) {
     return await this.serviceService.getServiceById(id)
   }
   
   @Post('hire')
   @UseGuards(AuthGuard)
   async hireService(@Body() data: ServiceHire) {
    console.log(data.clientId)
    console.log(data.serviceId)   
     return await this.serviceService.serviceHire(data)
   }

   @Get('checkBalance')
   async checkBalance(@Body('userId') userId: string, @Body('serviceId') serviceId: string) {
     return await this.serviceService.checkBalance(serviceId, userId)
     
   }




   @Delete('delete/:id')
   @UseGuards(AuthGuard)
   async deleteService(@Param('id') id: string) {
     return await this.serviceService.deleteService(id)
   }

   
   @Put('update/:id')
   @UseGuards(AuthGuard)
   async updateService(@Body() data:ServiceDTO, @Param('id') id:string) {
     return await this.serviceService.updateService(id, data)
   }

   

  
  

}
