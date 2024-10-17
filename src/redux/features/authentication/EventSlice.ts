import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import customAxios from '../../../components/authentication/customAxios';

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
}

const initialState: EventState = {
    events: [],
    eachEvent : [],
    loading: false,
    error: null,
};

export const getAllEvents = createAsyncThunk(
    'events/getAllEvents',
    async () => {
        try{
            const response = await customAxios.get('/events');
            return response.data;
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
            }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEvents.fulfilled, (state, action:any) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(getEventById.fulfilled,(state,action) => {
                    state.eachEvent = action.payload
            })
    },
});

export const {filteredEvents} = eventSlice.actions;
export default eventSlice.reducer;