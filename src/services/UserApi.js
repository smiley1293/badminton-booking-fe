import axios from "./customeizeAxios";

const loginApi = (email, password) => {
  return axios.post("/login", { email, password })
}

export { loginApi }
