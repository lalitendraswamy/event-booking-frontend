import axios from "axios";

export class EventService{
    
     getAllEvents = async()=>{
        try{
            const response = await axios.get('http://localhost:5000/events');
            return response.data;
        }catch(error){
            return error;
        }
    }

    addEvent = async(eventData:any)=>{
        try{
            const response = await axios.post('http://localhost:5000/events/add',eventData);
            return response.data;
        }catch(err){
            return err;
        }
    }
}