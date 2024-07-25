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

const fetchClubById = (id) => {
  return axios.get(`club/get/${id}`)
}

const searchClubsbyAddress = (address) => {
  return axios.get(`club/search`, {
    params: {
      address: address
    }
  });
}

const addToWislist = (clubId) => {
  return axios.post('/wishlist/add', { clubId });
}

const getWislist = () => {
  return axios.get('/wishlist')
}

const removeFromWishlist = (clubId) => {
  return axios.delete('/wishlist/delete', { data: { clubId } });
};



export { getOwnerClubs, createClub, fetchAllClubs, fetchClubById, searchClubsbyAddress, addToWislist, getWislist, removeFromWishlist };