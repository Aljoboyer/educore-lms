import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registeruser.dto';
import { PrismamodService } from 'src/prismamod/prismamod.service';
import { EncryptService } from './encrypt/encrypt.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';
import { ProfileUpdateDto } from './dto/profileupdate.dto';
import { RedisService } from 'src/infrastructure/redis/redis.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismamodService,
        private readonly hashService: EncryptService,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService
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
        const cacheKey = `user:${id}`

        const cachedUser = await this.redisService.get<any>(cacheKey)

        if(cachedUser){
            return {
                message: 'User fetched from cached successfully',
                user: cachedUser,
            };
        }
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
            },
        });
        if (!user) {
            throw new ConflictException('User not found');
        }

        await this.redisService.set(
            cacheKey,
            JSON.stringify(user),
        );

        return {
            message: 'User fetched successfully',
            user,
        };
    }

    async changePassword(email: string, newPassword: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new ConflictException('User not found');
        }
        if(newPassword.length < 6) {
            throw new ConflictException('Password must be at least 6 characters long');
        }
        const hashedPassword = await this.hashService.hashPassword(newPassword);
        await this.prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        return {
            message: 'Password changed successfully',
        };
    }

    async updateUserProfile(updateUserDto: ProfileUpdateDto) {
        const userProfile = await this.prisma.userProfile.findUnique({
            where: { id: updateUserDto.id },
        });
        if (!userProfile) {
            throw new ConflictException('User profile not found');
        }
         await this.prisma.userProfile.update({
            where: { id: updateUserDto.id },
            data: updateUserDto,
        });

        const cacheKey = `user:${userProfile.userId}`

        await this.redisService.delete(cacheKey)

        return {
            message: 'User profile updated successfully',
        };
    }
}
