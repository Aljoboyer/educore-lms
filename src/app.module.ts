import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { InstructorModule } from './instructor/instructor.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { DatabaseModule } from './db-connect/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '../src/db-connect/database/config/validation';

@Module({
  imports: [
    AdminModule,
    InstructorModule,
    StudentModule,
    CourseModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
