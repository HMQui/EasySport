import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Get,
    Param,
    Patch,
    Request,
    UnauthorizedException,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UploadImageService } from 'src/modules/upload-image/upload-image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Express } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UpdateDto } from 'src/modules/user/dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import {
    ApiBadRequestResponse,
    ApiConsumes,
    ApiForbiddenResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly uploadImageService: UploadImageService,
    ) {}

    @Get()
    getAll() {
        throw new UnauthorizedException('Test Exception');
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update/:userId')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: memoryStorage(),
        }),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBadRequestResponse({
        description:
            'Do not send avatar in request body. Use file upload instead.',
    })
    @ApiUnauthorizedResponse({
        description: 'User not found or invalid token',
    })
    @ApiForbiddenResponse({
        description: 'You are not allowed to update email or role',
    })
    async updateUser(
        @UploadedFile() image: Express.Multer.File,
        @Body() userData: UpdateDto,
        @Param('userId') userId: number,
    ) {
        if (userData.avatar) {
            throw new BadRequestException(
                'Do not send avatar in request body. Use file upload instead.',
            );
        }
        let user = await this.userService.getOne({ id: userId });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        if (user.role !== 'admin' && (userData.email || userData.role)) {
            throw new ForbiddenException(
                'You are not allowed to update email or role',
            );
        }
        if (image) {
            const defaultAvatar = process.env.DEFAULT_AVATAR;

            if (user?.avatar && user.avatar !== defaultAvatar) {
                await this.uploadImageService.deleteImage(user.avatar);
            }

            const result = await this.uploadImageService.uploadImage(
                image,
                'users',
            );

            userData.avatar = result.secure_url;
        }

        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }

        user = await this.userService.update(userId, userData);

        const responseUser = {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            avatar: user?.avatar,
            role: user?.role,
            reputation: user?.reputation,
            created_at: user?.created_at,
            updated_at: user?.updated_at,
        };

        return {
            message: 'success',
            user: responseUser,
        };
    }
}
