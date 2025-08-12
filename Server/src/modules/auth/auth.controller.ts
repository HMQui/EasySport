import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Req,
    Request,
    Response,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import type { LoginRequest } from 'src/modules/auth/interface/login-request.interface';
import type { Response as ResType, Request as ReqType } from 'express';
import {
    ApiBody,
    ApiConflictResponse,
    ApiCookieAuth,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { LoginResponseDto } from 'src/modules/auth/dto/login-response.dto';
import { SignUpDto } from 'src/modules/auth/dto/sign-up-request.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { VerifyEmailDto } from 'src/modules/auth/dto/verify-email-request.dto';
import { generateRandomInt } from 'src/utils/generate-random-int';
import { GoogleAuthGuard } from 'src/common/guards/google-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private mailerService: MailerService,
    ) {}

    // Login Local
    @UseGuards(LocalAuthGuard)
    @Post('login-local')
    @ApiResponse({
        status: 200,
        description: 'Login',
        type: LoginResponseDto,
    })
    async loginLocal(@Request() req: LoginRequest, @Response() res: ResType) {
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

    // Login Google
    @Get('/login-google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {}

    @Get('/google/redirect')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req, @Response() res: ResType) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { access_token, refresh_token, user } =
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
            await this.authService.login(req.user);

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.redirect(process.env.CLIENT_DOMAIN + '/login-success');
    }

    // Logout
    @Post('/logout')
    logout(@Req() req: ReqType, @Response({ passthrough: true }) res: ResType) {
        const cookies = req.cookies as { refresh_token?: string };
        const refreshToken = cookies.refresh_token;

        if (refreshToken) {
            res.clearCookie('refresh_token', {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });
        }

        return {
            message: 'success',
        };
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
    @ApiCookieAuth('refresh_token')
    @ApiResponse({
        status: 200,
        description: 'Get new access token and User data',
        schema: {
            example: {
                message: 'success',
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'user',
                    avatar: 'https://example.com/avatar.jpg',
                },
            },
        },
    })
    async refreshToken(@Req() req: ReqType) {
        const cookies = req.cookies as { refresh_token?: string };
        if (!cookies?.refresh_token) {
            throw new UnauthorizedException('Refresh token not found.');
        }

        const result = await this.authService.verifyRefreshToken(
            cookies.refresh_token,
        );

        if (!result) {
            throw new UnauthorizedException('Invalid refresh token.');
        }

        const { access_token, user } = result;

        return {
            message: 'success',
            access_token,
            user,
        };
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
        const { email, purpose } = dataEmail;
        const verifyCode = generateRandomInt(100000, 999999);

        try {
            await this.mailerService.sendMail({
                to: email,
                from: 'easysport@gmail.com',
                subject: 'EASYSPORT: Verify your email.',
                template: 'verify-email',
                context: {
                    email: email,
                    purpose,
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
