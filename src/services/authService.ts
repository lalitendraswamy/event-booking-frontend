import axios from 'axios'
import customAxios from '../components/authentication/customAxios';
 
export class AuthService{
    // apiUrl:String|undefined
 
    constructor(){
        // this.apiUrl = process.env.REACT_APP_API_URL
    }
 
    getUrl(){
        // return this.apiUrl
    }
 
    getAuthUrl= async() =>{
        console.log("Into Auth Url");
        let authUrl = await axios.get('http://localhost:5000/auth')
        return authUrl
    }
 
    exhangeCodeWithToken = async(code:string) =>{
        let response = await axios.post("http://localhost:5000/auth/callback", { code });
        return response.data
    }
    
    findUserByEmail=async(email:string)=>{
        let response= await customAxios.get(`/users/email/${email}`);
        return response.data
    }

}