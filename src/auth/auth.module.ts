import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismamodModule } from 'src/prismamod/prismamod.module';
import { EncryptService } from './encrypt/encrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [AuthService,EncryptService, AuthGuard],
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
  ],
  exports: [JwtModule, AuthGuard],
})
export class AuthModule {}
