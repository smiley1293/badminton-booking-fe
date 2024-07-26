import axios from "./customeizeAxios";

const paymentApi = (amount, isPayingForSubscription = false) => {
    return axios.post("/vnpay/get-pay-url", {
        amount,
        isPayingForSubscription
    })
}

const addPayment = (amount) => {
    return axios.post("/vnpay/get-pay-url",{
        amount
    })
}

export { paymentApi, addPayment }
