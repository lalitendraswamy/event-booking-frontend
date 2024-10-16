import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
    userId:string,
    username:string,
    email:string,
    role:string
}

export interface UserState {
    users: User[];
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    user:null,
    loading: false,
    error: null,
};

export const getUsers = createAsyncThunk<User[], void>(
    'users/getUsers',
    async () => {
        try{
            const response = await axios.get('http://localhost:5000/users');
            return response.data;
        }catch(e){
            console.log(e);
        }
    }
);

export const postUser = createAsyncThunk<User,User>(
    'users/postUser',
    async (user,{rejectWithValue}) => {
        try{
            const response = await axios.post("http://localhost:5000/users",user);
            return response.data
        }catch(error:any){
            console.log(error);
            // return e 
            return rejectWithValue(
                error.response ? error.response.data : "Something went wrong"
            );
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action:any) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(postUser.fulfilled,(state,action) => {
                console.log("added User")
                state.users.push(action.payload)

            })
    },
});

export default userSlice.reducer;
