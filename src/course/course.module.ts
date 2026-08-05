import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [AuthGuard],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
