import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class InternalTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader) {
      throw new UnauthorizedException("Missing Authorization header");
    }

    const expected = `Bearer ${process.env.TOKEN_INTERNAL_SERVICE}`;

    if (authHeader !== expected) {
      throw new UnauthorizedException("Invalid internal service token");
    }

    return true;
  }
}
