import React from 'react';
import Navbar from './Navbar';
import Movie from './Movie';
// import TV from './TV';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/api';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Init from './Init';
import Add from './Add';
import MoviePage from './MoviePage';
import Footer from './Footer';
import GenrePage from './GenrePage';
import Profile from './Profile';
import NotFound from './NotFound';
// import RecoverPassword from "./RecoverPassword";

const Home = () => {
  //eslint-disable-next-line
  const [recoveryToken, setRecoveryToken] = useState(null);

  useEffect(() => {}, []);

  //eslint-disable-next-line
  const handleLogout = async () => {
    supabase.auth.signOut().catch(console.error);
  };

  return (
    <>
      <div className='container'>
        <Navbar />

        <Switch>
          <PrivateRoute exact path='/' component={Init} />
          <PrivateRoute exact path='/add' component={Add} />
          <Route exact path='/movies' component={Movie} />
          <Route exact path='/movies/:id' component={MoviePage} />
          <Route exact path='/genre/:term' component={GenrePage} />
          <Route exact path='/profile/:id' component={Profile} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default Home;
