import React, { useEffect, useState } from 'react';
import { fetchAllClubs } from '../../services/ClubApi';
import ClubItem from './ClubItem';
import Header from '../header/Header';
import clubHeader from "./img/clubHeader.png"


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
      <div className='relative'>
        <img className='h-[476px] w-full object-cover' src={clubHeader} alt="" />
        <Header />
      </div>
      <div className='mx-[60px] grid gap-x-[30px] grid-cols-3 my-[30px]'>
        {listClubs && listClubs.length > 0 &&
          listClubs.map((item, index) => {
            return (
              <ClubItem
                key={index}
                imageLink={item.imageLink}
                name={item.name}
                address={item.address}
                pricerPerHour={item.pricerPerHour}
                ownerName={item.owner.fullName}
                id={item.id}
              />
            )
          })
        }
      </div>
    </div>
  );
};

export default Booking;