import axios from "axios";
import config from "../settings"

const login = async (loginName,password)=>{
  return await axios({
      url:config.tokenUrl,
      // baseURL:axios.defaults.baseURL + ":8000",
      method:"POST",
      headers:{
          "Content-Type":"application/x-www-form-urlencoded",
          "Authorization" :`Basic ${btoa(config.client_id + ":" + config.client_secret)}`
      },
      data:`username=${loginName}&password=${password}&grant_type=password`
  })
};

const user = {
    login
};

export default user;