import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismamodModule } from 'src/prismamod/prismamod.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [AuthModule, PrismamodModule],
})
export class CourseModule {}
