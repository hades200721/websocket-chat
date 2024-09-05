import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtAuthGuard } from '../services/jwt-auth.guard'; // Create a custom WebSocket Auth Guard

@WebSocketGateway({ cors: true })
export class WebsocketsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private users: number = 0;
  @WebSocketServer() server: Server;

  constructor(private readonly jwtService: JwtService) {}

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized' + server.toString());
  }

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.authorization;
      const user = this.jwtService.verify(token.replace('Bearer ', ''));
      this.users++;
      this.server.emit('usersOnline', this.users as any);
      console.log(`User connected: ${user.username}`);
    } catch (error) {
      console.log('Unauthorized user' + error);
      client.disconnect();
    }
  }

  handleDisconnect() {
    this.users--;
    this.server.emit('usersOnline', this.users as any);
  }
  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, payload: any): WsResponse<string> {
    console.log(`Message from client ${client.id}: ${payload}`);
    this.server.emit('messageToClient', payload);
    return { event: 'messageToClient', data: payload };
  }
}
