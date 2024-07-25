import React, { useEffect } from "react";
import { fetchAllClubs } from '../../services/ClubApi';
import LocationIcon from './img/location_icon.png'
import OwnerIcon from "./img/owner_icon.png"

const ClubItem = (props) => {


  return (
    <div className='h-[460px] w-[380px] bg-[#FAF7F3] rounded-[30px]'>
      <div className='flex justify-center pt-[15px] '>
        <img className='h-[241px] w-[350px] object-cover rounded-[15px]' src={props.imageLink} alt='' />
      </div>
      <h1 className='font-serif font-bold text-[23px] mt-[13px] pl-[15px]'>{props.name}</h1>
      <div className='flex items-center gap-[5px] pl-[15px] mt-[10px]'>
        <img src={LocationIcon} alt="" />
        <p>{props.address}</p>
      </div>
      <div className='flex items-center justify-between px-[15px] mt-[30px]'>
        <div>
          <p className='font-[poppins] text-[22px] font-bold'><span className='font-extrabold font-[comfortaa]'>đ</span> {props.pricerPerHour} <span className='text-[#818181] font-normal text-[14px]'>/hour</span> </p>
        </div>
        <div className='flex items-center justify-center gap-[3px] bg-[#E3F6EC] px-[13px] py-[5px]  rounded-[50px]'>
          <img className='h-[28px] w-[28px]' src={OwnerIcon} alt="" />
          <p className='text-[#309555] '>{props.ownerName}</p>
        </div>
      </div>
      <button onClick={props.onAddToWishlist} className='mt-[10px] p-[5px] bg-green-500 text-white rounded'>
        Add to Wishlist
      </button>
    </div>
  );
};

export default ClubItem;