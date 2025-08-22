import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';

interface payloadInterface {
    user_refresh_token: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('TOKEN_SECRET_KEY', ''),
        });
    }
    async validate(payload: payloadInterface) {
        const refreshToken = payload.user_refresh_token;
        const user = await this.userService.getOne({
            refresh_token: refreshToken,
        });

        if (!user) throw new UnauthorizedException('User not found');

        return user;
    }
}
