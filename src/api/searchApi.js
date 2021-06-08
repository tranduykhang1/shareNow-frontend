import axios from "axios";
import { url } from "assets/Config/Url";
import headerConfig from "assets/Config/headersConfig";
import refreshTokenApi from "./refreshTokenRequest";


const searchApi = {
    searchUser: async(data) => {
        let resp;
        await axios.get(`${url}/search/user/?name=${data.query}&filter=${data.department}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    searchGroup: async(data) => {
        console.log(data)
        let resp;
        await axios.get(`${url}/search/group/?name=${data.query}&filter=${data.topic}`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },


}

export default searchApi