import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/createcourse.dto';
import { PrismamodService } from 'src/prismamod/prismamod.service';
import { CourseRepository } from 'src/common/baserepository';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { RedisService } from 'src/infrastructure/redis/redis.service';

@Injectable()
export class CourseService {

    constructor(
        private readonly prisma: PrismamodService,
        private readonly courseRepository: CourseRepository,
        private readonly paginationService: PaginationService,
        private readonly redisService: RedisService
    ) {}

    async createCourse(courseData: CreateCourseDto) {
        const course = await this.courseRepository.create(courseData);
        return {
            message: 'Course created successfully',
            course: course,
        };
    }

    async getAllCourses(paginationDto: PaginationDto, userId: string) {

        const formatedData = this.paginationService.paginate({
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

        const cacheKey = `recent-search:${userId}`
        await this.redisService.lpush(cacheKey, paginationDto.search)
        return formatedData
    }

    async getRecentSearch(userId: string){
        const cacheKey = `recent-search:${userId}`
        const recentSearchKey = await this.redisService.lrange(cacheKey, 0, -1)

        return {
            recentSearchKey,
            message: 'Key found'
        }
    }

    async redisSetTest(body: any) {
        const { key, value } = body;
        await this.redisService.sadd(key, value);
          
        const setMembers = await this.redisService.smembers(key);

        return {
            message: 'Key set successfully',
            setMembers,
        };
    }
}
