import axios from "axios";

export class EventService{
    
    constructor(){

    }


    deleteEvent=async(eventId:string)=>{
        let response= await axios.delete(`http://localhost:5000/events/remove/${eventId}`)
        return response
    }

    getEventById=async(eventId:string)=>{
        let response= await axios.delete(`http://localhost:5000/events/remove/${eventId}`)
        return response
    }


    updateEvent=async(eventId:string,body:any)=>{
        let response= await axios.put(`http://localhost:5000/events/update/${eventId}`, body)
        return response
    }


}