import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkSubscriptionApi } from "../../services/UserApi";

const Avatar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const checkSubscription = async () => {
    let res = await checkSubscriptionApi();
    return res;
  };

  useEffect(() => {
    checkSubscription().then((res) => {
      console.log(res);
      if (res.statusCode === 200) {
        setIsSubscribed(true);
      }
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
    toast.success("Logout successfuly!");
  };
  return (
    <div className="relative ml-[120px]">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center focus:outline-none"
      >
        <img
          src="https://images.unsplash.com/photo-1707944605002-0142810a861d?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <Link
            to={"/profile"}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Profile
          </Link>
          <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Settings
          </Link>
          {isSubscribed && (
            <Link
              to={"/club-owner"}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={() => handleLogout()}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
