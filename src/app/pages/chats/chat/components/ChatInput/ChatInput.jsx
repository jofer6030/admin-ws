import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import { SendOutlined, SmileOutlined } from '@ant-design/icons';
import { Input, Modal, Form, Button } from 'antd';
import EmojiPicker from 'emoji-picker-react';

import './ChatInput.css';

import { sendWhatsappText } from '../../../../../services/whatsapp';
import { createOrUpdate } from '../../../../../services/api';

const ChatInput = ({ setMessages, chat }) => {
  const { phone, name } = chat;
  const collapsedSideBar = useOutletContext();
  const [form] = Form.useForm();
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiClick = (_e, { emoji }) => {
    const value = form.getFieldValue('message') || '';
    form.setFieldValue('message', value + emoji);
  };

  const handleFinish = async (values) => {
    try {
      const dataWS = await sendWhatsappText(phone, values.message);
      const message = {
        role: 'assistant',
        content: values.message,
        timestamp: new Date().getTime(),
        status: '',
        id: dataWS.messages[0].id,
      };

      await createOrUpdate({ message, phone, name });

      setMessages((prev) => [...prev, message]);
      form.setFieldValue('message', '');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='chat-input__emoji'>
        <SmileOutlined
          onClick={() => setShowEmoji(!showEmoji)}
          className={`icon-emoji ${showEmoji ? 'active' : ''}`}
        />
        <Modal
          open={showEmoji}
          onCancel={() => setShowEmoji(false)}
          className='modal-emoji'
          styles={{
            mask: {
              backgroundColor: 'transparent',
            },
            content: {
              bottom: '75px',
              left: collapsedSideBar ? '130px' : '330px',
              maxWidth: '400px',
              position: 'absolute',
            },
          }}
          closeIcon={false}
          footer={null}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </Modal>
      </div>
      <Form
        form={form}
        style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}
        onFinish={handleFinish}
      >
        <Form.Item name='message' style={{ margin: 0, flex: 1 }}>
          <Input.TextArea />
        </Form.Item>
        <Button htmlType='submit' icon={<SendOutlined />} />
      </Form>
    </>
  );
};

ChatInput.propTypes = {
  setMessages: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
};

export default ChatInput;
