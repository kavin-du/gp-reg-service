import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // getting the roles assigned to the route
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if(!requiredRoles) {
      return true; // no roles for the route
    }

    const { user } = context.switchToHttp().getRequest();
    console.log(user)
    return requiredRoles.some(role => user.roles?.included(role));
  }

}