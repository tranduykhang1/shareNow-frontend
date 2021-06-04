import axios from "axios";
import { url } from "assets/Config/Url";
import headerConfig from "assets/Config/headersConfig";
import refreshTokenApi from "./refreshTokenRequest";


const theCurriculumApi = {
    getDepartments: async() => {
        let resp;
        await axios.get(`${url}/curriculum/departments`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    getIndustries: async() => {
        let resp;
        await axios.get(`${url}/curriculum/industries`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },
    getTagList: async() => {
        let resp;
        await axios.get(`${url}/curriculum/tag-list`, headerConfig)
            .then(result => resp = result)
            .catch(err => {
                if (err.response.status === 401) {
                    refreshTokenApi()
                }
            })
        return resp
    },

}

export default theCurriculumApi