/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: process.env.SERVER_DOMAIN + '/auth/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
    ): Promise<any> {
        const { id, displayName, emails, photos } = profile;

        const info = {
            provider: 'google',
            providerId: id,
            email: emails?.[0]?.value || '',
            displayName: displayName || '',
            picture: photos?.[0]?.value || '',
            accessToken,
            refreshToken,
        };

        const userRegisted = await this.userService.getOneByEmail(info.email);

        if (userRegisted) return userRegisted;

        const user = {
            email: info.email,
            name: info.displayName,
            password: info.providerId + process.env.GOOGLE_CLIENT_SECRET,
        };

        return this.userService.create(user);
    }
}
