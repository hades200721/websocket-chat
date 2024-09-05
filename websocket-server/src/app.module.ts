import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth.module';
import { UsersModule } from './modules/users.module';
import { WebsocketsGateway } from './gateway/websockets.gateway';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // Ensure the secret is available
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [WebsocketsGateway],
})
export class AppModule {}
