import { Body, Controller, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceDTO } from './DTO/service.dto';

@Controller('api/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
  

  @Post('create')
  async createService(@Body() data:ServiceDTO) {

     return await this.serviceService.createService(data)
    
  }

   @Get()
   async  getAllServices() {
     return await this.serviceService.getAllServices()
   }

   

   @Get(':id')
   async getServiceById(@Param('id') id: string) {
     return await this.serviceService.getServiceById(id)
   }
   
   @Post('hire')
   async hireService(@Body() {serviceId, userId}:{serviceId:string, userId:string}) {
     return await this.serviceService.hireService(serviceId, userId)
   }


   @Delete(':id')
   async deleteService(@Param('id') id: string) {
     return await this.serviceService.deleteService(id)
   }

   
   @Put(':id')
   async updateService(@Body() data:ServiceDTO, @Param('id') id:string) {
     return await this.serviceService.updateService(data, id)
   }

   

  
  

}
