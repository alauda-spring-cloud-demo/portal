import axios from "axios";
import { notification } from 'antd';
import config from "../settings"
import userApi from "./user";
import todoApi from "./todo";
import projectApi from "./project";
import { getToken } from "../helpers/utility";

const init = ()=>{
    axios.defaults.baseURL = config.apiUrl;
    axios.interceptors.request.use(config=>{
        let token = getToken();

        if(token!=undefined && token!="undefined"){
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config;
    });
    console.log("init. ssss")
    axios.interceptors.response.use(data=>data,err=>{

        if(!err.response){
            notification["error"]({message:"网络问题，请检查网络连接"})
        }
        else if (err.response.status === 504||err.response.status === 404) {
            notification["error"]({message:"网络问题，无法连接服务器"})
        } else if (err.response.status === 403) {
            notification["error"]({message:"权限不足，请联系管理员"})
        } else if (err.response.status === 401 || err.response.status === 400) {
            notification["error"]({message:"用户名或密码错误"})
        } else {
            notification["error"]({message:err.response.data.message})
        }
        return Promise.reject(err);
    })
};

const api = {
    init
};

export { userApi,todoApi,projectApi };

export default api;