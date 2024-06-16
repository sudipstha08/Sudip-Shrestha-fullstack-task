/* eslint-disable security-node/detect-crlf */
import { Socket } from 'socket.io'

export class SocketRoutes {
  public async onConnection(socket: Socket) {
    socket.on('startChat', msg => {
      const receivedMsg = JSON.parse(msg)
      socket.join('room')

      const res = JSON.stringify({
        username: receivedMsg.username,
        message: 'Chat started',
      })
      socket.emit('chatStarted', res)
    })

    socket.on('newMessage', msg => {
      const parsedMsg = JSON.parse(msg)
      console.log('parsedMsg', parsedMsg)
      socket.to('room').emit('incomingMessage', msg)
    })
  }
}
