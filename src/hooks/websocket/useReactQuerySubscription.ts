// import * as React from 'react';
// import {useQueryClient} from '@tanstack/react-query';
// import io, {Socket} from 'socket.io-client';
// import {API_WS_URL} from '@env';
// import {queryClient} from '../../utils/queryClient.ts';
// import {ThundrSocketClient} from '../../../thundr-shared/types/RealtimeService/ThundrSocket.ts';
// import {WSStatus} from '../../../thundr-shared/types/enum/WSStatus.ts';
// import {AuthDataResponse} from '../../types/generated.ts';
//
// export const useReactQuerySubscription = (
//   auth: AuthDataResponse | undefined,
// ) => {
//   // const query = useQueryClient(queryClient);
//   const [socket, setSocket] = React.useState<ThundrSocketClient | null>(null);
//
//   React.useEffect(() => {
//     if (auth) {
//       // Only connect if authData is present
//       const newSocket: ThundrSocketClient = io(API_WS_URL, {
//         query: {sub: auth.sub},
//         extraHeaders: {
//           Authorization: `Bearer ${auth.accessToken}`,
//         },
//       });
//
//       setSocket(newSocket);
//
//       newSocket.on('connect', () => {
//         console.log('connected');
//       });
//
//       return () => {
//         newSocket.close();
//       };
//     }
//   }, [auth]); // Include auth in dependency array
//
//   const send = (authData: AuthDataResponse) => {
//     socket?.emit(
//       'KEEPALIVE',
//       {
//         msgType: 'KEEPALIVE',
//         data: {
//           sub: authData.sub,
//           bearer: `Bearer ${authData.accessToken}`,
//           timestamp: Date.now(),
//         },
//         wsStatus: WSStatus.GENERIC_SUCCESS,
//       },
//       data => {
//         console.log(JSON.stringify(data, 0, 2));
//         console.log('test');
//       },
//     );
//   };
//
//   return send;
// };
