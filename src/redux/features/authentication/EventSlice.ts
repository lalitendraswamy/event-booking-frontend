import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {EventService} from "../../../services/event.service";
import customAxios from '../../../components/authentication/customAxios';
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
    eachEvent: Event | []
    loading: boolean;
    error: string | null;
    favorites:Event[] ;
}

const initialState: EventState = {
    events: [],
    eachEvent : [],
    loading: false,
    error: null,
    favorites:[]
};

export const getAllEvents = createAsyncThunk(
    'events/getAllEvents',
    async () => {
        try{
            const response = await EventsService.getAllEvents();
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


export const getEventById = createAsyncThunk(
    "events/getEventById",
    async (id:string) => {
        try{
            const response = await customAxios.get(`/events/get/${id}`);
            return response.data

        }catch(e){
            console.log(e)
        }
    }
)

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
       filteredEvents : (state,action) =>{
                state.events = action.payload;
            },
        addFavoriteItem:(state,action)=>{
            let data:any = state.favorites.find(favorite => favorite.eventId === action.payload.eventId);
            if(!data){
            state.favorites.push(action.payload);
            }
        },
        removeFavoriteItem: (state, action) => {
            state.favorites = state.favorites.filter(favorite => favorite.eventId !== action.payload);
        }
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEvents.fulfilled, (state, action:any) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(addEvent.fulfilled, (state, action:any) => {
                console.log("added Event");
                state.events.push(action.payload);
            })
            .addCase(getEventById.fulfilled,(state,action) => {
                    state.eachEvent = action.payload

            })
    },
});

export const {filteredEvents,addFavoriteItem,removeFavoriteItem} = eventSlice.actions;
export default eventSlice.reducer;