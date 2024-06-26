import axios from "axios";

export const BASE_URL = "https://water-app-back-2box.onrender.com";

const $instance = axios.create({
  baseURL: BASE_URL,
});

export const setToken = (token) => {
  $instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearToken = () => {
  $instance.defaults.headers.common.Authorization = "";
};
// ==============
// $instance.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem("accessToken");
//   config.headers.common.Authorization = `Bearer ${accessToken}`;
//   return config;
// });

$instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await $instance.post("auth/refresh", { refreshToken });
        setToken(data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        return $instance(error.config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
//Auth Controller
export const loginRequest = async (formData) => {
  const { data } = await $instance.post("/api/auth/signin", formData);
  setToken(data.token);
  localStorage.setItem("refreshToken", data.refreshToken);
  console.log(data);
  return data;
};
export const registerRequest = async (formData) => {
  const { data } = await $instance.post("/api/auth/signup", formData);
  console.log(data);
  setToken(data.accessToken);
  return data;
};
export const logoutRequest = async () => {
  const { data } = await $instance.delete("/api/auth/signout");
  clearToken();
  return data;
};

export const currentUserResponse = async () => {
  const { data } = await $instance.get("/api/auth/current");
  return data;
};
