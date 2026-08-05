
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './decorators/roles.decorator';
import { UserRole } from './dto/registeruser.dto';
import { AuthService } from './auth.service';
import { PrismamodService } from 'src/prismamod/prismamod.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismamodService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const UserData: any =   await this.prisma.user.findUnique({
        where: { id: user.id },
      });
  
    if(UserData.status !== 'ACTIVE') {
      return false;
    }
    return requiredRoles.some((role) => UserData.role === role);
  }
}
