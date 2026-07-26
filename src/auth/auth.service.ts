import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registeruser.dto';
import { PrismamodService } from 'src/prismamod/prismamod.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismamodService
    ) {}

    async registerUser(registerUserDto: RegisterUserDto) {
        await this.prisma.$transaction(async (tx) => {
            const existingUser = await tx.user.findUnique({
                where: { email: registerUserDto.email },
            });
            if (existingUser) {
                throw new ConflictException('User with this email already exists');
            }

            const authObj = {
                email: registerUserDto.email,
                password: registerUserDto.password,
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
        });
        return  {
            message: 'User created successfully',
            token: 'token',
        }
    }
}
