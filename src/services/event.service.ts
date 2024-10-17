import customAxios from '../.../../components/authentication/customAxios';

export class EventService{
    
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
}