import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './gateway/websockets.gateway';

@Module({
  providers: [WebsocketsGateway],
})
export class AppModule {}
