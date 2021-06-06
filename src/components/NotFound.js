import React from 'react';
import Message from './Message';

const NotFound = () => {
  return (
    <div>
      <Message data='Page not found.' type='alert-info' />
    </div>
  );
};

export default NotFound;
