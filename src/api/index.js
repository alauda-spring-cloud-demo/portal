import axios from "axios";
import { notification } from 'antd';
import config from "../settings"
import userApi from "./user";

const init = ()=>{
    axios.defaults.baseURL = config.apiUrl;
    axios.interceptors.response.use(data=>data,err=>{
        if (err.response.status === 504||err.response.status === 404) {
            notification["error"]({message:"网络问题，无法连接服务器"})
        } else if (err.response.status === 403) {
            notification["error"]({message:"权限不足，请联系管理员"})
        } else if (err.response.status === 401 || err.response.status === 400) {
            notification["error"]({message:"用户名或密码错误"})
        } else {
            notification["error"]({message:"发生未知错误"})
        }
    })
};

const api = {
    init
};

export { userApi };

export default api;