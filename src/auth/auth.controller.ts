import { Body, Controller, HttpException, 
    InternalServerErrorException, Post , Get,
    Param,
    UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, UserRole } from './dto/registeruser.dto';
import { LoginUserDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './decorators/roles.decorator';
import { ProfileUpdateDto } from './dto/profileupdate.dto';

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

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
    @Get(':id')
    async getUser(@Param('id') id: string) {
        return await this.authService.getUserProfile(id);
    }

    @UseGuards(AuthGuard)
    @Post('change-password')
    async changePassword(@Body() body: { email: string, newPassword: string }) {
        try {
         const { email, newPassword } = body;
         return await this.authService.changePassword(email, newPassword);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error; 
            }
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    @UseGuards(AuthGuard)
    @Post('update-profile')
    async updateUserProfile(@Body() body: ProfileUpdateDto) {
        try {
            return await this.authService.updateUserProfile(body);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error; 
            }
            throw new InternalServerErrorException('Something went wrong');
        }
    }
}
