import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { Booking } from 'src/entities/booking.entity';
import { Sport } from 'src/entities/sport.entity';
import { Field } from 'src/entities/field.entity';
import { FieldSlot } from 'src/entities/field-slot.entity';
import { FieldReview } from 'src/entities/field-review.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { UploadImageModule } from './modules/upload-image/upload-image.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: 3307,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User, Booking, Sport, Field, FieldSlot, FieldReview],
            synchronize: true,
        }),
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS,
                    },
                },
                defaults: {
                    from: '"EasySport" <modules@nestjs.com>',
                },
                template: {
                    dir: join(__dirname, '..', 'src', 'mail', 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
        PassportModule,
        UserModule,
        AuthModule,
        UploadImageModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
