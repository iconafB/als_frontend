import axios from "axios";

const token=localStorage.getItem('token')
const campaigns_base_url="http://127.0.0.1:8000"

export const campaigns_client=axios.create({
    baseURL:campaigns_base_url,
    headers:{
        "Content-Type":"application/json",
        ...(token && {Authorization:`Bearer ${token}`})
    },
});
// Add a request interceptor to add the token to all requests
campaigns_client.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem("token") //retrieve the token from local storage 

    if (token) {
      config.headers.Authorization = `Bearer ${token}` //add token to request headers
    }
    return config;
  },
  (error) => {
    console.log("print the interceptors error")
    console.log(error)
    return Promise.reject(error);
  }
);
// Add a response interceptor to handle 401 errors
campaigns_client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);
