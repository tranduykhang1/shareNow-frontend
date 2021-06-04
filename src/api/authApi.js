import axios from "axios";
import { url } from "assets/Config/Url";

const authApi = {
    login: (data) => {
        const resp = axios.post(`${url}/auth/login`, {
            email: data.email,
            password: data.password,
        });
        return resp;
    },
    googleLogin: (data) => {
        const resp = axios.post(`${url}/auth/google-login`, {
            data: data
        });
        return resp;
    },
    register: (data) => {
        const resp = axios.post(`${url}/auth/register`, {
            email: data.email,
            password: data.password,
            full_name: data.full_name,
        });
        return resp;
    },
    forgotPassword: async(data) => {
        let resp;
        await axios.post(`${url}/auth/forgot-password`, {
            email: data.email,
        }).then(res => resp = res).catch(err => resp = err)
        return resp
    },
    updatePassword: (data) => {
        const resp = axios.put(`${url}/auth/update-password`, {
            new_password: data.password
        });
        return resp;
    },
};
export default authApi;