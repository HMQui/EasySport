import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async update(id: number, userData: Partial<User>) {
        await this.userRepository.update({ id }, userData);

        return this.userRepository.findOneBy({ id });
    }

    async validateUser(email: string, passport: string) {
        const user = await this.userRepository.findOneBy({ email });

        if (user) {
            const isMatched = await bcrypt.compare(passport, user.password);

            if (isMatched) return user;
        }

        return null;
    }
}
