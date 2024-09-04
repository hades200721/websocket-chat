import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class WebsocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private users;
    server: Server;
    afterInit(server: Server): void;
    handleConnection(): void;
    handleDisconnect(): void;
    handleMessage(client: Socket, payload: any): void;
}
