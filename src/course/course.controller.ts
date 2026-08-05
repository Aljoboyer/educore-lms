import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateCourseDto } from './dto/createcourse.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createCourse(@Body() courseData: CreateCourseDto) {
    return this.courseService.createCourse(courseData);
  }
}
