import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {EventService} from "../../../services/event.service";
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
    eventId: string,
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
    loading: boolean;
    error: string | null;
}

const initialState: EventState = {
    events: [],
    loading: false,
    error: null,
};

export const getAllEvents = createAsyncThunk(
    'events/getAllEvents',
    async () => {
        try{
            const response = await EventsService.getAllEvents();
            console.log("Inside Thunk", response)
            return response;
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
            return response;
        }catch(err){
            console.log(err);
        }
    }
  );

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
       filteredEvents : (state,action) =>{
                state.events = action.payload;
            }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEvents.fulfilled, (state, action:any) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(addEvent.fulfilled, (state, action:any) => {
                console.log("added Event")
                state.events.push(action.payload)
            })
    },
});

export const {filteredEvents} = eventSlice.actions;
export default eventSlice.reducer;