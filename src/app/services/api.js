import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://botsellar.svc.2cloud.pe',
});

export const loginAdmin = async (user) => {
  const { data } = await api.post('/auth/login', {
    email: user.email,
    password: user.password,
  });
  return data;
};

export const checkAuthAdmin = async (token) => {
  const { data } = await api.get('/auth/check', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getChats = async (offset = 1, limit = 10) => {
  const { data } = await api.get(`/chat/list?offset=${offset}&limit=${limit}`);
  return data;
};

export const getChat = async (idChat) => {
  const { data } = await api.get(`/chat/list/${idChat}`);
  return data;
};

export const createOrUpdate = async (chat) => {
  const { data } = await api.post('/chat/validation', chat);
  return data;
};

export const updateAssistantChat = async (idChat, status) => {
  const { data } = await api.post(`/chat/update/status/${idChat}`, {
    status,
  });
  return data;
};
