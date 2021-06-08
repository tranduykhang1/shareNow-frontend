import axios from "axios";
import { url } from "assets/Config/Url";
import headerConfig from "assets/Config/headersConfig";
import refreshTokenApi from "./refreshTokenRequest";


const interactiveApi = {
    getCommentList: async(params) => {
        let resp
        await axios.get(`${url}/interact/comment/${params}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    postComment: async(data) => {
        let resp
        await axios.post(`${url}/interact/comment/`, {
                content: data.text,
                reply_to: data.replyName,
                post_id: data.post_id
            }, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    likePost: async(params) => {
        let resp
        await axios.get(`${url}/interact/like?post=${params}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    unLikePost: async(data) => {
        let resp
        await axios.delete(`${url}/interact/like?like_id=${data.like}&post_id=${data.post}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
}

export default interactiveApi