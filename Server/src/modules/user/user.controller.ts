import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAll() {
        throw new UnauthorizedException('Test Exception');
    }
}
