import axios, { AxiosInstance } from 'axios';
import { renewAccessTokenAPI, signOutAPI } from './signInAPIs';
const {
  VITE_ADMIN_SERVER_BASE_URL,
  VITE_CLIENT_BASE_URL,
  VITE_USER_SERVER_BASE_URL,
} = import.meta.env;

const userAxios: AxiosInstance = axios.create({
  baseURL: `${VITE_USER_SERVER_BASE_URL}/`,
});
const adminAxios: AxiosInstance = axios.create({
  baseURL: `${VITE_ADMIN_SERVER_BASE_URL}/`,
});

// USER용 Axios interceptors
userAxios.interceptors.request.use((config) => {
  const nextConfig = config;
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken || accessToken === 'undefined') {
    nextConfig.headers.Authorization = null;
  } else {
    nextConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return nextConfig;
});

userAxios.interceptors.response.use(
  (res) => res,
  async (err) => {
    // res에서 err가 발생했을 경우 catch로 넘어가기 전에 처리하는 부분
    const originalConfig = err.config;

    if (err.response && err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const currAccessToken = localStorage.getItem('accessToken');
        if (!currAccessToken) {
          return (window.location.href = `${VITE_CLIENT_BASE_URL}/signin`);
        }

        const newAccessToken = await renewAccessTokenAPI(currAccessToken);
        localStorage.setItem('accessToken', newAccessToken);
        originalConfig.headers.Authorization = `Bearer + ${newAccessToken}`;

        return userAxios(originalConfig);
      } catch (_err) {
        // throw _err;

        const currAccessToken = localStorage.getItem('accessToken');
        if (currAccessToken) {
          signOutAPI(currAccessToken);
        }

        localStorage.removeItem('accessToken');
        window.location.href = `${VITE_CLIENT_BASE_URL}/signin`;

        return Promise.reject(_err);
      }
    }
    // throw err;
    return Promise.reject(err);
  },
);

// USER용 Axios interceptors
adminAxios.interceptors.request.use((config) => {
  const nextConfig = config;
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken || accessToken === 'undefined') {
    nextConfig.headers.Authorization = null;
  } else {
    nextConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return nextConfig;
});

adminAxios.interceptors.response.use(
  (res) => res,
  async (err) => {
    // res에서 err가 발생했을 경우 catch로 넘어가기 전에 처리하는 부분
    const originalConfig = err.config;

    if (err.response && err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const currAccessToken = localStorage.getItem('accessToken');
        if (!currAccessToken) {
          return (window.location.href = `${VITE_CLIENT_BASE_URL}/signin`);
        }

        const newAccessToken = await renewAccessTokenAPI(currAccessToken);
        localStorage.setItem('accessToken', newAccessToken);
        originalConfig.headers.Authorization = `Bearer + ${newAccessToken}`;

        return adminAxios(originalConfig);
      } catch (_err) {
        // throw _err;

        const currAccessToken = localStorage.getItem('accessToken');
        if (currAccessToken) {
          signOutAPI(currAccessToken);
        }

        localStorage.removeItem('accessToken');
        window.location.href = `${VITE_CLIENT_BASE_URL}/signin`;

        return Promise.reject(_err);
      }
    }
    // throw err;
    return Promise.reject(err);
  },
);

export { userAxios, adminAxios };
