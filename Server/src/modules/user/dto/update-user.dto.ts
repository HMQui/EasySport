import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    Length,
    MinLength,
} from 'class-validator';
import { UserRole } from 'src/entities/user.entity';

export class UpdateDto {
    @ApiPropertyOptional({ example: 'John Doe' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: 'example@gmail.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: 'StrongPass123' })
    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password?: string;

    @ApiPropertyOptional({ enum: UserRole })
    @IsOptional()
    @IsEnum(UserRole, { message: 'Role must be user, owner, or admin' })
    role?: UserRole;

    @IsString()
    @IsOptional()
    avatar: string;

    @ApiPropertyOptional({ example: '0123456789' })
    @IsString()
    @IsOptional()
    @Length(10, 10)
    phone?: string;
}
