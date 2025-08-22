import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UploadImageModule } from 'src/modules/upload-image/upload-image.module';
import { JwtStrategy } from 'src/common/passport/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
    imports: [
        TypeOrmModule.forFeature([User]),
        UploadImageModule,
        ConfigModule,
    ],
    exports: [UserService],
})
export class UserModule {}
