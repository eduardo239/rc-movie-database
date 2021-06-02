import React from 'react';
import errorIcon from '../assets/icons2/mdi_alert-circle-outline.svg';
import errorInfo from '../assets/icons2/mdi_information-outline.svg';
import errorWarning from '../assets/icons2/mdi_alert-outline.svg';
import errorSuccess from '../assets/icons2/mdi_check-circle-outline.svg';

const Message = ({ data, type }) => {
  return (
    <div className='my-3'>
      <div className={`alert ${type}`}>
        <img
          src={
            type === 'alert-error'
              ? errorIcon
              : type === 'alert-info'
              ? errorInfo
              : type === 'alert-warning'
              ? errorWarning
              : type === 'alert-success'
              ? errorSuccess
              : ''
          }
          alt='Message'
        />

        {data}
      </div>
    </div>
  );
};

export default Message;
