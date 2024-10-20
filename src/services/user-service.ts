
import customAxios from '../.../../components/authentication/customAxios';
import axios from "axios";
export class UserService{
    
    getAllUsers = async()=>{
        try{
            const response = await customAxios.get('/users');
            console.log("Response data", response.data)
            return response.data;
        }catch(e:any){
            console.log(e.message);
        }
   }

   addUser = async(userData:any)=>{
    try{
        const response = await customAxios.post("/users",userData);
        console.log("User Already Exists", response);
        return response.data
    }catch(error:any){
        console.log("Error in Post User",error);
    }
   }

   deleteUser=async(eventId:string)=>{
    let response= await customAxios.delete(`/users/remove/${eventId}`)
    return response;
}


}



