import React from 'react';
import Navbar from './Navbar';
import Movie from './Movie';
import TV from './TV';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/api';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Init from './Init';
import Add from './Add';
import MoviePage from './MoviePage';
import TvPage from './TvPage';
import Footer from './Footer';
import GenrePage from './GenrePage';
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
          <Route exact path='/tv' component={TV} />
          <Route exact path='/tv/:id' component={TvPage} />
          <Route exact path='/genre/:term' component={GenrePage} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default Home;
