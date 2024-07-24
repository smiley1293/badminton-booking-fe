import axios from "./customeizeAxios";

const subscriptionApi = (id) => {
  return axios.post(`/subscription/add/${id}`)
}

export { subscriptionApi }
