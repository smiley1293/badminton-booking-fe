import React, { useEffect, useState } from 'react';
import { fetchAllClubs, fetchClubById } from '../../services/ClubApi';
import ClubItem from './ClubItem';
import Header from '../header/Header';
import clubHeader from "./img/clubHeader.png"
import ClubDetail from './ClubDetail';
import { useNavigate } from 'react-router-dom';


const Booking = (props) => {
  const [listClubs, setListClubs] = useState([]);
  const navigate = useNavigate();
  const [selectedClub, setSelectedClub] = useState(null);

  useEffect(() => {
    getClubs();
  }, [])

  //click vao club
  const handleClubClick = async (id) => {
    navigate(`/club/${id}`);
  }

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
      <div>
        <div className='relative'>
          <img className='h-[476px] w-full object-cover' src={clubHeader} alt="" />
          <Header />
        </div>
        <div className='mx-[60px] grid gap-x-[30px] grid-cols-3 my-[30px]'>
          {listClubs && listClubs.length > 0 &&
            listClubs.map((item, index) => {
              return (
                <div className='cursor-pointer' key={index} onClick={() => handleClubClick(item.id)}>
                  <ClubItem
                    imageLink={item.imageLink}
                    name={item.name}
                    address={item.address}
                    pricerPerHour={item.pricerPerHour}
                    ownerName={item.owner.fullName}
                  />
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  );
};

export default Booking;