import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismamodModule } from 'src/prismamod/prismamod.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [AuthModule, PrismamodModule, CommonModule],
})
export class CourseModule {}
