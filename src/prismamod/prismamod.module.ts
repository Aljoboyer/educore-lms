import { Module } from '@nestjs/common';
import { PrismamodService } from './prismamod.service';

@Module({
  providers: [PrismamodService],
  exports: [PrismamodService]
})
export class PrismamodModule {}
