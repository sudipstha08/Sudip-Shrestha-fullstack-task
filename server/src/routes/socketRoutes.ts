import { Socket } from 'socket.io'

export class SocketRoutes {
  public async onConnection(socket: Socket) {
    console.log('Connected onConnection', socket)
  }
}
