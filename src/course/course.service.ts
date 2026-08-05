import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/createcourse.dto';
import { PrismamodService } from 'src/prismamod/prismamod.service';
import { CourseRepository } from 'src/common/baserepository';

@Injectable()
export class CourseService {

    constructor(
        private readonly prisma: PrismamodService,
        private readonly courseRepository: CourseRepository,
    ) {}

    async createCourse(courseData: CreateCourseDto) {
        // const course = await this.prisma.course.create({
        //     data: courseData,
        // });

        const course = await this.courseRepository.create(courseData);
        return {
            message: 'Course created successfully',
            course: course,
        };
    }
}
