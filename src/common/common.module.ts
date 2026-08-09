import { Module } from '@nestjs/common';
import { PrismamodModule } from 'src/prismamod/prismamod.module';
import { CourseRepository } from './baserepository';
import { PaginationService } from './pagination/pagination.service';

@Module({
    imports: [PrismamodModule],
    controllers: [],
    providers: [CourseRepository, PaginationService],
    exports: [CourseRepository, PaginationService],
})
export class CommonModule {}
