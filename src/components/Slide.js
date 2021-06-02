import React from 'react';
import { Slide as SlideShow } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import posterWide from '../assets/images/posterWide.jpg';
// import posterWide1 from '../assets/images/posterWide1.jpg';
// import posterWide2 from '../assets/images/posterWide2.jpg';

const Slide = ({ data }) => {
  console.log(data);
  return (
    <div div className='App-slide-container'>
      <div className='App-slide'>
        <SlideShow>
          <div className='each-slide'>
            <div
              style={{ backgroundImage: `url(${data[0].image || posterWide})` }}
            >
              <span>Slide 1</span>
            </div>
          </div>
          <div className='each-slide'>
            <div
              style={{ backgroundImage: `url(${data[1].image || posterWide})` }}
            >
              <span>Slide 2</span>
            </div>
          </div>
          <div className='each-slide'>
            <div
              style={{ backgroundImage: `url(${data[2].image || posterWide})` }}
            >
              <span>Slide 3</span>
            </div>
          </div>
        </SlideShow>
      </div>
      <div className='App-slide-side'>side</div>
    </div>
  );
};
export default Slide;
