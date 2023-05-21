import TokenManager from "./TokenManager";
import axiosInstance from "./AxiosInstance";

const loginUrl = "/login";

const logoutUrl = "/token/logout";

const AuthenticationApi = {
  login: (username, password, updateAuth) =>
    axiosInstance
      .post(loginUrl, { username, password })
      .then((response) => response.data)
      .then((data) => {
        TokenManager.setAccessToken(data.accessToken);
        TokenManager.setRefreshToken(data.refreshToken);
        updateAuth();
      })
      .catch((error) => {
        console.log(error);
      }),
  logout: (logout) => {
    const refreshToken = TokenManager.getRefreshToken();
    const subject = TokenManager.getClaims().sub;

    if (!refreshToken || !subject) {
      console.log("You are already logged out, please refresh the page");
    }

    axiosInstance
      .post(logoutUrl, { refreshToken, subject })
      .then(() => {
        TokenManager.clear();
        logout();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  },
};

export default AuthenticationApi;
