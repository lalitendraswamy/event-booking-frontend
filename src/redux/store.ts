import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/authentication/UserSlice'; 
import eventSlice from "./features/authentication/EventSlice";

const store = configureStore({
    reducer: {
        users: userSlice,
        events: eventSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
