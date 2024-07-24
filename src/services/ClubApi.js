import axios from "./customeizeAxios";

const getOwnerClubs = (ownerId) => {
  return axios.get(`/club/get-owned-club/${ownerId}`);
};

export { getOwnerClubs };
