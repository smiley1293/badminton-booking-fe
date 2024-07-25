import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchClubById } from '../../services/ClubApi';
import ClubComment from '../comment/CommentSection';
import BookingDialogButton from "./BookingDialogButton";

const ClubDetail = () => {
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
      <div className="mb-[190px]">
        <Header />
      </div>
      <div>
        <h1>{club.name}</h1>
        <p>Address: {club.address}</p>
        <p>Price per Hour: {club.pricerPerHour}</p>
        <p>Number of Courts: {club.numberOfCourts}</p>
        <img src={club.imageLink} alt={`${club.name}`} />
        {/* Add more details as needed */}
        <button
          className="cursor-pointer"
          onClick={() => navigate("/reservation")}
        >
          Back
        </button>
      </div>
      <div className="mt-5 flex">
        <BookingDialogButton id={id} />
      </div>
      <ClubComment clubId={id}/> 
    </div>
  );
};

export default ClubDetail;
