import axios from "axios";
import { url } from "assets/Config/Url";
import headerConfig from "assets/Config/headersConfig";
import refreshTokenApi from "./refreshTokenRequest";


const groupApi = {
    getNews: async(params) => {
        let resp
        await axios.get(`${url}/post/page/${params}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },

    createPost: async(data) => {
        let resp
        let fd = new FormData();
        fd.append("caption", data.caption)
        fd.append("topic", data.topic)
        fd.append("tag", data.tag)
        Array.from(data.photos).map(photo => {
            fd.append("photos", photo)
        })

        await axios.post(`${url}/post/create`, fd, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },

    filterPost: async(data) => {
        let resp;
        await axios.get(`${url}/post/filter/?topic=${data.topic}&tag=${data.tag}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    }
}

export default groupApi