import jwt_decode from "jwt-decode";

const TokenManager = {
  getAccessToken: () => localStorage.getItem("accessToken"),
  getClaims: () => {
    if (!localStorage.getItem("claims")) {
      return undefined;
    }
    return JSON.parse(localStorage.getItem("claims"));
  },
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
    const claims = jwt_decode(token);
    localStorage.setItem("claims", JSON.stringify(claims));
    return claims;
  },
  clear: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("claims");
    localStorage.removeItem("refreshToken");
  },

  getRefreshToken: () => localStorage.getItem("refreshToken"),

  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
  },

  isTokenValid: () => {
    const claims = TokenManager.getClaims();
    if (!claims) return false;
    const currentTime = Date.now() / 1000;
    return currentTime < claims.exp;
  },
};

export default TokenManager;
