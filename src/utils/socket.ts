import io from 'socket.io-client';
import {API_BASE_URL} from '@env';
import {AuthDataResponse} from '../types/generated.ts';
import {ThundrSocketClient} from '../../thundr-shared/types/RealtimeService/ThundrSocket.ts'; // Adjust if needed

let socket: ThundrSocketClient | null = null;

const connectSocket = (authData: AuthDataResponse) => {
  if (socket && socket.connected) {
    return;
  }

  socket = io('wss://dev-api.thundr.ph/', {
    query: {sub: authData.sub},
    extraHeaders: {
      Authorization: `Bearer ${authData.accessToken}`,
    },
    path: '/realtime/ws/socket.io',
  });

  if (!socket.connected) {
    socket.connect();
  }

  socket.on('connect', () => {
    console.log('now connected');
  });
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket.close();
    socket = null;
  }
};

export {connectSocket, disconnectSocket, socket};
