import axios from "./customeizeAxios";

const subscriptionApi = () => {
  return axios.post(`/subscription/add`)
}
const checkSubscriptionApi = () => {
  return axios.get(`/subscription/check-upgraded`)
}

export { subscriptionApi, checkSubscriptionApi }
