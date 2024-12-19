import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async isEmailTaken(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email } });
        return !!user; // Retorna true se o e-mail existir
    }

    async isCPFTaken(cpf: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { cpf } });
        return !!user;
    }
}
