import { useContext } from 'react';

import { SocketContext } from '../context/sockets/socketProvider';

export const useSocketContext = () => {
  const socketContext = useContext(SocketContext);
  return socketContext;
};
