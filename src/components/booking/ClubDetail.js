import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchClubById } from '../../services/ClubApi';
import Login from '../../pages/Login';
import ClubComment from '../comment/CommentSection';
import BookingDialogButton from "./BookingDialogButton";
import locationIcon from "./img/location_icon.png"
import detailHeader from "./img/detailHeader.png"

const ClubDetail = () => {
  const accessToken = localStorage.getItem('token');
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);

  useEffect(() => {
    const getClubDetail = async () => {
      let res = await fetchClubById(id);
      if (res) {
        setClub(res);
      }
    };
    getClubDetail();
  }, [id]);

  if (!club) return <div>Loading...</div>;

  return (
    <div>
      <div className='relative'>
        <img className='h-[476px] w-full object-cover' src={detailHeader} alt="" />
        <Header />
      </div>
      {accessToken ?
        (<div className='mt-[40px]'>
          {/* <div className="mb-[190px]">
            <Header />
          </div> */}
          <h1 className='text-[40px] ml-[100px] text-[#191919] font-[Nunito] font-extrabold'>{club.name}</h1>
          <p className='mb-[20px] ml-[100px] font-[Montserrat] text-[#888888] font-semibold '>Number of Courts: {club.numberOfCourts}</p>
          <div className='z-50 flex justify-center gap-[80px]'>
            <div>
              <img className='w-[680px] h-[515px] object-cover' src={club.imageLink} alt={`${club.name}`} />
            </div>
            <div className='border border-[#d1d1d1] px-[10px] h-[220px]'>
              <div className='text-[#747474] font-[Montserrat] mt-[10px] mb-[10px] text-[14px] font-semibold'>OWNER</div>
              <p className='text-[24px] font-[Montserrat] mb-[5px] font-bold'>{club.owner.fullName}</p>
              <div className='flex items-center justify-start gap-[10px]'>
                <img src={locationIcon} alt="" />
                <p className='text-[#8b8b8b] font-[Montserrat] text-[17px]'>{club.address}</p>
              </div>
              <div className='flex items-center justify-between mt-[30px]'>
                <button className='bg-[#e9d85b]  px-[20px] py-[8px] rounded-[30px]'>
                  <p className='text-[#3A3404] font-black font-[Lora] text-[30px]'>{(club.pricerPerHour).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} <span className='text-[24px] font-normal'>/hour</span> </p>
                </button>
                <div className="flex">
                  <BookingDialogButton id={id} pricerPerHour={club.pricerPerHour} />
                </div>
              </div>


            </div>

            {/* <button
              className="cursor-pointer"
              onClick={() => navigate("/reservation")}
            >
              Back
            </button> */}
          </div>

        </div>) : (<Login />)}
      <div className='ml-[90px] mt-[40px]'>
        <ClubComment clubId={id} />
      </div>
    </div>
  );
};

export default ClubDetail;
