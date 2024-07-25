import axios from "./customeizeAxios";

const subscriptionApi = () => {
  return axios.post(`/subscription/add`)
}
const checkSubscriptionApi = () => {
  return axios.get(`/subscription/check-upgragded`)
}

export { subscriptionApi, checkSubscriptionApi }
