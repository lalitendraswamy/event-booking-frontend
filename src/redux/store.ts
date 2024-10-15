import { configureStore } from '@reduxjs/toolkit';
import userSlice from './UserSlice'; 
import eventSlice from "./EventSlice";

const store = configureStore({
    reducer: {
        users: userSlice,
        events: eventSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
