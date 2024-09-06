"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const jwt_1 = require("@nestjs/jwt");
const socket_io_1 = require("socket.io");
let WebsocketsGateway = class WebsocketsGateway {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.users = 0;
    }
    afterInit(server) {
        console.log('WebSocket Gateway initialized' + server.toString());
    }
    handleConnection(client) {
        try {
            const token = client.handshake.auth.token;
            const user = this.jwtService.verify(token.replace('Bearer ', ''));
            this.users++;
            this.server.emit('usersOnline', this.users);
            console.log(`User connected: ${user.username}`);
        }
        catch (error) {
            console.log('Unauthorized user' + error);
            client.disconnect();
        }
    }
    handleDisconnect() {
        this.users--;
        this.server.emit('usersOnline', this.users);
    }
    handleMessage(client, payload) {
        const token = client.handshake.auth.token;
        const user = this.jwtService.verify(token.replace('Bearer ', ''));
        this.server.emit('messageToClient', user.username, payload);
    }
};
exports.WebsocketsGateway = WebsocketsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('messageToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], WebsocketsGateway.prototype, "handleMessage", null);
exports.WebsocketsGateway = WebsocketsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], WebsocketsGateway);
//# sourceMappingURL=websockets.gateway.js.map