import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/entities/user.entity';

export class SignUpDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required.' })
    @IsString({ message: 'Email must be a string.' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required.' })
    @IsString({ message: 'Password must be a string.' })
    password: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString({ message: 'Name must be a string.' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Phone is required.' })
    @IsString({ message: 'Phone must be a string.' })
    phone: string;

    @IsEnum(UserRole, { message: 'Role must be either user or owner' })
    @ApiProperty({ enum: UserRole })
    role: UserRole;
}
