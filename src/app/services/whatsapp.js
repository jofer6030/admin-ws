import axios from 'axios';

const phoneId = import.meta.env.VITE_WS_PHONE_ID;
const token = import.meta.env.VITE_WS_TOKEN;

// const url = "https://graph.facebook.com/v17.0/158011757387515/messages"; //prod
const url = ``; // dev

const apiWhatsapp = axios.create({
  baseURL: `https://graph.facebook.com/v17.0/${phoneId}/messages`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export async function sendWhatsappMsg(info) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(url, info, options);

  return data;
}

export const sendWhatsappText = async (phone, msg) => {
  const options = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phone,
    type: 'text',
    text: {
      body: msg,
    },
  };

  const { data } = await apiWhatsapp.post('/', options);
  return data;
};
