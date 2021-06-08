import React, { useEffect, useRef, useState } from 'react';
import { SlideStories } from '../helper/slide';
import { useSelector } from 'react-redux';
import '../css/slide.css';
import { ReactComponent as PrevIcon } from '../assets/icons2/mdi_arrow-left-big.svg';
import { ReactComponent as NextIcon } from '../assets/icons2/mdi_arrow-right-big.svg';
import image0 from '../assets/images/posterWide.jpg';
import image1 from '../assets/images/posterWide1.jpg';
import image2 from '../assets/images/posterWide2.jpg';

const Slide = () => {
  //eslint-disable-next-line
  const { data, loading } = useSelector((state) => state.movies.movies);

  //eslint-disable-next-line
  const [items, setItems] = useState();

  const slideRef = useRef();
  const itemsRef = useRef();
  const nextButtonRef = useRef();
  const prevButtonRef = useRef();
  const thumbRef = useRef();

  useEffect(() => {
    // if (data) setItems(data.slice(0, 4));

    new SlideStories(
      '1',
      slideRef.current,
      itemsRef.current,
      nextButtonRef.current,
      prevButtonRef.current,
      thumbRef.current
    );
  }, []);

  return (
    <div ref={slideRef} className='App-slide'>
      <div className='App-slide--items' ref={itemsRef}>
        <img src={image0} alt='1' />
        <img src={image1} alt='2' />
        <img src={image2} alt='3' />
      </div>
      <div className='App-slide--nav'>
        <div className='App-slide--thumb' ref={thumbRef}></div>
        <button className='App-slide--button-prev' ref={prevButtonRef}>
          <PrevIcon />
        </button>
        <button className='App-slide--button-next' ref={nextButtonRef}>
          <NextIcon />
        </button>
      </div>
    </div>
  );
};

export default Slide;
