import React from 'react';

const Input = ({ label, type, id, refs, ...props }) => {
  return (
    <>
      <label htmlFor={id} className='form-label'>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <input
        type={type}
        className='form-control'
        id={id}
        aria-describedby={id}
        ref={refs}
        {...props}
      />
    </>
  );
};

export default Input;
