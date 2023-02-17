import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true});

  const swagger = new DocumentBuilder().setTitle('TEST TASK').setDescription("Valentyn Kurylo").
      setVersion('1.0.0').build()
  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup('/api/docs', app, document)
  await app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`)});
}
bootstrap();
