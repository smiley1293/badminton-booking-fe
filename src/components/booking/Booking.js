import React, { useEffect, useState } from 'react';
import { fetchAllClubs } from '../../services/ClubApi';
import ClubItem from './ClubItem';
import LocationIcon from './img/location_icon.png'
import OwnerIcon from "./img/owner_icon.png"

const Booking = (props) => {
  const [listClubs, setListClubs] = useState([]);

  useEffect(() => {
    getClubs();
  }, [])

  const getClubs = async () => {
    let res = await fetchAllClubs();
    if (res) {
      setListClubs(res)
    }
    console.log("check res: ", res);
    console.log(listClubs);
  }

  return (
    <div className=''>
      {listClubs && listClubs.length > 0 &&
        listClubs.map((item, index) => {
          return (
            <div className='h-[460px] w-[380px] bg-[#FAF7F3] rounded-[30px]' key={`clubs-${index}`}>
              <div className='flex justify-center pt-[15px] '>
                <img className='h-[241px] w-[350px] object-cover rounded-[15px]' src={item.imageLink} alt='' />
              </div>
              <h1 className='font-serif font-bold text-[23px] mt-[13px] pl-[15px]'>{item.name}</h1>
              <div className='flex items-center gap-[5px] pl-[15px] mt-[10px]'>
                <img src={LocationIcon} alt="" />
                <p>{item.address}</p>
              </div>
              <div className='flex items-center justify-between px-[15px] mt-[30px]'>
                <div>
                  <p className='font-[poppins] text-[22px] font-bold'><span className='font-extrabold font-[comfortaa]'>đ</span> {item.pricerPerHour} <span className='text-[#818181] font-normal text-[14px]'>/hour</span> </p>
                </div>
                <div className='flex items-center justify-center gap-[3px] bg-[#E3F6EC] px-[13px] py-[5px]  rounded-[50px]'>
                  <img className='h-[28px] w-[28px]' src={OwnerIcon} alt="" />
                  <p className='text-[#309555] '>{item.owner.fullName}</p>
                </div>
              </div>
            </div>
          )
        })
      }

    </div>
  );
};

export default Booking;