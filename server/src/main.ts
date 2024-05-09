import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //additional variable
  const APP_PORT = Number(process.env.APP_PORT);
  const APP_VERSION = process.env.APP_VERSION

  //enable versioning api
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());

  //swagger config
  const config = new DocumentBuilder()
   .setTitle('API Docs')
   .setDescription('API Documentation')
   .setVersion(APP_VERSION)
   .addBearerAuth({
      type:'http',
      scheme:'bearer',
      bearerFormat:'JWT',
      name:'JWT',
      in:'header'
   })
   .build();
   const document = SwaggerModule.createDocument(app, config); 

   SwaggerModule.setup('docs', app, document);

   await app.listen(APP_PORT);

   console.log(`APP RUN ON PORT : ${APP_PORT}`);
}
bootstrap();
