import { IsDate, IsEnum, IsNumber, IsOptional, MinLength } from "class-validator"
import { IsString } from "class-validator/types/decorator/typechecker/IsString"
import { Gender } from "./registeruser.dto"

export class ProfileUpdateDto { 
    @IsString()
    id!: string

    @IsString()
    userId!: string

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