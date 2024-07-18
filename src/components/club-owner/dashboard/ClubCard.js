import React from "react";

const ClubCard = ({ image, title, subtitle }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default ClubCard;
