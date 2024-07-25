import axios from "./customeizeAxios";

const addCommentApi = (comment) => {
    return axios.post("/comment/add", {
        comment
    })
}
const addReplyApi = (comment,replyId) => {
    return axios.post("/comment/addReply", {
        comment
    })
}

const getCommentsApi = (clubId) => {
    return axios.get(`/comment/get/${clubId}`)
}

export { addCommentApi, addReplyApi, getCommentsApi }
