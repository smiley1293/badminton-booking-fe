import axios from "./customeizeAxios";

const getOwnerBooking = async () => {
  return await axios.get("/bookings/owner");
};

const createBooking = async (bookingForm) => {
  return await axios.post("/booking/create", bookingForm);
};

export { getOwnerBooking, createBooking };
