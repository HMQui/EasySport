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

        const randomString = generateRandomString(32);
        userData.refresh_token = randomString;
        await this.userService.update(userData.id, userData);
        const refresh_token = this.jwtService.sign(
            { user_refresh_token: randomString },
            {
                expiresIn: '30d',
            },
        );

        return {
            access_token,
            refresh_token,
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                role: userData.role,
            },
        };
    }
}
