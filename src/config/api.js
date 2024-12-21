import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("loggedIn");

    if (window.location.pathname !== '/account/login') {
        window.location.href = '/account/login';
    }
    }

    return Promise.reject(error);
  }
);
