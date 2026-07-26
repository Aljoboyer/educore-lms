import { IsDate, isDate, IsEmail, IsEnum, IsNumber, IsOptional, isString, IsString, MinLength } from "class-validator"

export enum UserRole {
    ADMIN = 'ADMIN',
    INSTRUCTOR = 'INSTRUCTOR',
    STUDENT = 'STUDENT'
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING',
    DELETED = 'DELETED'
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export class RegisterUserDto { 
    @IsEmail()
    email!: string

    @IsString()
    @MinLength(6)
    password!: string

    @IsEnum(UserRole)
    role!: UserRole

    @IsEnum(UserStatus)
    status!: UserStatus

    @IsString()
    @MinLength(2)
    firstName!: string

    @IsString()
    @MinLength(2)
    lastName!: string

    @IsEnum(Gender)
    gender!: Gender

    @IsOptional()
    @IsDate()
    dateOfBirth?: Date

    @IsOptional()
    @IsString()
    bio?: string
    
    @IsString()
    institution!: string
    
    @IsNumber()
    totalCourses!: number

    @IsNumber()
    completedCourses!: number

    @IsNumber()
    totalCertificates!: number

    @IsOptional()
    @IsString()
    expertise?: string

    @IsOptional()
    @IsNumber()
    experience?: number

    @IsOptional()
    @IsNumber()
    yearsExperience?: number
}