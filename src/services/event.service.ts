import customAxios from '../.../../components/authentication/customAxios';
import axios from "axios";

export class EventService{
    
    constructor(){

    }


    getAllEvents = async()=>{
        try{
            const response = await customAxios.get('/events');
            return response.data;
        }catch(error){
            return error;
        }
    }

    addEvent = async(eventData:any)=>{
        try{
            const response = await customAxios.post('/events/add',eventData);
            return response.data;
        }catch(err){
            return err;
        }
    }


    deleteEvent=async(eventId:string)=>{
        let response= await customAxios.delete(`/remove/${eventId}`)
        return response
    }

    // getEventById=async(eventId:string)=>{
    //     let response= await customAxios.delete(`http://localhost:5000/events/remove/${eventId}`)
    //     return response
    // }


    updateEvent=async(eventId:string,body:any)=>{
        let response= await customAxios.put(`/update/${eventId}`, body)
        return response
    }



}