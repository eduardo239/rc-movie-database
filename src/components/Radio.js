import React from 'react';

const Radio = ({ type, id, refs, name, value, ...props }) => {
  return (
    <>
      <label className='form-check-label' htmlFor={id}>
        <input
          className='form-check-input'
          type={type}
          name={name}
          id={id}
          value={name}
          ref={refs}
          {...props}
        />
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </label>
    </>
  );
};

export default Radio;
