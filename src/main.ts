import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//import * as csurf from 'csurf';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  //app.use(csurf());  
  const config = new DocumentBuilder()
  .setTitle('bulir-service')
  .setDescription('Esta aplicação é uma plataforma para a contratação de serviços, permitindo que clientes contratem prestadores de serviços e gerenciem suas transações financeiras. O projeto foi desenvolvido utilizando o framework NestJS e usa Docker para orquestração de serviços, incluindo PostgreSQL como banco de dados e Redis para caching e armazenamento de sessões.')
  .setVersion('1.0')
  .addTag('bulir-service')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(3000);

}
bootstrap();
