import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto): Promise<User> {
        const { password, ...userData } = registerDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });

        return this.userRepository.save(newUser);
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw new UnauthorizedException('Credenciais inválidas');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Credenciais inválidas');

        const payload = { id: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return { token };
    }
}
