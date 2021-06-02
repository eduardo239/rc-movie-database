import { useRef, useState } from 'react';
import { supabase } from '../lib/api';
import Logo from './Logo';
import Message from './Message';

const Auth = () => {
  const [helperText, setHelperText] = useState({
    error: null,
    text: null,
    type: null,
  });
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (type) => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // eslint-disable-next-line
    const { user, error } =
      type === 'LOGIN'
        ? await supabase.auth.signIn({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      setHelperText({
        error: true,
        text: error.message,
        type: 'alert-error',
      });
    } else if (!error) {
      setHelperText({
        error: false,
        text: 'An email has been sent to you for verification!',
        type: 'alert-info',
      });
    }
  };

  const handleOAuthLogin = async (provider) => {
    // You need to enable the third party auth you want in Authentication > Settings
    // Read more on: https://supabase.io/docs/guides/auth#third-party-logins
    let { error } = await supabase.auth.signIn({ provider });
    if (error) console.log('Error: ', error.message);
  };

  // eslint-disable-next-line
  const forgotPassword = async (e) => {
    // Read more on https://supabase.io/docs/reference/javascript/reset-password-email#notes
    e.preventDefault();
    const email = prompt('Please enter your email:');

    if (email === null || email === '') {
      setHelperText({ error: true, text: 'You must enter your email.' });
    } else {
      let { error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) {
        console.error('Error: ', error.message);
      } else {
        setHelperText({
          error: false,
          text: 'Password recovery email has been sent.',
        });
      }
    }
  };

  return (
    <div className='container'>
      <div className='row justify-content-md-center my-3'>
        <Logo />
        <div className='col-md-6 col-12 my-5'>
          <h2>Login</h2>
          <div className='field'>
            <label htmlFor={'email'}>
              <span>*</span>Email:
            </label>
            <input type={'email'} name={'email'} ref={emailRef} required />
          </div>
          {/*  */}
          <div className='field'>
            <label htmlFor={'password'}>
              <span>*</span>
              Password:
            </label>
            <input
              type={'password'}
              name={'password'}
              ref={passwordRef}
              required
            />
          </div>
          {/*  */}
          <div className='flex'>
            <button
              className='btn btn-secondary flex-1'
              type='submit'
              onClick={() => handleLogin('REGISTER').catch(console.error)}
            >
              Sign Up
            </button>

            <button
              className='btn btn-primary flex-1'
              onClick={() => handleLogin('LOGIN')}
              type='button'
            >
              Sign In
            </button>
          </div>
        </div>

        {/* <span onClick={forgotPassword}>Forgot Password?</span> */}
        {!!helperText.text && (
          <Message data={helperText.text} type={helperText.type} />
        )}

        <div>
          <div>
            <div>
              <div />
            </div>
            <div>
              <small>Or continue with</small>
            </div>
          </div>

          <div>
            <div>
              <button
                onClick={() => handleOAuthLogin('github')}
                type='button'
                className='btn-icon btn-primary'
              >
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M16.0001 2.66675C14.2491 2.66675 12.5153 3.01162 10.8976 3.68169C9.27996 4.35175 7.81011 5.33388 6.57199 6.57199C4.07151 9.07248 2.66675 12.4639 2.66675 16.0001C2.66675 21.8934 6.49341 26.8934 11.7867 28.6667C12.4534 28.7734 12.6667 28.3601 12.6667 28.0001V25.7467C8.97341 26.5467 8.18675 23.9601 8.18675 23.9601C7.57341 22.4134 6.70675 22.0001 6.70675 22.0001C5.49342 21.1734 6.80008 21.2001 6.80008 21.2001C8.13341 21.2934 8.84008 22.5734 8.84008 22.5734C10.0001 24.6001 11.9601 24.0001 12.7201 23.6801C12.8401 22.8134 13.1867 22.2267 13.5601 21.8934C10.6001 21.5601 7.49341 20.4134 7.49341 15.3334C7.49341 13.8534 8.00008 12.6667 8.86675 11.7201C8.73342 11.3867 8.26675 10.0001 9.00008 8.20008C9.00008 8.20008 10.1201 7.84008 12.6667 9.56008C13.7201 9.26675 14.8667 9.12008 16.0001 9.12008C17.1334 9.12008 18.2801 9.26675 19.3334 9.56008C21.8801 7.84008 23.0001 8.20008 23.0001 8.20008C23.7334 10.0001 23.2667 11.3867 23.1334 11.7201C24.0001 12.6667 24.5067 13.8534 24.5067 15.3334C24.5067 20.4267 21.3867 21.5467 18.4134 21.8801C18.8934 22.2934 19.3334 23.1067 19.3334 24.3467V28.0001C19.3334 28.3601 19.5467 28.7867 20.2267 28.6667C25.5201 26.8801 29.3334 21.8934 29.3334 16.0001C29.3334 14.2491 28.9885 12.5153 28.3185 10.8976C27.6484 9.27996 26.6663 7.81011 25.4282 6.57199C24.1901 5.33388 22.7202 4.35175 21.1025 3.68169C19.4849 3.01162 17.751 2.66675 16.0001 2.66675V2.66675Z'
                    fill='#F7F7F9'
                  />
                </svg>
              </button>

              <button
                onClick={() => handleOAuthLogin('google')}
                type='button'
                className='btn-icon btn-primary'
              >
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M28.4668 14.8001H16.2401V18.4401H24.9201C24.4801 23.5201 20.2535 25.6934 16.2535 25.6934C11.1468 25.6934 6.66679 21.6667 6.66679 16.0001C6.66679 10.5334 10.9335 6.30675 16.2668 6.30675C20.3868 6.30675 22.8001 8.93341 22.8001 8.93341L25.3335 6.29341C25.3335 6.29341 22.0801 2.66675 16.1335 2.66675C8.56012 2.66675 2.70679 9.06675 2.70679 16.0001C2.70679 22.7334 8.21345 29.3334 16.3335 29.3334C23.4668 29.3334 28.6668 24.4401 28.6668 17.2134C28.6668 15.6801 28.4668 14.8001 28.4668 14.8001Z'
                    fill='#F7F7F9'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
