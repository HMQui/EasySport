import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { LocalStrategy } from 'src/common/passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from 'src/common/passport/google.strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, GoogleStrategy],
    imports: [
        UserModule,
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.TOKEN_SECRET_KEY,
            signOptions: { expiresIn: '30m' },
        }),
    ],
})
export class AuthModule {}
