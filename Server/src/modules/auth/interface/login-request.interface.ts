import { Request } from 'express';
import { User } from 'src/entities/user.entity';

export interface LoginRequest extends Request {
    user: User;
}
