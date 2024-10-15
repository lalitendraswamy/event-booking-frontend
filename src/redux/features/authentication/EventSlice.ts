import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface Event {
    id: number;
    title: string;
    image: string;
}

interface EventState {
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
            const response = await axios.get('http://10.0.0.72:5000/events');
            return response.data;
        }catch(err){
            console.log(err)
        }
    }
  );

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEvents.fulfilled, (state, action:any) => {
                state.loading = false;
                state.events = action.payload;
            })
    },
});

export default eventSlice.reducer;