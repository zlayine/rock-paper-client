import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

class SocketioService {
  socket: Socket;
  channel: string;

  constructor() {}

  init() {
    return new Promise((resolve) => {
      this.socket = io(import.meta.env.VITE_SOCKETIO_URL);
      this.socket.on('connect', () => {
        resolve('connected');
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
    }
  }

  sendChoice(choice: string) {
    this.socket.emit('choice', { channel: this.channel, choice });
  }

  onChoiceMade(callback: Function) {
    this.socket.on('choice', (choice: string) => callback(choice));
  }

  onUserConnected(callback: Function) {
    this.socket.on('user connected', () => callback());
  }

  joinChannel(channelId: string) {
    this.channel = channelId;
    this.socket.emit('join channel', channelId);
  }

  readyToPlay() {
    this.socket.emit('ready', this.channel);
  }

  onReady(callback: Function) {
    this.socket.on('ready', () => callback());
  }

  playAgain() {
    this.socket.emit('play again', this.channel);
  }

  onPlayAgain(callback: Function) {
    this.socket.on('play again', () => callback());
  }

  onLeaveChannel(callback: Function) {
    this.socket.on('leave channel', () => callback());
  }

  leaveChannel() {
    this.socket.emit('leave channel', this.channel);
  }
}

export default new SocketioService();
