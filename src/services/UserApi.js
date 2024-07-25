import axios from "./customeizeAxios";

const loginApi = (email, password) => {
  return axios.post("/login", { email, password });
};

const getProfileApi = () => {
  const token = localStorage.getItem("token");
  return axios.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateProfileApi = (fullname, phoneNumber) => {
  const token = localStorage.getItem("token");
  return axios.put(
    "/profile/edit",
    { fullname, phoneNumber },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const registerApi = (email, password, fullname, phoneNumber) => {
  return axios.post("/register", {
    email,
    password,
    fullname,
    phoneNumber,
  });
};

export { loginApi, getProfileApi, updateProfileApi, registerApi };
