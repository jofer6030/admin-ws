import { createBrowserRouter, Navigate } from 'react-router-dom';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

import SidebarLayout from '../layouts/sidebar/SidebarLayout';

import LoginPage from '../pages/login/LoginPage';
import ChatsPage from '../pages/chats/ChatsPage';
import ChatPage from '../pages/chats/chat/ChatPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <PublicRoutes />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: '*', element: <Navigate to='/login' /> },
    ],
  },
  {
    path: '/admin',
    element: <PrivateRoutes />,
    children: [
      {
        path: '',
        element: <SidebarLayout />,
        children: [
          { path: 'chats', element: <ChatsPage /> },
          { path: 'chats/:idChat', element: <ChatPage /> },
          { path: '', element: <Navigate to='chats' /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/login' />,
  },
]);
