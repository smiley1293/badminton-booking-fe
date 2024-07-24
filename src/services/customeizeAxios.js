import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7156/api",
});
// Request interceptor to add token to headers
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
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
      console.log("Error", error.message);
    }
    return res;
    // return Promise.reject(error);
  }
);

export default instance;
