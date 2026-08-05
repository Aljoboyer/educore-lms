import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/scripts/default-index.js';
import { CreateCourseDto } from 'src/course/dto/createcourse.dto';
import { PrismamodService } from 'src/prismamod/prismamod.service';

@Injectable()
export abstract class BaseRepository {
  constructor(protected readonly prisma: PrismamodService) {}
}
@Injectable()
export class CourseRepository extends BaseRepository {

  async create(courseData: CreateCourseDto) {
   
    const course = await this.prisma.course.create({
      data: courseData,
    });

    return course;
  }
}
