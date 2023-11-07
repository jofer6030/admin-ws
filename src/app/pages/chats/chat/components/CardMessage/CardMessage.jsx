import PropTypes from 'prop-types';
import xss from 'xss';
import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';

import './CardMessage.css';
import { formatText } from '../../../../../helpers/formatText';
import { getFormatDate } from '../../../../../helpers/getFormateDate';

const CardMessage = ({ message }) => {
  message.timestamp = message.timestamp.toString();

  return (
    <div className='card-message'>
      <div className={`card-message__body card-message__body-${message.role}`}>
        <p
          dangerouslySetInnerHTML={{
            __html: xss(formatText.fromWhatsApp(message.content)),
          }}
        ></p>
        <div className='card-message__body__info'>
          <span className='card-message__body__time'>
            {getFormatDate.formatTimestampToTime(message.timestamp)}
          </span>
          {message.role === 'assistant' && (
            <span
              className={`card-message__body__check card-message__body__check-${message.status}`}
            >
              {message.status === '' ? (
                <ClockCircleOutlined />
              ) : (
                <>
                  <CheckOutlined />
                  {['read', 'delivered'].includes(message.status) && <CheckOutlined />}
                </>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

CardMessage.propTypes = {
  message: PropTypes.object,
};

export default CardMessage;
