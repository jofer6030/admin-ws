import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { router } from './router/index.routes';

import { theme } from './config/theme/antdTheme';

import { useAuthContext } from './hooks/useAuthContext';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

function App() {
  const { isLoading, checkAuth, loginFailure } = useAuthContext();

  const check = async () => {
    try {
      await checkAuth();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response.data.msg);
      } else {
        toast.error('Error al iniciar sesión');
        console.log(error);
      }
      loginFailure();
    }
  };

  useEffect(() => {
    check();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
