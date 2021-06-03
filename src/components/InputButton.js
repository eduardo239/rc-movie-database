import React from 'react';

const InputButton = ({ label, type, id, refs, searchTvMaze, ...props }) => {
  return (
    <div className='field-input-button flex-align-end w-100'>
      <div className='w-100'>
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
        <button className='btn-inline btn-secondary' onClick={searchTvMaze}>
          api
        </button>
      </div>
    </div>
  );
};

export default InputButton;
