import axios from "./customeizeAxios";

const loginApi = (email, password) => {
  return axios.post("/login", { email, password })
}
const registerApi = (email, password, fullname, phoneNumber) => {
  return axios.post("/register", {
    email, 
    password, 
    fullname,
    phoneNumber
  })
}
export { loginApi, registerApi }
