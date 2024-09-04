import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins for simplicity; you can restrict this in production
  },
})
export class WebsocketsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private users: number = 0;
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized' + server.toString());
  }

  handleConnection() {
    this.users++;
    this.server.emit('usersOnline', this.users as any);
  }

  handleDisconnect() {
    this.users--;
    this.server.emit('usersOnline', this.users as any);
  }

  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, payload: any): void {
    console.log(`Message from client ${client.id}: ${payload}`);
    this.server.emit('messageToClient', payload);
  }
}
