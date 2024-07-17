import Axios from "axios";

const api = Axios.create({
  baseURL: 'http://',
})

export const AccountApi = {
  login: (data) => {
    return api.post("Account/login", data, {
      headers: {
        crossDomain: true,
        "Content-Type": "application/json"
      }
    })
  },
  register: (data) => {
    return api.post("Account/register", data, {
      headers: {
        crossDomain: true,
        "Content-Type": "application/json"
      }
    });
  }
}