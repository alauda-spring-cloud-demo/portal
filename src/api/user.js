import axios from "axios";

const login = async (loginName,password)=>{
  return await axios({
      url:`${axios.defaults.baseURL}:8000/oauth/token`,
      // baseURL:axios.defaults.baseURL + ":8000",
      method:"POST",
      headers:{
          "Content-Type":"application/x-www-form-urlencoded",
          "Authorization" :`Basic ${btoa("app_web_client:app_web_secret")}`
      },
      data:`username=${loginName}&password=${password}&grant_type=password`
  })
};

const user = {
    login
};

export default user;