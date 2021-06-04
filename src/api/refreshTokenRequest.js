import axios from "axios";
import { url } from "assets/Config/Url";

let refreshToken = null;

const refreshTokenApi = async() => {
    refreshToken = refreshToken ? refreshToken : refreshTokenRequest();

    const newToken = await refreshToken;

    refreshToken = null;
    localStorage.setItem("token", newToken);
    return;
};

const refreshTokenRequest = async() => {
    let refreshToken = localStorage.getItem("refreshToken");
    try {
        let tokenResponse = await axios.post(`${url}/auth/refresh-token`, {
            refresh_token: refreshToken,
        });
        if (refreshToken) {
            window.location.reload();
        }
        return tokenResponse.data
    } catch (err) {
        if (err.response.status === 403) {
            window.location.pathname = "/";
        }
    }
};

export default refreshTokenApi;