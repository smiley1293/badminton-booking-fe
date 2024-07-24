import axios from "./customeizeAxios";

const paymentApi = (accountId, amount, isPayingForSubscription = false) => {
    return axios.post("/vnpay/get-pay-url", {
        amount,
        accountId,
        isPayingForSubscription
    })
}

export { paymentApi }
