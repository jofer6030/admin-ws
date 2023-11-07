import { Layout, Form, Input, Button, Typography } from 'antd';

import './LoginPage.css';

import { useAuthContext } from '../../hooks/useAuthContext';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const { Content } = Layout;

const LoginPage = () => {
  const { login } = useAuthContext();

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      await login(email, password);
    } catch (error) {
      if (isAxiosError(error)) {
        return toast.error(error.response.data.msg);
      }
      toast.error('Error al iniciar sesión');
      console.log(error);
    }
  };

  return (
    <Layout className='login-page'>
      <Content className='login-page__content'>
        <Form
          initialValues={{
            email: '',
            password: '',
          }}
          onFinish={onFinish}
          autoComplete='off'
          layout='vertical'
          className='login-page__form'
          requiredMark={false}
        >
          <Typography.Title
            level={2}
            className='login-page__form--title'
            style={{ marginBottom: '2rem' }}
          >
            Ingresar
          </Typography.Title>
          <Form.Item
            label='Ingrese su correo:'
            name='email'
            hasFeedback
            rules={[
              { required: true, message: 'El correo es requerido' },
              { type: 'email', message: 'El correo debe ser válido' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Ingrese su Password:'
            name='password'
            hasFeedback
            rules={[{ required: true, message: 'El password es requerido' }]}
          >
            <Input.Password />
          </Form.Item>

          <Button htmlType='submit' block type='primary'>
            Enviar
          </Button>
        </Form>
      </Content>
    </Layout>
  );
};

export default LoginPage;
