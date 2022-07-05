import actionTypes from './actionTypes';
import { getAllCodeService,createNewUserService, getAllUsers,deleteUserService,editUserService,
    getTopDoctorHomeService, getAllDoctors,saveDetailDoctorService } from '../../services/userService';
import { toast } from 'react-toastify';
// export const fetchGenderStart= () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart= () => {
    
    return async (dispatch, getState)=>{
        try{
            dispatch({type:actionTypes.FETCH_GENDER_START})
               
           
            let res =await getAllCodeService('GENDER');
            if(res && res.errCode===0){
                dispatch (fetchGenderSuccess(res.data))
            }else{
                dispatch (fetchGenderFailed());
            }
       }catch(e){
            
                dispatch (fetchGenderFailed());
                console.log('fetch gender start error',e)
            
       }
    }
  
}

export const fetchGenderSuccess= (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})


export const fetchGenderFailed= () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
///////////////////////////////  POSITION  /////////////////////////////////////////
export const fetchPositionStart= () => {
    
    return async (dispatch, getState)=>{
        try{                                  
            let res =await getAllCodeService('POSITION');
            if(res && res.errCode===0){
                dispatch (fetchPositionSuccess(res.data))
            }else{
                dispatch (fetchPositionFailed());
            }
       }catch(e){
            
                dispatch (fetchPositionFailed());
                console.log('fetchGPositionFailed: ',e)
            
       }
    }
  
}

export const fetchPositionSuccess= (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})


export const fetchPositionFailed= () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

///////////////////////////////  role  /////////////////////////////////////////
export const fetchRoleStart= () => {
    
    return async (dispatch, getState)=>{
        try{                                  
            let res =await getAllCodeService('ROLE');
            if(res && res.errCode===0){
                dispatch (fetchRoleSuccess(res.data))
            }else{
                dispatch (fetchRoleFailed());
            }
       }catch(e){
            
                dispatch (fetchRoleFailed());
                console.log('fetchRoleFailed: ',e)
            
       }
    }
  
}

export const fetchRoleSuccess= (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})


export const fetchRoleFailed= () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const createNewUser = (data) =>{
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);

            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed ! ");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
               
            } else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('saveUserFailed error', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUserStart= () => {
    
    return async (dispatch, getState)=>{
        try{                                  
            let res =await getAllUsers("ALL");
         
            if(res && res.errCode===0){   
                     
                dispatch(fetchAllUsersSuccess(res.users.reverse()))

            }else{
                toast.error("Fetch all the user error ! ");
                dispatch(fetchAllUserFailed());
            }
       }catch(e){
                toast.error("Fetch all the user error ! ");
                dispatch(fetchAllUserFailed());
                console.log('fetchAllUserFailed: ', e)
            
       }
    } 
}
export const fetchAllUsersSuccess= (data)=>({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUserFailed = ()=> ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})


export const deleteAUser = (userId) =>{
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);

            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed ! ");
                dispatch(deleteUserSucess());
                dispatch(fetchAllUserStart());
               
            } else {
                toast.error("Delete the user error ! ");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user error ! ");
            dispatch(deleteUserFailed());
            
        }
    }
}

export const deleteUserSucess = ()=>({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = ()=>({
    type: actionTypes.DELETE_USER_FAILED
})



export const editAUser = (data) =>{
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);

            if (res && res.errCode === 0) {
                toast.success("Update the user succeed ! ");
                dispatch(editUserSucess());
                dispatch(fetchAllUserStart());
               
            } else {
                toast.error("Update the user error ! ");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update the user error ! ");
            dispatch(editUserFailed());
            console.log(e);
            
        }
    }
}
export const editUserSucess = () =>({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () =>({
    type: actionTypes.EDIT_USER_FAILED
})


export const fetchTopDoctor = () =>{
    return async (dispatch, getState) => {
        try{
            let res= await getTopDoctorHomeService('');
            console.log('kt bac si', res)
            if(res && res.errCode ===0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                   
                })
            }
        }catch(e){
            //console.log('FETCH_TOP_DOCTOR_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
               
            })
        }
    }
}
//let res1 = await getTopDoctorHomeService(3);

export const fetchAllDoctors = () =>{
    return async (dispatch, getState) => {
        try{
            let res= await getAllDoctors();
          
            if(res && res.errCode ===0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                   
                })
            }
        }catch(e){
            //console.log('FETCH_TOP_DOCTOR_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
               
            })
        }
    }
}



export const saveDetailDoctor = (data) =>{
    return async (dispatch, getState) => {
        try{
            let res= await saveDetailDoctorService(data);
          
            if(res && res.errCode ===0){
                 toast.success("Save infor detail doctor the user succeed ! ");
                dispatch({
                   
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    
                })
            }else{
                 toast.error("Save infor detail doctor the user error ! ");
                dispatch({
                  
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                   
                })
            }
        }catch(e){
            //console.log('FETCH_TOP_DOCTOR_FAILED', e)
            toast.error("Save infor detail doctor the user succeed ! ");
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
               
            })
        }
    }
}


export const fetchAllScheduleTime= () =>{
    return async (dispatch, getState) => {
        try{
            let res= await getAllCodeService("TIME");
          
            if(res && res.errCode ===0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                   
                })
            }
        }catch(e){
            //console.log('FETCH_TOP_DOCTOR_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
               
            })
        }
    }
}