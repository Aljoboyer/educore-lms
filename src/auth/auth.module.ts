import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismamodModule } from 'src/prismamod/prismamod.module';
import { EncryptService } from './encrypt/encrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { RedisModule } from 'src/infrastructure/redis/redis.module';

@Module({
  providers: [AuthService,EncryptService, AuthGuard, RolesGuard],
  controllers: [AuthController],
  imports: [
    PrismamodModule,
      JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
    RedisModule
  ],
  exports: [JwtModule, AuthGuard, RolesGuard],
})
export class AuthModule {}
