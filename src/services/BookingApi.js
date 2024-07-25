import axios from "./customeizeAxios";

const getOwnerBooking = (ownerId) => {};

const createBooking = async (bookingForm) => {
  return await axios.post("/booking/create", bookingForm);
};

export { getOwnerBooking, createBooking };
