import axios from "./customeizeAxios";

const getOwnerBooking = (ownerId) => {};

const createBooking = (bookingForm) => {
  return axios.post("/booking/create", bookingForm);
};

export { getOwnerBooking, createBooking };
