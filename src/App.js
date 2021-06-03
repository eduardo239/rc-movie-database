import { useState, useEffect } from 'react';
import { supabase } from './lib/api';
import Auth from './components/Auth';
import Home from './components/Home';
import { useDispatch } from 'react-redux';
import { userLogin } from './store/user';

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    dispatch(userLogin(session?.user));

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        // dispatch(userLogin(currentUser));
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [user, dispatch]);

  return <div>{!user ? <Auth /> : <Home user={user} />}</div>;
}

export default App;
