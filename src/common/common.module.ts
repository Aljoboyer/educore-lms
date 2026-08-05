import { Module } from '@nestjs/common';
import { PrismamodModule } from 'src/prismamod/prismamod.module';
import { CourseRepository } from './baserepository';

@Module({
    imports: [PrismamodModule],
    controllers: [],
    providers: [CourseRepository],
    exports: [CourseRepository],
})
export class CommonModule {}
