import axios from "axios";

import refreshTokenApi from "./refreshTokenRequest"
import { url } from "assets/Config/Url";

import headers from "assets/Config/headersConfig.js"

const userApi = {
    getUser: async() => {
        let resp;
        await axios.get(`${url}/user/profile`, headers).then(result => resp = result).catch(err => {
            if (err.response.status === 401) {
                refreshTokenApi()
            }
        })
        return resp
    },
    getUserProfile: async(params) => {
        let resp;
        await axios.get(`${url}/user/profile/?id=${params}`, headers).then(result => resp = result).catch(err => {
            if (err.response.status === 401) {
                refreshTokenApi()
            }
        })
        return resp
    },
    updateProfile: async(data) => {
        let resp;
        await axios.put(`${url}/user/profile`, data, headers).then(result => resp = result).catch(err => {
            if (err.response.status === 401) {
                refreshTokenApi()
            }
        })
        return resp
    },
    updateAvatar: async(photo) => {
        let resp
        let fd = new FormData();
        fd.append('photo', photo)
        await axios.put(`${url}/user/avatar`, fd, headers, ).then(result => resp = result).catch(err => {
            if (err.response.status === 401) {
                return refreshTokenApi()
            }
            resp = err
        })
        return resp
    },
    updateBackground: async(photo) => {
        let resp
        let fd = new FormData();
        fd.append('photo', photo)
        await axios.put(`${url}/user/background`, fd, headers, ).then(result => resp = result).catch(err => {
            if (err.response.status === 401) {
                return refreshTokenApi()
            }
            resp = err
        })
        return resp
    },
    activeUser: async(data) => {
        let resp
        await axios.put(`${url}/user/active`, data, headers, ).then(result => resp = result).catch(err => {
            if (err.response.status === 401) {
                return refreshTokenApi()
            }
            resp = err
        })
        return resp
    },
    toggleFollowUser: async(params) => {
        let resp
        await axios.get(`${url}/user/follow?user=${params}`, headers, ).then(result => resp = result).catch(err => {
            if (err.response.status === 401) {
                return refreshTokenApi()
            }
            resp = err
        })
        return resp
    }
}
export default userApi