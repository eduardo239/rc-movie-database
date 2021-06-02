import React from 'react';

const TextArea = ({ label, id, refs, ...props }) => {
  return (
    <>
      <label htmlFor={id}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <textarea
        className='form-control'
        id={id}
        rows='3'
        ref={refs}
        {...props}
      ></textarea>
    </>
  );
};

export default TextArea;
