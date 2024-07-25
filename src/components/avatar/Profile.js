import React, { useEffect, useState } from 'react';
import { getProfileApi, updateProfileApi } from '../../services/UserApi';
import { toast } from 'react-toastify';
import { getWislist } from '../../services/ClubApi';
import ClubItem from '../booking/ClubItem';
import avatar from "./img/avatar.png"
import { useNavigate } from 'react-router-dom';

const Profile = (props) => {
  const [profile, setProfile] = useState({ fullName: "", phoneNumber: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileApi();
        setProfile(data);
      } catch (err) {
        console.error('Get profile failed', err);
      }
    };
    fetchProfile();
    fetchWishlist();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfileApi(profile.fullName, profile.phoneNumber);
      setIsEditing(false)
      toast.success("Update successfully");
    } catch (err) {
      console.log("Cập nhật faile", err);
      toast.error("Update failed. Please try again")
    }
  }

  if (!profile) {
    return <div>Loading...</div>
  }



  const fetchWishlist = async () => {
    try {
      const res = await getWislist();
      if (res && res.length > 0) {
        setWishlist(res.map(item => item.club));
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
      setWishlist([]);
    }
  }

  const handleClubClick = async (id) => {
    navigate(`/club/${id}`);
  }

  return (
    <div className="profile-container bg-[#191414] pb-[50px]">
      <button className='text-[#B2B2B2] ml-[10px] mt-[10px] underline hover:text-[#d4d4d4] transition-all' onClick={() => navigate("/")}>Back to homepage</button>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className='mb-[40px]'>
            <label className='text-white ml-[20px] mr-[40px]' htmlFor="fullName">Họ và tên:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className='text-white ml-[20px] mr-[10px]' htmlFor="phoneNumber">Số điện thoại:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className='ml-[50px] mt-[30px]'>
            <button className='bg-[#1DB954] text-white px-[15px] rounded-[5px] py-[6px] mr-[30px]' type="submit">Save</button>
            <button className='bg-transparent border-white border rounded-[5px] text-white px-[15px] py-[6px] mr-[30px]' type="button" onClick={() => setIsEditing(false)}>Hủy</button>
          </div>
        </form>
      ) : (
        <div className='bg-[#191414] text-[#FFFFFF]'>
          <div className='flex items-center gap-[20px] ml-[200px] mt-[108px]'>
            <img
              src={avatar}
              alt="Avatar"
              className="w-[160px] h-[160px] object-cover rounded-full"
            />
            <div>
              <p className='text-[65px] font-[poppins] font-bold'><strong></strong> {profile.fullName}</p>
              <p> {profile.email}</p>
            </div>
            <div>
              <button className='bg-[#ba5d07] px-[15px] py-[5px] ml-[220px] hover:bg-[#e2852e] rounded-[5px]' onClick={() => setIsEditing(true)}>Edit</button>
            </div>
          </div>
          <hr className='bg-[#B2B2B2] border-[#868686] mt-[30px]' />
          <div className='mt-[20px] ml-[220px]'>
            <p className='text-[18px] mb-[20px]'><strong className='mr-[220px] text-[#B2B2B2]'>Phone number:</strong> {profile.phoneNumber}</p>
            <p className='mb-[20px] text-[#1DB954]'><strong className='mr-[290px] text-[#B2B2B2]'>Balance:</strong> {profile.balance !== undefined && profile.balance !== null ? profile.balance.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</p>
            <p><strong className='mr-[270px] text-[#B2B2B2]'>Created At:</strong> {new Date(profile.createdTime).toLocaleString()}</p>
          </div>

        </div>
      )}
      <div className='mt-[20px]'>
        <div className='text-white font-[poppins] ml-[70px] mt-[40px] font-bold text-[22px]'>Favorite clubs</div>
        <div className='mx-[60px] grid gap-x-[30px] grid-cols-3 my-[30px] '  >
          {wishlist.length > 0 ? (
            wishlist.map((club, index) => (
              <div key={index} onClick={() => handleClubClick(club.id)} className='cursor-pointer' >
                <ClubItem
                  key={index}
                  imageLink={club.imageLink}
                  name={club.name}
                  address={club.address}
                  pricerPerHour={club.pricerPerHour.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  ownerName={club.owner ? club.owner.fullName : 'Owner'}
                />
              </div>
            ))
          ) : (
            <p>Không có câu lạc bộ nào trong danh sách yêu thích.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;