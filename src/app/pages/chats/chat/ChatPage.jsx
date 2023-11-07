import { useEffect, useRef, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import './ChatPage.css';
import IconUser from '../../../../assets/icon-user.png';

import { getChat, updateAssistantChat } from '../../../services/api';
import CardMessage from './components/CardMessage/CardMessage';
import ChatInput from './components/ChatInput/ChatInput';
import { useSocketContext } from '../../../hooks/useSocketContext';
import { Switch } from 'antd';

const ChatPage = () => {
  const { idChat } = useParams();
  const { socket } = useSocketContext();
  const collapsedSideBar = useOutletContext();

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const onChange = async (checked) => {
    const status = checked ? 'bot' : 'humans';
    await updateAssistantChat(idChat, status);
    setChat({ ...chat, status });
  };

  const fetchData = async () => {
    try {
      const data = await getChat(idChat);
      const { message, ...rest } = data.chats[0];
      setChat(rest);
      setMessages(message);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    socket.on('status-message', ({ id, status }) => {
      const newMessages = messages.map((message) => {
        if (message.id === id) message.status = status;
        return message;
      });

      setMessages(newMessages);
    });

    socket.on('new-message-front', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('status-message');
      socket.off('new-message-front');
    };
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className='chat-page'>
      <div
        className={
          collapsedSideBar ? 'chat-page__info chat-page__info-collapsed' : 'chat-page__info'
        }
      >
        {chat && (
          <>
            <div className='info__avatar'>
              <img src={IconUser} alt='' />
            </div>
            <span className='info__name'>{chat.name || `+ ${chat.phone}`}</span>
            <span style={{ flex: 1 }} />
            <div className='info__status'>
              {chat.status === 'bot' ? 'Desconectar' : 'Encender'} Bot
              <Switch defaultChecked={chat.status === 'bot'} onChange={onChange} />
            </div>
          </>
        )}
      </div>
      <div className='chat-page__messages'>
        {messages.map((message, i) => (
          <CardMessage key={i} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {chat && chat.status !== 'bot' && (
        <div className='chat-page__send'>
          <ChatInput setMessages={setMessages} chat={chat} setChat={setChat} />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
