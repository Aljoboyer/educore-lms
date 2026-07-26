import { Body, Controller, HttpException, 
    InternalServerErrorException, Post , Get,
    Param} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registeruser.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    async registerUser(@Body() dto: RegisterUserDto) {
        try {
            return await this.authService.registerUser(dto);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error; 
            }
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    @Post('login')
    async loginUser(@Body() dto: LoginUserDto) {
        try {
            return await this.authService.loginUser(dto);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error; 
            }
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return await this.authService.getUserProfile(id);
    }
}
