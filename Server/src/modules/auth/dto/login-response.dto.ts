import { ApiProperty } from '@nestjs/swagger';

class UserResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: string;
}

export class LoginResponseDto {
    @ApiProperty()
    access_token: string;

    @ApiProperty({ type: UserResponseDto })
    user: UserResponseDto;
}
