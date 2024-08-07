import React, { useEffect, useState } from 'react';
import { addToWislist, fetchAllClubs, fetchClubById, searchClubsbyAddress } from '../../services/ClubApi';
import ClubItem from './ClubItem';
import Header from '../header/Header';
import clubHeader from "./img/clubHeader.png"
import ClubDetail from './ClubDetail';
import { useNavigate } from 'react-router-dom';
import Login from '../../pages/Login';
import { toast } from 'react-toastify';


const Booking = (props) => {
  const accessToken = localStorage.getItem('token');
  const [listClubs, setListClubs] = useState([]);
  const navigate = useNavigate();
  const [selectedClub, setSelectedClub] = useState(null);


  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      getClubs();
    } else {
      let res = await searchClubsbyAddress(searchTerm);
      if (res && res.length > 0) {
        setListClubs(res)
      } else {
        setListClubs([]);
        toast.error("No clubs found!!!");
      }
    }
  }

  const handleAddToWishlist = async (clubId) => {
    let res = await addToWislist(clubId);
    if (res) {
      toast.success("Added to wishlist");
    } else {
      toast.error("Failed to add to wishlist");
    }
  }



  return (
    <div className=''>

      {accessToken ?
        (<div>
          <div className='relative'>
            <img className='h-[476px] w-full object-cover' src={clubHeader} alt="" />
            <Header />
          </div>
          <div className='mx-[60px] my-[30px]'>
            <input
              type="text"
              placeholder="Enter your address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-[20px] p-[10px] bg-[#FAF7F3] placeholder-[#5B453A] placeholder-opacity-55 w-[500px] border rounded border-[#3A3404]'
            />
            <button onClick={handleSearch} className='ml-[10px] p-[10px] bg-transparent border border-[#5B453A] hover:bg-[#5B453A] hover:text-white transition-all text-[#5B453A] rounded'>
              Search
            </button>
          </div>
          <div className='mx-[60px] grid gap-x-[30px] gap-y-[50px] grid-cols-3 my-[30px]'>
            {listClubs && listClubs.length > 0 &&
              listClubs.map((item, index) => {
                return (
                  <div className='cursor-pointer' key={index} onClick={() => handleClubClick(item.id)}>
                    <ClubItem
                      imageLink={item.imageLink}
                      name={item.name}
                      address={item.address}
                      pricerPerHour={(item.pricerPerHour).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      ownerName={item.owner.fullName}
                      onClick={() => handleClubClick(item.id)}
                      onAddToWishlist={() => handleAddToWishlist(item.id)}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>) :
        (<Login />)}
    </div>
  );
};

export default Booking;