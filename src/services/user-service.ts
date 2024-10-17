import axios from "axios";

export class UserService{
    
    constructor(){

    }


    deleteUser=async(eventId:string)=>{
        let response= await axios.delete(`http://localhost:5000/users/remove/${eventId}`)
        return response;
    }

    
}