import React, { useEffect, useState } from 'react';
import { getProfileApi, updateProfileApi } from '../../services/UserApi';
import { toast } from 'react-toastify';

const Profile = (props) => {
  const [profile, setProfile] = useState({ fullName: "", phoneNumber: "" });
  const [isEditing, setIsEditing] = useState(false);

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
    </div>
  );
};

export default Profile;