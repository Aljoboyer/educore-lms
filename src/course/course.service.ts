import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/createcourse.dto';

@Injectable()
export class CourseService {

    async createCourse(courseData: CreateCourseDto) {
        // Logic to create a course
        return {
            message: 'Course created successfully',
            course: courseData,
        };
    }
}
