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
        let response= await customAxios.delete(`/events/remove/${eventId}`)
        return response
    }

    getEventById=async(eventId:string)=>{
       
            try{
                const response = await customAxios.get(`/events/get/${eventId}`);
                console.log('service', response.data)
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