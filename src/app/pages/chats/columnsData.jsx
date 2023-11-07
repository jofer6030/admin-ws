import { Switch, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { MessageOutlined } from '@ant-design/icons';

import { getFormatDate } from '../../helpers/getFormateDate';
import { updateAssistantChat } from '../../services/api';

export const columnsChat = (setChat) => [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '50px',
    fixed: true,
  },
  {
    title: 'Nro de Celular',
    dataIndex: 'phone',
    render: (phone) => '+ ' + phone,
    width: '150px',
    fixed: true,
  },
  {
    title: 'Nombre Cliente',
    dataIndex: 'name',
    width: '150px',
  },
  {
    title: 'Asistente',
    dataIndex: 'status',
    render: (status) => {
      const color = status === 'bot' ? '#9258F2' : '#FFA62B';

      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
    width: '150px',
    align: 'center',
  },
  {
    title: 'Bot',
    dataIndex: 'status',
    render: (status, row) => {
      const changeStatus = async (checked) => {
        status = checked ? 'bot' : 'humans';
        await updateAssistantChat(row.id, status);
        setChat((prev) => prev.map((chat) => (chat.id === row.id ? { ...chat, status } : chat)));
      };
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Switch defaultChecked={status === 'bot'} onChange={changeStatus} />
          <span style={{ fontSize: '9px', textTransform: 'uppercase' }}>
            {status === 'bot' ? 'Desconectar' : 'Conectar'}
          </span>
        </div>
      );
    },
    width: '150px',
    align: 'center',
  },
  {
    title: 'Iniciado',
    dataIndex: 'dateCreation',
    render: (dateCreation) => {
      const [date, hours] = getFormatDate.dateAndHours(dateCreation);
      return (
        <>
          {date} {hours}
        </>
      );
    },
    width: '170px',
  },
  {
    title: 'Actualizado',
    dataIndex: 'dateUpdate',
    render: (dateUpdate) => {
      const [date, hours] = getFormatDate.dateAndHours(dateUpdate);
      return (
        <>
          {date} {hours}
        </>
      );
    },
    width: '170px',
  },
  {
    title: 'Último Mensaje',
    dataIndex: 'message',
    render: (message) => {
      const lastMessag = message.at(-1);
      return (
        <p
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <i>{lastMessag.role}</i>: {lastMessag.content}
        </p>
      );
    },
    className: 'chats-page__table-custom',
  },
  {
    title: 'Acciones',
    dataIndex: 'id',
    render: (id) => (
      <Link to={`${id}`}>
        Ir a Chat <MessageOutlined />
      </Link>
    ),
    width: '120px',
  },
];
