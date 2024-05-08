import {
  WSClientToServerEvent,
  WSServerToClientEvent,
} from './WSMessagePayload.js';
import {Socket} from 'socket.io-client';

export type ThundrSocket = Socket<WSClientToServerEvent, WSServerToClientEvent>;

export type ThundrSocketClient = Socket<
  WSServerToClientEvent,
  WSClientToServerEvent
>;

export type ThundrSocketData = {
  sub: string;
  lastTimestamp: number;
};
