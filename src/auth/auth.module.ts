import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismamodModule } from 'src/prismamod/prismamod.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [PrismamodModule],
})
export class AuthModule {}
