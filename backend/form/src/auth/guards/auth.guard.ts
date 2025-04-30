/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {
      const payload = this.jwtService.verify(token); // Verify the token
      request.user = payload; // Attach the decoded payload to the request object
      console.log('payload',payload)
      const requiredRoles=this.getRequiredRoles(context); // Get the required roles from the context
      console.log('requiredRoles',requiredRoles)
      console.log('payload-role',payload.role)
      
      if (requiredRoles && !requiredRoles.includes(payload.role)) {
       throw new ForbiddenException(`Access denied for role:${payload.role}`);
      }

      return Promise.resolve(true);
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers['authorization'];
    console.log('authHeader',authHeader)
    if (!authHeader) {
      return undefined;
    }
    const [type, token] = authHeader.split(' ');
    console.log('type',type)
    return type === 'Bearer' ? token : undefined;
  }
  private getRequiredRoles = (context: ExecutionContext): string[] | undefined => {
    const handler= context.getHandler();
    const roles= Reflect.getMetadata('roles', handler);
    return roles;
  }
}