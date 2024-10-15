import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

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

// export const fetchEvents = createAsyncThunk<Event[], void>(
//     'events/fetchEvents',
//     async () => {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with your events API
//         return response.json();
//     }
// );

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
       
    },

    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchEvents.fulfilled, (state, action:any) => {
    //             state.loading = false;
    //             state.events = action.payload;
    //         })
    // },
});

export default eventSlice.reducer;