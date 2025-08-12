import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { generateRandomString } from 'src/utils/gererate-random-string';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(userData: User) {
        const payload = {
            sub: userData.id,
            email: userData.email,
            role: userData.role,
        };

        const access_token = this.jwtService.sign(payload);

        const existingUser = await this.userService.getOneByEmail(
            userData.email,
        );

        let refresh_token: string;

        if (existingUser?.refresh_token) {
            refresh_token = this.jwtService.sign(
                { user_refresh_token: existingUser.refresh_token },
                { expiresIn: '30d' },
            );
        } else {
            const randomString = generateRandomString(32);
            userData.refresh_token = randomString;
            await this.userService.update(userData.id, userData);
            refresh_token = this.jwtService.sign(
                { user_refresh_token: randomString },
                { expiresIn: '30d' },
            );
        }

        return {
            access_token,
            refresh_token,
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                role: userData.role,
                avatar: userData.avatar,
            },
        };
    }

    async verifyRefreshToken(refreshToken: string) {
        if (!refreshToken) return null;

        try {
            const decoded = this.jwtService.verify<{
                user_refresh_token: string;
            }>(refreshToken);

            if (!decoded?.user_refresh_token) {
                return null;
            }

            const user = await this.userService.getOne({
                refresh_token: decoded.user_refresh_token,
            });
            if (!user) return null;

            const payload = {
                sub: user.id,
                email: user.email,
                role: user.role,
            };
            const access_token = this.jwtService.sign(payload);

            return {
                access_token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                },
            };
        } catch {
            return null;
        }
    }
}
