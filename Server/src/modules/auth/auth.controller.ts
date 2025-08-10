import {
    BadRequestException,
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
import { MailerService } from '@nestjs-modules/mailer';
import { VerifyEmailDto } from 'src/modules/auth/dto/verify-email-request.dto';
import { generateRandomInt } from 'src/utils/generate-random-int';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private mailerService: MailerService,
    ) {}

    // Login
    @UseGuards(LocalAuthGuard)
    @Post('login-local')
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
            secure: true,
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            message: 'success',
            access_token,
            user,
        });
    }

    // Sign up
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
            message: 'success',
            user: createdUser,
        };
    }

    // Refresh token
    @Post('refresh-token')
    refreshToken() {
        return 'Hello';
    }

    // Verify email
    @Post('verify-email')
    @ApiBody({ type: VerifyEmailDto })
    @ApiResponse({
        status: 200,
        description: 'Verification code sent successfully',
        schema: {
            example: {
                message: 'success',
                verify_code: 123456,
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid email address',
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to send verification email',
    })
    async verifyEmail(@Body() dataEmail: VerifyEmailDto) {
        const email = dataEmail.email;
        const verifyCode = generateRandomInt(100000, 999999);

        try {
            await this.mailerService.sendMail({
                to: email,
                from: 'easysport@gmail.com',
                subject: 'EASYSPORT: Verify your email.',
                template: 'verify-email',
                context: {
                    email: email,
                    purpose: 'verify your account',
                    verifyCode,
                    year: new Date().getFullYear(),
                },
            });

            return {
                message: 'success',
                verify_code: verifyCode,
            };
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            if (error.message.includes('Invalid email')) {
                throw new BadRequestException('Invalid email address.');
            }
            throw new InternalServerErrorException(
                'Failed to send verification email.',
            );
        }
    }
}
