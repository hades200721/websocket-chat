import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, { secret: 'a1b2c3d4' }); // Ensure the same secret
  }
}
