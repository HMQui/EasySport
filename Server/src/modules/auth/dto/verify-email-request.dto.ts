import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
    @IsNotEmpty({ message: 'Email is required.' })
    @IsString({ message: 'Email must be a string' })
    @ApiProperty()
    email: string;
}
