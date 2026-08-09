import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/createcourse.dto';
import { PrismamodService } from 'src/prismamod/prismamod.service';
import { CourseRepository } from 'src/common/baserepository';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { PaginationDto } from 'src/common/pagination/pagination.dto';

@Injectable()
export class CourseService {

    constructor(
        private readonly prisma: PrismamodService,
        private readonly courseRepository: CourseRepository,
        private readonly paginationService: PaginationService,

    ) {}

    async createCourse(courseData: CreateCourseDto) {
        const course = await this.courseRepository.create(courseData);
        return {
            message: 'Course created successfully',
            course: course,
        };
    }

    async getAllCourses(paginationDto: PaginationDto) {
    
        return this.paginationService.paginate({
            page: Number(paginationDto.page),
            limit: Number(paginationDto.limit),
            order: paginationDto.sort,
            where: paginationDto.search ? {
                OR: [
                    {
                    title: {
                        contains: paginationDto.search,
                        mode: 'insensitive' as const,
                    },
                    },
                ],
                }
            : undefined,

            findMany: (args) =>
            this.prisma.course.findMany({
                ...args,
            }),

            count: (args) =>
            this.prisma.course.count({
                where: args.where,
            }),
        });
    }
}
