import { createContext } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'https://botsellar.svc.2cloud.pe'; // dev
// const ENDPOINT = 'https://qx4l1062-3000.brs.devtunnels.ms'; // dev

const socket = socketIOClient(ENDPOINT, {
  transports: ['websocket'],
  reconnection: true,
});

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
