import customAxios from '../.../../components/authentication/customAxios';
import axios from "axios";

export class EventService{
    
   
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
            const response = await customAxios.post('/events/add',eventData);
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
        let response= await customAxios.delete(`/events/${eventId}`)
        return response
    }


    updateEvent=async(eventId:string,body:any)=>{
        let response= await customAxios.put(`/events/update/${eventId}`, body)
        return response
    }



}