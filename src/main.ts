import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Hotel aggregator lite')
    .setDescription('Lite version of hotel aggregator API for integration with react')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.useStaticAssets(join(__dirname, '..', 'files'), {
    prefix: '/files/',
  });

  await app.listen(process.env.HTTP_PORT || 80);
}
bootstrap();
