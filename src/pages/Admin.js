import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAllProfilesApi } from "../services/UserApi";

function Admin() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      Navigate("/login");
    }

    getAllProfiles();
  }, []);

  const getAllProfiles = async () => {
    let res = await getAllProfilesApi();
    console.log("$$$", res);
    setProfile(res);
  };

  return (
    <div className="flex">
      <div className="w-1/5 h-screen bg-slate-800"></div>
      <div className="w-4/5 mt-10 overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative ">
        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr>
              <th className="py-2 px-3 sticky top-0 border-b border-gray-200">
                FullName
              </th>
              <th className="py-2 px-3 sticky top-0 border-b border-gray-200">
                Email
              </th>
              <th className="py-2 px-3 sticky top-0 border-b border-gray-200">
                PhoneNumber
              </th>
              <th className="py-2 px-3 sticky top-0 border-b border-gray-200">
                Balance
              </th>
              <th className="py-2 px-3 sticky top-0 border-b border-gray-200">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {profile.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.fullName}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  {user.phoneNumber ? user.phoneNumber : "N/a"}
                </td>
                <td className="py-2 px-4 border-b">{user.balance}</td>
                <td className="py-2 px-4 border-b">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
