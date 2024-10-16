import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/authentication/UserSlice'; 
import eventSlice from "./features/authentication/EventSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistConfig = {
    key:"root",
    storage
}

const persistedUserSlice = persistReducer(persistConfig, userSlice)


const store = configureStore({
    reducer: {
        users: persistedUserSlice,
        events: eventSlice
    },
}); 

export const persistor = persistStore(store);
export default store;
