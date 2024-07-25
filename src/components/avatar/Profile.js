import React, { useEffect, useState } from 'react';
import { getProfileApi, updateProfileApi } from '../../services/UserApi';
import { toast } from 'react-toastify';
import { getWislist } from '../../services/ClubApi';
import ClubItem from '../booking/ClubItem';

const Profile = (props) => {
  const [profile, setProfile] = useState({ fullName: "", phoneNumber: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [wishlist, setWishlist] = useState([]);

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

  return (
    <div className="profile-container">
      <h1>Hồ sơ</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName">Họ và tên:</label>
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
            <label htmlFor="phoneNumber">Số điện thoại:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Lưu</button>
          <button type="button" onClick={() => setIsEditing(false)}>Hủy</button>
        </form>
      ) : (
        <div>
          <p><strong>ID:</strong> {profile.id}</p>
          <p><strong>Họ và tên:</strong> {profile.fullName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Số điện thoại:</strong> {profile.phoneNumber}</p>
          <p><strong>Thời gian tạo:</strong> {new Date(profile.createdTime).toLocaleString()}</p>
          <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
        </div>
      )}
      <div className=''>
        <div>Your favorite clubs</div>
        <div className='mx-[60px] grid gap-x-[30px] grid-cols-3 my-[30px]'>
          {wishlist.length > 0 ? (
            wishlist.map((club, index) => (
              <ClubItem
                key={index}
                imageLink={club.imageLink}
                name={club.name}
                address={club.address}
                pricerPerHour={club.pricerPerHour}
                ownerName={club.owner ? club.owner.fullName : 'Owner'}
              />
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