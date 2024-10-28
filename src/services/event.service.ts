import customAxios from '../.../../components/authentication/customAxios';
import axios from "axios";

export class EventService{
    
    constructor(){

    }


    getAllEvents = async({location,category,limit,minTicketPrice,page,date}:any)=>{
        try{
          
            const response = await customAxios.get(`/events/filters/?location=${location}&category=${category}&limit=${limit}&minTicketPrice=${minTicketPrice}&page=${page}&eventDateTime=${date}`);
           console.log(response.data)
            return response.data.data;
        }catch(error){
            return error;
        }
    }
 

    // getAllEvents = async()=>{
    //     try{
    //         const response = await customAxios.get("/events");
    //         return response.data;
    //     }catch(error){
    //         return error;
    //     }
    // }

    addEvent = async(eventData:any)=>{
        try{
            console.log("event post data",eventData)
            const response = await customAxios.post('/events/add',eventData);
            console.log("event post data res",response)
            return response.data;
        }catch(err){
            return err;
        }
    }


    deleteEvent=async(eventId:string)=>{
        let response= await customAxios.delete(`/events/remove/${eventId}`)
        return response
    }

    getEventById=async(eventId:string)=>{
       
            try{
                const response = await customAxios.get(`/events/get/${eventId}`);
                
                return response.data
    
            }catch(e){
                console.log(e)
            }
        
    }


    updateEvent=async(eventId:string,body:any)=>{
        console.log('upeve trigg',{eventId,body})
        let response= await customAxios.put(`/events/update/${eventId}`, body)
        return response
    }



}