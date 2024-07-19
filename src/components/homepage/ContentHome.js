import React from 'react';
import DesImage from './img/DesImage.png'
import Banner from "./img/Banner.png"
import BannerIcon from "./img/BannerIcon.png"

const ContentHome = () => {
  return (
    <div>
      {/* Description */}
      <div className='flex items-center justify-center gap-[146px]'>
        <div className='flex justify-center'>
          <img className='w-[700px]' src={DesImage} alt="" />
        </div>
        <div>
          <h3 className='text-[#DF6951] font-[Poppins] font-bold text-[18px]'>BADMINZONE SPECIALS</h3>
          <h1 className='text-[#181E4B] leading-[60px] font-extrabold text-[50px] text-left mt-[2px]'>Our Special Standard Yards</h1>
          <div className='text-[#000000] text-[16px] w-[583px] text-left mt-[20px]'>You wanna play in a good yards...?Yeah exactly we have all you needs. Just come to Badminzone and enjoy everything. Spend your time playing with a good mood and best feelings in BADMINZONE</div>
        </div>
      </div>

      {/* Banner */}
      <div className='relative mt-[200px]'>
        <img className='opacity-95' src={Banner} alt="" />
        <div className='absolute top-[10px] left-[400px] text-[white] font-serif font-bold text-[50px] w-[519px]'>
          Let’s make your
          next Match amazing
          <img src={BannerIcon} alt="" />
        </div>
      </div>
      {/* Promotion */}
      <div>
        <div>
          <h3>PROMOTION</h3>
          <h1>We Provide You Best Badminton Yards Options</h1>
          <div>Are you a badminton enthusiast looking for the perfect place to play? Look no further! Our state-of-the-art badminton courts are now available at unbeatable promotional rates. Sign up for our membership program during the promotion and receive exclusive perks, including priority booking and free equipment rentals.</div>
          <button className='bg-[#DF6951] px-[32px] py-[16px] text-white rounded-[10px] hover:scale-110 transition-all ease-out'>View options</button>
        </div>
      </div>

    </div>
  );
};

export default ContentHome;