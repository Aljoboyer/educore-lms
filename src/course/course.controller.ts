import { Body, Controller, Get, HttpException, InternalServerErrorException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateCourseDto } from './dto/createcourse.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/dto/registeruser.dto';
import { PaginationDto } from 'src/common/pagination/pagination.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) 
  @Post('create')
  async createCourse(@Body() courseData: CreateCourseDto) {
    try {
      return this.courseService.createCourse(courseData);
    } catch (error: any) {
        if (error instanceof HttpException) {
            throw error; 
        }
        throw new InternalServerErrorException(error.message || 'Something went wrong');
    }
  }

  @UseGuards(AuthGuard)
  @Get('getAllcourses')
  async getAllCourses(@Query() params: PaginationDto) {
    try {
      return this.courseService.getAllCourses(params);
    } catch (error: any) {
        if (error instanceof HttpException) {
            throw error;
        }
        throw new InternalServerErrorException(error.message || 'Something went wrong');
    }
  }
}
