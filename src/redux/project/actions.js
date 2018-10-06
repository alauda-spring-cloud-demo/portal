import { createActions } from "redux-actions";

const actions = createActions({
	PROJECT:{
		LIST:{
			PEND:undefined,
			SUCCESS:({projects}) => ({projects})
		},
		CREATE:{
			PEND:({projectName}) => ({projectName}),
			SUCCESS:({project}) => ({project})
		},
		DELETE:{
			PEND:({id}) => ({id}),
			SUCCESS:({id}) => ({id})
		},
		LIST_MEMBERS:{
			PEND:({id}) => ({id}),
			SUCCESS:({id,members}) => ({id,members})
		},
		ADD_MEMBER:{
			PEND:({id,userId,displayName}) => ({id,userId,displayName}),
			SUCCESS:({id,user}) => ({id,user})
		},
		REMOVE_MEMBER:{
			PEND:({id,userId}) => ({id,userId}),
			SUCCESS:({id,userId}) => ({id,userId})
		},
		SPEC_PM:{
			PEND:({id,userId}) => ({id,userId}),
			SUCCESS:({project}) => ({project})
		}
	}
});

export default actions.project;