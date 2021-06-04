import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../lib/api';
import Input from './Input';
import { dateConvert } from '../helper';
import Message from './Message';

const Profile = () => {
  const watchlistRef = useRef();
  const [profile, setProfile] = useState(null);
  const [watchlist, setWatchlist] = useState(null);
  const [message, setMessage] = useState(null);

  const { data } = useSelector((state) => state.user.login);

  const handleCreateWL = async () => {
    const name = watchlistRef.current.value;

    if (name.length === 0) {
      setMessage('Invalid name.');
      return;
    }

    if (data) {
      const { error: watchlistError } = await supabase
        .from('watchlist')
        .insert({ name, user_id: profile.user_id });
      if (watchlistError) console.log(watchlistError);
      else setMessage('Watchlist successfully created.');
    }
  };

  const deleteWatchlist = async (id) => {
    const { error: deleteError } = await supabase
      .from('watchlist')
      .delete()
      .eq('id', id);
    if (deleteError) console.log(deleteError);
    else setMessage('Watchlist successfully deleted.');
  };

  const loadWatchlist = async (id, name) => {
    watchlistRef.current.value = name;
  };

  const editWatchlist = async (id) => {
    const name = watchlistRef.current.value;

    if (name.length === 0) {
      setMessage('Invalid name.');
      return;
    }

    const { error: editError } = await supabase
      .from('watchlist')
      .update({ name, updated_at: new Date() })
      .eq('id', id);
    if (editError) console.log(editError);
  };

  const selectWatchlist = () => {
    console.log(1);
  };

  useEffect(() => {
    (async function () {
      if (data) {
        const { data: profile, error: profileError } = await supabase
          .from('profile')
          .select('*')
          .eq('user_id', data.id)
          .single();
        if (profileError) console.log(profileError);
        else {
          setProfile(profile);
        }
      }
    })();

    (async function () {
      if (data) {
        let { data: watchlist, error } = await supabase
          .from('watchlist')
          .select('*')
          .eq('user_id', data.id)
          .order('updated_at', { ascending: false });
        if (error) console.log(error);
        setWatchlist(watchlist);
      }
    })();
  }, [data]);

  return (
    <div>
      <div className='App-profile--user'>
        <h2>Profile</h2>
        <div className='p-4'>
          <div>{data?.id}</div>
          <div>
            <h4>{profile?.name || 'Anonymous_'}</h4>
            <small>
              {data?.email} - Registration day {dateConvert(data?.created_at)}
            </small>
          </div>
        </div>
      </div>
      <div className='App-watchlist p-4'>
        <h3 className='before'>Watchlist</h3>
        <div className='row g-3 mt-2'>
          <div className='mb-3 col-md-8'>
            <Input
              label='Watchlist Name'
              type='text'
              id='watchlist-name'
              refs={watchlistRef}
            />
          </div>
          <div className='mb-3 col-md-4 flex flex-align-end'>
            <button className='btn btn-primary mt-1' onClick={handleCreateWL}>
              Add New Watchlist
            </button>
          </div>
        </div>
        {!!message && <Message data={message} type='alert-success' />}

        <br />
        <h3 className='before'>Lists</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {watchlist &&
              watchlist.map((w) => (
                <tr key={w.id}>
                  <td>
                    <button
                      className='btn btn-secondary'
                      onClick={() => selectWatchlist(w.id)}
                    >
                      {w.name}
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn-icon btn-error'
                      onClick={() => deleteWatchlist(w.id)}
                    >
                      delete
                    </button>
                    <button
                      className='btn-icon btn-info'
                      onClick={() => editWatchlist(w.id)}
                    >
                      save
                    </button>
                    <button
                      className='btn-icon btn-secondary'
                      onClick={() => loadWatchlist(w.id, w.name)}
                    >
                      edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className='App-watchlist-list'>
          {watchlist && watchlist.items_id ? (
            watchlist.items_id.map((i) => (
              <div key={i.id}>
                <p>{i.id}</p>
              </div>
            ))
          ) : (
            <Message data='Items not found.' type='alert-info' />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
