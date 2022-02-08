import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ports } from '@app/shared/appConfig.json'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
    }));

    await app.listen(ports.main);
}
bootstrap();
