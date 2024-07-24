import React, { useEffect, useState } from 'react';
import { fetchAllClubs } from '../../services/ClubApi';
import ClubItem from './ClubItem';


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
            <ClubItem
              key={index}
              imageLink={item.imageLink}
              name={item.name}
              address={item.address}
              pricerPerHour={item.pricerPerHour}
              ownerName={item.owner.fullName}
            />
          )
        })
      }

    </div>
  );
};

export default Booking;