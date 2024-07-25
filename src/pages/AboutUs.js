import React from 'react';
import AboutImage from "./img/aboutImage.png"
import BannerAbout from "./img/bannerAbout.png"
import TournamentImage from "./img/tournamentImage.png"
import gallery from "./img/gallery.png"
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import aboutHeader from "./img/aboutHeader.png"

const AboutUs = () => {
  return (
    <div>
      <div className='relative'>
        <img className='h-[476px] w-full object-cover' src={aboutHeader} alt="" />
        <Header />
      </div>

      {/* title about */}
      <div className='flex items-center justify-center gap-[50px] pl-[100px] mt-[60px] pr-[40px]'>
        <div>
          <h3 className='text-[#DF6951] font-[Poppins] font-bold text-[18px]'>PROMOTION</h3>
          <h1 className='text-[#181E4B] leading-[60px] font-extrabold text-[50px] text-left mt-[2px] font-serif w-[639px]'>We Provide You Best Standard Courts</h1>
          <div className='text-[#000000] text-[16px] w-[583px] text-left mt-[20px]'>Are you a badminton enthusiast looking for the perfect place to play? Look no further! Our state-of-the-art badminton courts are now available at unbeatable promotional rates. Sign up for our membership program during the promotion and receive exclusive perks, including priority booking and free equipment rentals</div>
        </div>
        <div className='flex justify-center items-center'>
          <img className='w-[800px]' src={AboutImage} alt="" />
        </div>
      </div>
      {/* banner about */}
      <div className='mt-[132px]'>
        <img className='h-[400px] w-full object-cover' src={BannerAbout} alt="" />
      </div>
      {/* tournament description */}
      <div className='mt-[136px] flex items-center justify-center pl-[84px] pr-[100px] gap-[70px]'>
        <div>
          <img src={TournamentImage} alt="" />
        </div>
        <div>
          <h3 className='text-[#DF6951] font-[Poppins] font-bold text-[18px]'>TREND</h3>
          <h1 className='text-[#181E4B] leading-[60px] font-extrabold text-[50px] text-left mt-[2px] font-serif w-full'>Our Tournaments</h1>
          <div className='text-[#000000] text-[16px] w-[583px] text-left mt-[20px]'>You wanna have a competition with others members. Yes that is what we want. Each month we always have tournaments from culb owners that you can join with you duo or just only you. Let's make the competition more amzing and win the first prize!!!</div>
        </div>
      </div>
      {/* Gallery */}
      <div className='mt-[50px]'>
        <h3 className='text-[#DF6951] font-[Poppins] font-bold text-[18px] text-center'>EXPLORE MORE</h3>
        <h1 className='text-[#181E4B] leading-[60px] font-extrabold text-[50px] mt-[2px] text-center font-serif w-full'>Our Moment Gallery</h1>
        <div className='mt-[68px] px-[150px]'>
          <img src={gallery} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;