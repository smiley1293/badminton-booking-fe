import React, { useEffect } from 'react';
import { fetchAllClubs } from '../../services/ClubApi';

const Booking = (props) => {
  useEffect(() => {
    getClubs();
  })

  const getClubs = async () => {
    let res = await fetchAllClubs();
    console.log("check res: ", res);
  }
  return (
    <div>

    </div>
  );
};

export default Booking;