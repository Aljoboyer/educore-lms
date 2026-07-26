import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registeruser.dto';
import { PrismamodService } from 'src/prismamod/prismamod.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismamodService
    ) {}

    async registerUser(registerUserDto: RegisterUserDto) {
        await this.prisma.$transaction(async (tx) => {

        })
        return  {
            message: 'User created successfully',
            user: registerUserDto,
            token: 'token',
        }
    }
}
