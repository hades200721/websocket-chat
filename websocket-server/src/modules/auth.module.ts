import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UsersModule } from './users.module';

@Module({
  imports: [
    UsersModule, // Import UsersModule to use UsersService
    JwtModule.register({
      secret: 'a1b2c3d4', // Replace with your actual secret
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
