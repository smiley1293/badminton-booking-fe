import axios from "axios";

const instance = axios.create({
  baseURL: 'https://localhost:7156/api'
}
)

instance.interceptors.response.use(function (response) {
  return response.data ? response.data : { statusCode: response.status }
}, function (error) {
  console.log("<<<check log", error.response)
  console.log("<<<check", error.message)
  let res = {};
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    res.data = error.response.data;
    res.status = error.response.status;
    res.headers = error.response.headers;

    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {

    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  return Promise.reject(error);
})

export default instance