import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Table, Input } from 'antd';

import './ChatsPage.css';

import { getChats } from '../../services/api';

import { columnsChat } from './columnsData';
import { useSocketContext } from '../../hooks/useSocketContext';

const { Search } = Input;

const TITLE_PAG = 'Admin Whatsapp Seller';

const ChatsPage = () => {
  const [chats, setChats] = useState([]);
  const [offest, setOffset] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const [title, setTitle] = useState(TITLE_PAG);

  const { socket } = useSocketContext();

  const handleSearch = (value) => {
    console.log(value);
  };

  const fetchData = async () => {
    try {
      const response = await getChats(offest, limit);
      toast.success(response.message, { position: 'bottom-right' });
      setChats(response.data.chats);
      setTotal(response.data.totalResult);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offest, limit]);

  useEffect(() => {
    let interval;
    let seconds = 0;

    socket.on('new-chat', (chat) => {
      setChats((prev) => [chat, ...prev]);

      toast.info('!Nuevo Chat!', { position: 'top-right' });

      interval = setInterval(() => {
        if (seconds < 5) {
          setTitle((prevTitle) => (prevTitle === TITLE_PAG ? '(🔔) Nuevo Chat!!' : TITLE_PAG));
          seconds++;
        } else {
          setTitle(TITLE_PAG);
          seconds = 0;
          clearInterval(interval);
        }
      }, 1000);
    });

    return () => {
      clearInterval(interval);
      socket.off('new-chat');
    };
  }, [chats]);

  useEffect(() => {
    socket.on('last-message', (chat) => {
      const chatFilter = chats.filter((c) => c.id !== chat.id);
      setChats([chat, ...chatFilter]);
    });
    return () => {
      socket.off('last-message');
    };
  }, [chats]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div style={{ padding: '20px 4rem', backgroundColor: 'white', height: '100%' }}>
      <Search
        placeholder='Buscar...'
        enterButton
        onSearch={handleSearch}
        style={{
          marginBottom: '20px',
        }}
        allowClear
      />
      <Table
        dataSource={chats}
        loading={chats.length === 0}
        columns={columnsChat(setChats)}
        rowKey={(record) => record.id}
        bordered
        scroll={{ x: 'max-content', y: 'calc(100vh - 250px)' }}
        pagination={{
          onChange: (page) => setOffset(page),
          total,
          showSizeChanger: true,
          onShowSizeChange: (_, size) => setLimit(size),
        }}
        onChange={(a, b, c, d, e) => {
          console.log(e);
        }}
        size='small'
      />
    </div>
  );
};

export default ChatsPage;
