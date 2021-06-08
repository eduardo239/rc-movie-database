import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../lib/api';
import { dateConvert } from '../helper';
import { getWatchlist } from '../store/user';
import Message from './Message';
import InputButton from './InputButton';
import Loading from './Loading';
import { ReactComponent as EditIcon } from '../assets/icons2/mdi_file-edit-outline.svg';
import { ReactComponent as SaveIcon } from '../assets/icons2/mdi_content-save-outline.svg';
import { ReactComponent as DeleteIcon } from '../assets/icons2/mdi_delete-outline.svg';

const Profile = () => {
  const watchlistRef = useRef();
  // const [profile, setProfile] = useState(null);
  // eslint-disable-next-line
  const [watchlist, setWatchlist] = useState(null);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.user.login);
  const { data: watchlistData, loading: watchlistLoading } = useSelector(
    (state) => state.user.watchlist
  );

  const handleCreateWL = async () => {
    const name = watchlistRef.current.value;

    if (name.length === 0) {
      setMessage('Invalid name.');
      return;
    }

    let user_id = data.id;

    if (data) {
      // create watchlist
      const { data: watchlist, error: watchlistError } = await supabase
        .from('watchlist')
        .insert({ name });
      if (watchlistError) console.error(watchlistError);

      // select profile
      let { error: profileError } = await supabase
        .from('profile')
        .select('*')
        .eq('user_id', user_id);
      if (profileError) console.error(profileError);

      // append watchlist.id to profile.watchlist
      const { error: errorProfile2 } = await supabase
        .from('profile')
        .update({ watchlist: watchlist[0].id }, { upsert: true })
        .eq('user_id', user_id);
      if (errorProfile2) console.error(errorProfile2);

      // update
      await dispatch(getWatchlist(data.id));
    }
  };

  const deleteWatchlist = async (id) => {
    return;
  };

  const selectWatchlist = async (id) => {
    return;
  };

  const editWatchlist = async (id) => {
    return;
  };

  useEffect(() => {
    (async function () {
      if (data) {
        await dispatch(getWatchlist(data.id));
      }

      // let { data: movies, error } = await supabase
      //   .from('watchlist')
      //   .select('*')
      //   // .cs('array_column', ['array', 'contains'])
      //   .cs('items', watchlistData.watchlist.items);
      // // console.log(watchlistData.watchlist.items);

      // console.log(movies);
    })();

    // TODO: get user profile
  }, [data, dispatch]);

  return (
    <div>
      <div className='App-profile--user'>
        <h2>Profile</h2>
        <div className='p-4'>
          <div>{data?.id}</div>
          <div>
            <h4>{data?.email || 'Anonymous_'}</h4>
            <small>
              {data?.email} - Registration day {dateConvert(data?.created_at)}
            </small>
          </div>
        </div>
      </div>
      <div className='App-watchlist py-4'>
        {!!message && <Message data={message} type='alert-success' />}

        {watchlist === null && (
          <div className='row g-3'>
            <div className='mb-3 col-md-12'>
              <h3 className='before mb-2'>Watchlist</h3>
              <InputButton
                label='name'
                type='text'
                id='movie-name'
                refs={watchlistRef}
                fn={handleCreateWL}
                button='Create a new watchlist'
              />
            </div>
          </div>
        )}

        {watchlistLoading ? (
          <Loading />
        ) : (
          <div>
            {watchlistData && watchlistData.watchlist && (
              <div
                key={watchlistData.watchlist.id}
                className='flex flex-align-center'
              >
                <div className='flex-1 me-1'>
                  <button
                    className='btn-transparent'
                    onClick={() => selectWatchlist(watchlistData.watchlist.id)}
                  >
                    {watchlistData.watchlist.name}
                  </button>
                </div>

                <div>
                  <button
                    className='btn-icon btn-info me-1'
                    onClick={() => deleteWatchlist(watchlistData.watchlist.id)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className='btn-icon btn-success me-1'
                    onClick={() => editWatchlist(watchlistData.watchlist.id)}
                  >
                    <SaveIcon />
                  </button>
                  <button className='btn-icon btn-error me-1' onClick={() => 1}>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className='App-watchlist-list'>
          {watchlistData?.watchlist?.items ? (
            watchlistData.watchlist.items.map((k, i) => <p key={i}>{k}</p>)
          ) : (
            <Message data='Items not found.' type='alert-info' />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
