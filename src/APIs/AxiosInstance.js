import axios from "axios";
import TokenManager from "./TokenManager";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

const refreshTokenUrl = "http://localhost:8080/token/refresh";

const excludedEndpoints = [
  { url: "/login", methods: ["POST"] },
  { url: "/token/refresh", methods: ["POST"] },
  { url: "/courses", methods: ["GET"] },
];

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = TokenManager.getAccessToken();
    const isExcludedEndpoint = excludedEndpoints.find((endpoint) => {
      return (
        endpoint.url === config.url &&
        endpoint.methods.includes(config.method.toUpperCase())
      );
    });

    if (token && !isExcludedEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.log(error.response);

      if (error.response.data.error === "Access token expired") {
        originalRequest._retry = true;
        const refreshToken = TokenManager.getRefreshToken();
        const subject = TokenManager.getClaims().sub;
        return axios
          .post(refreshTokenUrl, {
            refreshToken: refreshToken,
            subject: subject,
          })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              TokenManager.setAccessToken(response.data.accessToken);
              TokenManager.setRefreshToken(response.data.refreshToken);
              axiosInstance.defaults.headers.common["Authorization"] =
                "Bearer " + TokenManager.getAccessToken();

              const refreshEvent = new CustomEvent("tokenRefreshed");
              window.dispatchEvent(refreshEvent);
              return axiosInstance(originalRequest);
            }
          });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
