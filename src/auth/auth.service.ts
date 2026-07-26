import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registeruser.dto';

@Injectable()
export class AuthService {

    async registerUser(registerUserDto: RegisterUserDto) {
        console.log('Registering user:', registerUserDto);
        return  {
            message: 'User created successfully',
            user: registerUserDto,
            token: 'token',
        }
    }
}
