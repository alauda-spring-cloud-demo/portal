import axios from "axios";
import { getToken } from "../helpers/utility";

const list = async ()=>{
  return await axios("/project-service/project")
};

const create = async ({projectName})=>{
  return await axios({
  	url:"/project-service/project",
  	method:"POST",
  	data:{name:projectName}
  })
};

const get = async (projectId)=>{
  return await axios({
  	url:`/project-service/project/${projectId}`,
  	method:"GET"
  })
};

const setManager = async ({projectId,userName,userId,displayName}) =>{
	console.log({projectId,userName,userId,displayName})
	return await axios({
	  	url:`/project-service/project`,
	  	method:"PUT",
	  	data:{
	  		id:projectId,
	  		ownerId:userId,
	  		ownerName:userName,
	  		ownerDisplayName:displayName
	  	}
	  }).then(res=>res.data);
}

const project = {
	list,
	create,
	get,
	setManager
}

export default project;