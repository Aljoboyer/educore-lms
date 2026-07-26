import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registeruser.dto';
import { PrismamodService } from 'src/prismamod/prismamod.service';
import { EncryptService } from './encrypt/encrypt.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismamodService,
        private readonly hashService: EncryptService,
        private readonly jwtService: JwtService
    ) {}

    async registerUser(registerUserDto: RegisterUserDto) {
        return await this.prisma.$transaction(async (tx) => {
            const existingUser = await tx.user.findUnique({
                where: { email: registerUserDto.email },
            });
            if (existingUser) {
                throw new ConflictException('User with this email already exists');
            }

            const hashedPassword = await this.hashService.hashPassword(registerUserDto.password);
            const authObj = {
                email: registerUserDto.email,
                password: hashedPassword,
                role: registerUserDto.role,
                updatedAt: new Date(),
            }
            const user = await tx.user.create({
                data: authObj,
            });
            
            const userObj = {
                userId: user.id,
                firstName: registerUserDto.firstName,
                lastName: registerUserDto.lastName,
                gender: registerUserDto.gender,
                dateOfBirth: registerUserDto.dateOfBirth,
                bio: registerUserDto.bio,
                institution: registerUserDto.institution,
                totalCourses: registerUserDto.totalCourses,
                completedCourses: registerUserDto.completedCourses,
                totalCertificates: registerUserDto.totalCertificates,
                expertise: registerUserDto.expertise,
                experience: registerUserDto.experience,
                yearsExperience: registerUserDto.yearsExperience,
            };
            await tx.userProfile.create({
                data: userObj,
            });

            const payload = { email: user.email, role: user.role, id:  user.id };
            const token = await this.jwtService.signAsync(payload);
            return  {
                message: 'User created successfully',
                token: token,
            }
        });
    }

    
    async loginUser(loginUserDto: LoginUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginUserDto.email },
        });
        if (!user) {
            throw new ConflictException('User with this email does not exist');
        }
        const isMatch = await this.hashService.comparePassword(loginUserDto.password, user.password);
        if (!isMatch) {
            throw new ConflictException('Invalid password');
        }
        const payload = { email: user.email, role: user.role, id: user.id };
        const token = await this.jwtService.signAsync(payload);
        return {
            message: 'User logged in successfully',
            token: token,
        };
    }
    
    async getUserProfile(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
            },
        });
        if (!user) {
            throw new ConflictException('User not found');
        }
        return {
            message: 'User fetched successfully',
            user,
        };
    }

}
