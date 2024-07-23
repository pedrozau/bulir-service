import { Body, Controller, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceDTO } from './DTO/service.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Service')
@Controller('api/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
  

  @Post('create')
  async createService(@Body() data:ServiceDTO) {

     return await this.serviceService.createService(data)
    
  }

   @Get('getAll')
   async  getAllServices() {
     return await this.serviceService.getAllServices()
   }

   

   @Get('getById/:id')
   async getServiceById(@Param('id') id: string) {
     return await this.serviceService.getServiceById(id)
   }
   
   @Post('hire')
   async hireService(@Body() {serviceId, userId}:{serviceId:string, userId:string}) {
     return await this.serviceService.hireService(serviceId, userId)
   }


   @Delete('delete/:id')
   async deleteService(@Param('id') id: string) {
     return await this.serviceService.deleteService(id)
   }

   
   @Put('update/:id')
   async updateService(@Body() data:ServiceDTO, @Param('id') id:string) {
     return await this.serviceService.updateService(data, id)
   }

   

  
  

}
