import { useState } from "react";
import { createClub } from "../../../services/ClubApi";

const CreateClubDialog = ({ onClose }) => {
  const [formData, setFormData] = useState({
    Name: "",
    OwnerId: 2,
    Address: "",
    PricerPerHour: "",
    NumberOfCourts: "",
    Image: null,
  });

  const [errors, setErrors] = useState({
    Name: "",
    Address: "",
    PricerPerHour: "",
    NumberOfCourts: "",
    Image: "",
  });

  const createNewClub = async (club) => {
    const form = new FormData();
    form.append("Name", club.Name);
    form.append("OwnerId", club.OwnerId);
    form.append("Address", club.Address);
    form.append("PricerPerHour", club.PricerPerHour);
    form.append("NumberOfCourts", club.NumberOfCourts);
    form.append("Image", club.Image);
    console.log(formData.Image, "formdata");

    try {
      const response = await createClub(form);
      console.log(response);
      onClose();
    } catch (error) {
      console.error("Error creating club:", error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.Name) newErrors.Name = "Club name is required.";
    if (!formData.Address) newErrors.Address = "Address is required.";
    if (!formData.PricerPerHour || formData.PricerPerHour <= 0)
      newErrors.PricerPerHour = "Price per hour must be a positive number.";
    if (!formData.NumberOfCourts || formData.NumberOfCourts <= 0)
      newErrors.NumberOfCourts = "Number of courts must be a positive number.";
    if (!formData.Image) newErrors.Image = "Image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function handleImage(e) {
    setFormData({ ...formData, [e.target.id]: e.target.files[0] });
  }

  const handleSubmit = (e) => {
    console.log(formData);
    if (validate()) {
      createNewClub(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Club name
        </label>
        <input
          onChange={handleFormChange}
          type="text"
          placeholder="Club name"
          id="Name"
          value={formData.Name}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.Name && (
          <p className="text-red-500 text-xs mt-1">{errors.Name}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          onChange={handleFormChange}
          type="text"
          placeholder="Address"
          id="Address"
          value={formData.Address}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.Address && (
          <p className="text-red-500 text-xs mt-1">{errors.Address}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price per hour
        </label>
        <input
          onChange={handleFormChange}
          type="number"
          placeholder="0"
          id="PricerPerHour"
          value={formData.PricerPerHour}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.PricerPerHour && (
          <p className="text-red-500 text-xs mt-1">{errors.PricerPerHour}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Number of courts
        </label>
        <input
          onChange={handleFormChange}
          type="number"
          placeholder="NumberOfCourts"
          id="NumberOfCourts"
          value={formData.NumberOfCourts}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.NumberOfCourts && (
          <p className="text-red-500 text-xs mt-1">{errors.NumberOfCourts}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          onChange={(e) => handleImage(e)}
          type="file"
          id="Image"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.Image && (
          <p className="text-red-500 text-xs mt-1">{errors.Image}</p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-[#DF6951] text-white rounded-lg shadow-lg p-2 hover:shadow-2xl ml-auto flex"
      >
        Create Club
      </button>
    </div>
  );
};

export default CreateClubDialog;
