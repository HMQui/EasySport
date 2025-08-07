import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: process.env.CLIENT_DOMAIN,
        credentials: true,
    });

    app.use(cookieParser());

    const options = new DocumentBuilder()
        .setTitle('API Example') // Tiêu đề API
        .setDescription('API Documentation for Example Project') // Mô tả API
        .setVersion('1.0') // Phiên bản API
        .addTag('products') // Thêm Tag cho các endpoint (optional)
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
