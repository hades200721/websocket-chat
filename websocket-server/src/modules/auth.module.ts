import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UsersModule } from './users.module';

@Module({
  imports: [
    UsersModule, // Import UsersModule to use UsersService
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your actual secret
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
