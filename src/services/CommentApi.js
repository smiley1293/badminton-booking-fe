import axios from "./customeizeAxios";

const addCommentApi = (detail,clubId,stars,parentCommentId) => {
    return axios.post("/comment", {
        detail: detail,
        clubId: clubId,
        stars: stars,
        parentCommentId: parentCommentId,
    })
}
const checkValidApi = (clubId) => {
    return axios.get(`/comment/check-valid/${clubId}`)
}
const getClubCommentsApi = (clubId) => {
    return axios.get(`/comment/${clubId}`)
}
const getRepliesApi = (commentId) => {
    return axios.get(`/comment/get-replies/${commentId}`)
}

export { addCommentApi, checkValidApi, getClubCommentsApi, getRepliesApi }
