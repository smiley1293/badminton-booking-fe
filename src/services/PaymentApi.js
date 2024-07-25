import axios from "./customeizeAxios";

const paymentApi = (amount, isPayingForSubscription = false) => {
    return axios.post("/vnpay/get-pay-url", {
        amount,
        isPayingForSubscription
    })
}

export { paymentApi }
