import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1> API BULIR-SERVICE </h1>';
  }
}
