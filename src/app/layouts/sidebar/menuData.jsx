import { Link } from 'react-router-dom';
import { HomeOutlined, WechatOutlined } from '@ant-design/icons';

export const menu = [
  {
    label: <Link to='chats'>CHATS</Link>,
    key: '1',
    icon: <WechatOutlined />,
  },
  { label: <Link to='other'>OTHER</Link>, key: '2', icon: <HomeOutlined /> },
];
