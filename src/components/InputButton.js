import React from 'react';

const InputButton = ({ label, type, id, refs, fn, button, ...props }) => {
  return (
    <div className='field-button'>
      <div className='flex-1'>
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
      </div>
      <div>
        <button
          className='btn-inline btn-secondary field-button--button'
          onClick={fn}
        >
          {`${!!button.length ? button : 'Click Here'}`}
        </button>
      </div>
    </div>
  );
};

export default InputButton;
