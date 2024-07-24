import React, { useEffect } from "react";
import { fetchAllClubs } from '../../services/ClubApi';

const ClubItem = (props) => {
  useEffect(() => {
    getClubs();
  })

  const getClubs = async () => {
    let res = await fetchAllClubs();
    console.log("check res: ", res);
  }

  return (
    <div className="bg-[#FAF7F3]">
      <img src="" alt="" />
      <h1></h1>
      <p></p>
      <div>Price</div>
    </div>
  );
};

export default ClubItem;