import React from 'react';
import { Slide as SlideShow } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import posterWide from '../assets/images/posterWide.jpg';
import posterWide1 from '../assets/images/posterWide1.jpg';
import posterWide2 from '../assets/images/posterWide2.jpg';

const Slide = ({ data }) => {
  return (
    <div div className='flex wrap justify-center'>
      <div className='App-slide'>
        <SlideShow>
          <div className='each-slide'>
            <div
              style={{ backgroundImage: `url(${data[0].image || posterWide})` }}
            >
              <span>{data[0].name}</span>
            </div>
          </div>
          <div className='each-slide'>
            <div
              style={{
                backgroundImage: `url(${data[1].image || posterWide1})`,
              }}
            >
              <span>{data[1].name}</span>
            </div>
          </div>
          <div className='each-slide'>
            <div
              style={{
                backgroundImage: `url(${data[2].image || posterWide2})`,
              }}
            >
              <span>{data[2].name}</span>
            </div>
          </div>
        </SlideShow>
      </div>
      <div className='App-slide-side'>
        <img
          className='App-slide--img'
          src={data[0].image || posterWide}
          alt='Movie Database'
        />
        <img
          className='App-slide--img'
          src={data[1].image || posterWide1}
          alt='Movie Database'
        />
        <img
          className='App-slide--img'
          src={data[2].image || posterWide2}
          alt='Movie Database'
        />
      </div>
    </div>
  );
};
export default Slide;
