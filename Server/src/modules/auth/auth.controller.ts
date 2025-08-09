import {
    Body,
    ConflictException,
    Controller,
    InternalServerErrorException,
    Post,
    Request,
    Response,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import type { LoginRequest } from 'src/modules/auth/interface/login-request.interface';
import type { Response as ResType } from 'express';
import {
    ApiBody,
    ApiConflictResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { LoginResponseDto } from 'src/modules/auth/dto/login-response.dto';
import { SignUpDto } from 'src/modules/auth/dto/sign-up-request.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiResponse({
        status: 200,
        description: 'Login',
        type: LoginResponseDto,
    })
    async login(@Request() req: LoginRequest, @Response() res: ResType) {
        const { access_token, refresh_token, user } =
            await this.authService.login(req.user);

        if (!access_token || !refresh_token || !user)
            throw new InternalServerErrorException();

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return {
            access_token,
            user,
        };
    }

    @Post('sign-up')
    @ApiBody({ type: SignUpDto })
    @ApiConflictResponse({
        description: 'Email has been registered.',
    })
    async signUp(@Body() userData: SignUpDto) {
        const user = await this.userService.getOneByEmail(userData.email);
        if (user) throw new ConflictException('Email has been registed.');

        const createdUser = await this.userService.create(userData);
        return {
            message: 'Success',
            user: createdUser,
        };
    }

    @Post('refresh-token')
    refreshToken() {
        return 'Hello';
    }
}
