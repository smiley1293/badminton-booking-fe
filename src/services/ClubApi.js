import axios from "./customeizeAxios";

const getOwnerClubs = (ownerId) => {
  return axios.get(`/club/get-owned-club/${ownerId}`);
};

const createClub = (club) => {
  return axios.post("/club/create", club);
};

export { getOwnerClubs, createClub };
