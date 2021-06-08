import axios from "axios";
import { url } from "assets/Config/Url";
import headerConfig from "assets/Config/headersConfig";
import refreshTokenApi from "./refreshTokenRequest";


const messageApi = {
    getConversations: async() => {
        let resp;
        await axios.get(`${url}/message/message-list`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    getUserMessage: async(params) => {
        let resp;
        await axios.get(`${url}/message/?to=${params}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    sendMessage: async(data) => {

        let resp;
        let fd = new FormData();
        fd.append("message_content", data.message)
        fd.append("conversation_id", data.conversationId)

        if (data.photos) {
            Array.from(data.photos).map(photo => {
                fd.append("photos", photo)
            })

        }


        await axios.post(`${url}/message/new`, fd, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    getMessageRoom: async(params) => {
        let resp;
        await axios.get(`${url}/room/message?room=${params}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },

    getRoomMembers: async(params) => {
        console.log(params)
        let resp;
        await axios.get(`${url}/room/members?room=${params}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },

    sendMessageRoomAction: async(data) => {
        let resp;

        let fd = new FormData();
        fd.append("message_content", data.message)
        fd.append("roomId", data.roomId)

        if (data.photos) {
            Array.from(data.photos).map(photo => {
                fd.append("photos", photo)
            })

        }
        await axios.post(`${url}/room/new-message`, fd, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    joinRoom: async(data) => {
        let resp;

        await axios.get(`${url}/room/join?room=${data.room_code}&user=${data.userId}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    leaveRoom: async(data) => {
        let resp;

        await axios.delete(`${url}/room/leave?room=${data.room_code}&user=${data.userId}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    createRoom: async(data) => {
        let resp;

        await axios.post(`${url}/room/create`, { room_name: data.room_name },
                headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    }

}

export default messageApi