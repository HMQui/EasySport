import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
    @IsNotEmpty({ message: 'Email is required.' })
    @IsString({ message: 'Email must be a string' })
    @ApiProperty()
    email: string;

    @IsNotEmpty({ message: 'Purpose is required.' })
    @IsString({ message: 'Purpose must be a string' })
    @ApiProperty()
    purpose: string;
}
