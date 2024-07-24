import axios from "./customeizeAxios";

const getOwnerClubs = () => {
  return axios.get(`/club/get-owned-club`);
};

const createClub = (club) => {
  return axios.post("/club/create", club);
};

export { getOwnerClubs, createClub };
