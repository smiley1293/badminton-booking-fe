import axios from './customeizeAxios';

const fetchAllClubs = () => {
  return axios.get('club/get-all')
}

export { fetchAllClubs };