
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './decorators/roles.decorator';
import { UserRole } from './dto/registeruser.dto';
import { AuthService } from './auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService
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

    const getUserRole = async () => {
      // Assuming you have a service to fetch user details from the database
      const userDetails = await this.authService.getUserProfile(user.id);
      return userDetails;
    };
    const UserData: any = await getUserRole();
   
    if(UserData.user.status !== 'ACTIVE') {
      return false;
    }
    return requiredRoles.some((role) => UserData.user.role === role);
  }
}
