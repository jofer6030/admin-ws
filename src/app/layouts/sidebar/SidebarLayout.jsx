import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Col, Dropdown, Layout, Menu, Row, Typography } from 'antd';
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  LeftOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';

import './SidebarLayout.css';

import LOGO from '../../../assets/ws-logo.png';

import { menu } from './menuData';

import { useAuthContext } from '../../hooks/useAuthContext';
// import { useSocketContext } from '../../hooks/useSocketContext';

const { Sider, Content, Footer, Header } = Layout;

const title = {
  '/admin/chats': 'Lista de Chats',
};

const SidebarLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  // const { socket } = useSocketContext();

  const location = useLocation();

  // const onClick = ({ key }) => {
  //   console.log(key);
  //   socket.emit('logout');
  // };

  // useEffect(() => {
  //   socket.on('saludo', () => {
  //     console.log('Hola');
  //   });

  //   return () => {
  //     socket.off('saludo');
  //   };
  // }, []);

  return (
    <Layout className='sidebar-layout'>
      <Sider
        trigger={collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
        collapsible
        breakpoint='lg'
        collapsedWidth='100'
        onCollapse={(value) => setCollapsed(value)}
        width={300}
        style={{
          backgroundColor: '#F0F2F5',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        className='sidebar-layout__sider'
      >
        <div
          className={
            collapsed
              ? 'sidebar-layout__logo sidebar-layout__logo-collapsed'
              : 'sidebar-layout__logo'
          }
        >
          <WhatsAppOutlined style={{ fontSize: '40px' }} />
          <h1 className='logo__title'>
            WhatsApp<span>Admin</span>
          </h1>
        </div>
        <Menu
          mode='inline'
          defaultSelectedKeys={'1'}
          items={menu}
          motion={false}
          className='sidebar-layout__menu'
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? '100px' : '300px',
          transition: 'all 0.2s,background 0s',
          height: '100vh',
        }}
      >
        <Header
          style={{
            padding: '0px 4rem',
            lineHeight: '0',
            backgroundColor: '#008069',
            boxShadow: '0px 0px 5px #acacac',
            height: '40px',
          }}
        >
          <Row justify='space-between' align='middle' style={{ height: '100%' }}>
            <Col>
              <Typography.Title
                level={5}
                style={{ margin: '0', color: '#fff', fontWeight: 'normal' }}
              >
                {title[location.pathname] || (
                  <div className='sidebar-layout__header-title' onClick={() => navigate(-1)}>
                    <LeftOutlined /> Atrás
                  </div>
                )}
              </Typography.Title>
            </Col>
            <Col>
              <Dropdown
                menu={{
                  items: [{ label: 'Cerrar Sesión', key: 'logout' }],
                  // onClick,
                }}
                trigger={['click']}
                placement='bottomRight'
                arrow={{ pointAtCenter: true }}
              >
                <UserOutlined className='sidebar-layout__header-user' />
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content className='sidebar-layout__content' style={{ padding: '0' }}>
          <Outlet context={collapsed} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
