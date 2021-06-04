import axios from "axios";
import { url } from "assets/Config/Url";
import headerConfig from "assets/Config/headersConfig";
import refreshTokenApi from "./refreshTokenRequest";


const groupApi = {
    createGroup: async(data) => {
        let resp;
        let fd = new FormData();
        fd.append("photo", data.photo)
        fd.append("name", data.groupName)
        fd.append("topic", data.topic)
        fd.append("password", data.password)

        await axios.post(`${url}/group/create`, fd, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    updateGroup: async(data) => {
        let resp;
        let fd = new FormData();
        fd.append("group_id", data.group_id)
        fd.append("photo", data.photo)
        fd.append("name", data.groupName)
        fd.append("topic", data.topic)
        fd.append("password", data.password)

        await axios.put(`${url}/group/update`, fd, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    removeGroup: async(params) => {
        let resp
        await axios.delete(`${url}/group/delete?group=${params}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    getGroupDetail: async(params) => {
        let resp;
        await axios.get(`${url}/group/detail/${params}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    getMembers: async(params) => {
        let resp;
        await axios.get(`${url}/group/members/${params}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    checkUserIn: async(params) => {
        let resp;
        await axios.get(`${url}/group/check-user/${params}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    addMember: async(data) => {
        let resp;
        await axios.post(`${url}/group/add-member`, data, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    removeMember: async(data) => {
        let resp;
        await axios.delete(`${url}/group/remove-member?id=${data.group_id}&user=${data.user_id}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    groupByUser: async(data) => {
        let resp;
        await axios.get(`${url}/group/users-group`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    createGroupPost: async(data) => {
        let resp;
        let fd = new FormData();
        fd.append('groupId', data.group_id)
        fd.append('caption', data.caption)
        Array.from(data.photos).map(photo => {
            fd.append('photos', photo)
        })


        await axios.post(`${url}/group/create-post`, fd, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },

    newsInGroup: async(params) => {
        let resp;
        await axios.get(`${url}/group/news/${params}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    newsInAllGroup: async() => {
        let resp;
        await axios.get(`${url}/group/news`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },

}

export default groupApi