import ReactDOM from 'react-dom/client';
import App from './app/App';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { AuthProvider } from './app/context/auth/authProvider';
import { SocketProvider } from './app/context/sockets/socketProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SocketProvider>
      <App />
      <ToastContainer autoClose={1000} />
    </SocketProvider>
  </AuthProvider>,
);
