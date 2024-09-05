import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // Export UsersService so it can be used in AuthModule
})
export class UsersModule {}
