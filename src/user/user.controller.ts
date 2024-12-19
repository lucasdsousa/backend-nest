import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('check-duplicate')
    async checkDuplicate(@Body() body: { email: string; cpf: string }) {
        const { email, cpf } = body;

        const isEmailTaken = await this.userService.isEmailTaken(email);
        const isCPFTaken = await this.userService.isCPFTaken(cpf);

        if (isEmailTaken && isCPFTaken) {
            throw new BadRequestException('Email e CPF já cadastrados.');
        } else if (isEmailTaken) {
            throw new BadRequestException('Email já cadastrado.');
        } else if (isCPFTaken) {
            throw new BadRequestException('CPF já cadastrado.');
        }

        return { message: 'Email e CPF disponíveis.' };
    }
}
