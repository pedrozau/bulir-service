import { Body, Controller, Post } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceDTO } from './DTO/service.dto';

@Controller('api/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
  

  @Post('create')
  async createService(@Body() data:ServiceDTO) {

     return await this.serviceService.createService(data)
    
  }
}
