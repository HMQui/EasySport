import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from 'src/app/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Config CORS
    app.enableCors({
        origin: process.env.CLIENT_DOMAIN,
        credentials: true,
    });

    // Exception custom
    app.useGlobalFilters(new AllExceptionsFilter());

    // Cookies
    app.use(cookieParser());

    // Validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    // Swagger
    const options = new DocumentBuilder()
        .setTitle('API Example')
        .setDescription('API Documentation for Example Project')
        .setVersion('1.0')
        .addTag('products')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
