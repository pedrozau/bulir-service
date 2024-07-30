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
     return await this.serviceService.getAllService()
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
     return await this.serviceService.servicehire(data)
   }


   @Delete('delete/:id')
   @UseGuards(AuthGuard)
   async deleteService(@Param('id') id: string) {
     return await this.serviceService.deleteService(id)
   }

   
   @Put('update/:id')
   @UseGuards(AuthGuard)
   async updateService(@Body() data:ServiceDTO, @Param('id') id:string) {
     return await this.serviceService.updateService(data, id)
   }

   

  
  

}
