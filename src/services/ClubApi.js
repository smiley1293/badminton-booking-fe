import axios from "./customeizeAxios";

const getOwnerClubs = () => {
  return axios.get(`/club/get-owned-club`);
};

const createClub = (club) => {
  return axios.post("/club/create", club);
};



const fetchAllClubs = () => {
  return axios.get('club/get-all')
}

export { getOwnerClubs, createClub, fetchAllClubs };