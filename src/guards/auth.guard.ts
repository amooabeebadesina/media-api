import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { InvalidRequestTokenException } from '../exceptions/vycon.exception';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  canActivate( context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>( 'isPublic', context.getHandler() );
    if ( isPublic ) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (!request.header('Authorization')) {
      throw new InvalidRequestTokenException('No token provided', 401);
    }
    const token = request.header('Authorization').split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded;
    } catch (err) {
      throw new InvalidRequestTokenException('Incorrect authentication token', 401);
    }
    return true;
  }
}
