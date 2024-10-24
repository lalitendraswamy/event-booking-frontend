import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {EventService} from "../../../services/event.service";
import customAxios from '../../../components/authentication/customAxios';
import axios from 'axios';
const EventsService = new EventService();


export interface Review{
    review: string,
    userRating: string| number,
    user:{
        username:string
    }
}

export interface Event {
    eventId: any,
    eventName: string,
    category: string,
    description:string,
    eventDataTime:string,
    duration:string| number,
    totalTickets:string| number,
    averageRating: string| number,
    organizerName:string,
    organizerImage:string,
    imageUrl:string,
    ticketPrice:string|number,
    reviews: Review[] | []

}

export interface EventState {
    events: Event[];
    eachEvent: Event | []
    loading: boolean;
    error: string | null;
    favorites:Event[] ;
    activeLink:string,
}

const initialState: EventState = {
    events: [],
    eachEvent : [],
    loading: false,
    error: null,
    favorites:[],
    activeLink:"/events",
};



export const getAllEvents = createAsyncThunk(
    'events/getAllEvents',
    async () => {
        try{
           const response = await EventsService.getAllEvents();
           return response.data;
        }catch(error){
            console.log(error);
        }
    }
);

  export const addEvent = createAsyncThunk<Event, Event>(
    'events/addEvent',
    async (eventData:any) => {
        try{
           
            const response = await EventsService.addEvent(eventData);
            console.log("addevent",eventData,response)
            return response;
        }catch(err){
            console.log(err);
        }
    }
);

export const addFavorite = createAsyncThunk(
    "events/addFavorite",
    async ({userId,eventId}:{userId:string,eventId:any}) =>{
        console.log(userId,eventId)
        try{
            // console.log("Inside thunk favorite")
            const response = await customAxios.post(`/wishlist`, {userId,eventId});
               console.log("Favorite",response)
            return response;
        }catch(e){
            // console.log("Error in add Favorite")
            console.log(e);
        }
    }
)

export const getFavorite = createAsyncThunk(
    "events/getFavorite",
    async () =>{
        try{
            const response = await customAxios.get("/wishlist");
            return response;
        }catch(e){
            console.log(e)
        }
    }
)

export const deleteFavorite = createAsyncThunk(
    "events/deleteFavorite",
    async (eventId:string) =>{
        try{
            const response = await customAxios.delete(`/wishlist/${eventId}`);
            console.log("Removed Favorite", response);
            return response;
        }catch(e){
            console.log(e)
        }
    }
)


export const getEventById = createAsyncThunk(
    "events/getEventById",
    async (id:string) => {
        try{
            const response = await customAxios.get(`/events/get/${id}`);
            return response.data;

        }catch(e){
            console.log(e)
        }
    }
)

export const deleteEvent = createAsyncThunk("events/deleteEventById", async(id:string)=>{
    try{
        const response = await customAxios.delete(`/events/remove/${id}`);
        return {res:response.data,eventId:id};
    }catch(e){
        console.log(e)
    }
})

export const updateEvent = createAsyncThunk("events/updateEventById", async(values:any)=>{

    try{
        const response = await customAxios.put(`/events/update/${values.eventId}`,values.values);
        return {eventId:values.eventId,...values.values};
    }catch(e){
        console.log(e)
    }
})


const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
       filteredEvents : (state,action) =>{
                state.events = action.payload;
            },
        addFavoriteItem:(state,action)=>{
            // console.log(action.payload)
            let data:any = state.favorites.find(favorite => favorite.eventId === action.payload.eventId);
            if(!data){
            state.favorites.push(action.payload);
            }
        },
        removeFavoriteItem: (state, action) => {
            state.favorites = state.favorites.filter(favorite => favorite.eventId !== action.payload);
        },
        activeNavBarPath:(state,action)=>{
            state.activeLink = action.payload;
        }
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEvents.pending, (state) => {
                state.loading = true; // Set loading to true when the fetch starts
            })
            .addCase(getAllEvents.fulfilled, (state, action:any) => {
                state.events = action.payload;
                state.loading = false;
            })
            .addCase(addEvent.fulfilled, (state, action:any) => {
                console.log("added Event",action.payload);
                state.events.push(action.payload);
            })
            .addCase(getEventById.fulfilled,(state,action) => {
                console.log(action.payload)
                state.eachEvent = action.payload.data;
            })
            .addCase(addFavorite.fulfilled, (state,action) => {
                console.log("Favorite Event Added")
                // state.favorites.push(action.payload)
            })
            .addCase(getFavorite.fulfilled, (state,action) => {
                console.log("Action", action.payload)
                state.favorites = action.payload?.data;
            })
            .addCase(deleteFavorite.fulfilled, (state,action) => {
                console.log("Favorite Event Deleted");
                // state.favorites = state.favorites.filter(favorite => favorite.eventId !== action.payload.eventId);
            })
            .addCase(deleteEvent.fulfilled, (state,action) => {
                console.log("Event Deleted",action.payload?.eventId);
                state.events = state.events.filter(favorite => favorite.eventId !== action.payload?.eventId);
            })
            .addCase(updateEvent.fulfilled, (state,action) => {
                console.log("Event updated",action.payload);
                state.events = state.events.filter((event)=> event.eventId !== action.payload.eventId )
                state.events.push(action.payload);
            })
    },
});

export const {filteredEvents,addFavoriteItem,removeFavoriteItem,activeNavBarPath} = eventSlice.actions;
export default eventSlice.reducer;