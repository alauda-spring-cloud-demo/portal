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
  }).then(res=>res.data)
};

const getUsersInProject = async (projectId)=>{
  return await axios(`/user-service/users?projectId=${projectId}`).then(res=>res.data);
}

const addUserToProject = async ({projectId,userId}) =>{
  return await axios({
      url:'/user-service/user_project_ref',
      method:"POST",
      data:{
        projectId,
        userId
      }
  })
}

const getPMList = async ()=>{
  return await axios(`/user-service/users/pm`).then(res=>res.data);
}

const createUser = ({username,password,displayName,mail}) =>{
  return axios({
      url:'/user-service/registry',
      method:"POST",
      data:{username,password,displayName,mail}
  }).then(res=>res.data);
}

const removeUserFromProject = async ({projectId,userId}) =>{
  return await axios({
      url:`/user-service/user_project_ref?projectId=${projectId}&userId=${userId}`,
      method:"DELETE"
  })
}

const getAllUsers = async ({page = 0,size = 10})=>{
  return await axios({
    url:`/user-service/users/list`,
    method:"GET",
    params:{
      page,size
    }
  }).then(res=>res.data);
}

const updateUser = (userInfo) =>{
  return axios({
      url:'/user-service/users',
      method:"PUT",
      data:userInfo
  }).then(res=>res.data);
}

const user = {
    login,
    getUsersInProject,
    getAllUsers,
    addUserToProject,
    removeUserFromProject,
    createUser,
    getPMList,
    updateUser
};

export default user;