import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import customAxios from '../../../components/authentication/customAxios';


export interface User {
    userId:string,
    username:string,
    email:string,
    role:string
}

export interface LoginUser{
    username: string,
    userImageUrl : string,
    role:string
}

export interface UserState {
    users: User[] | any;
    loginUser: LoginUser  | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loginUser:null,
    loading: false,
    error: null,
};

export const getUsers = createAsyncThunk<User[], void>(
    'users/getUsers',
    async () => {
        try{
            const response = await customAxios.get('/users');
            // console.log("Response data", response.data)
            return response.data;
        }catch(e:any){
            console.log(e.message);
        }
    }
);

export const postUser = createAsyncThunk<User,User>(
    'users/postUser',
    async (user,{rejectWithValue}) => {
        try{
            const response = await customAxios.post("/users",user);
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
    reducers: {
        getLoginUser: (state,action) =>{
            state.loginUser = action.payload
        }

    },
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

export const {getLoginUser} = userSlice.actions
export default userSlice.reducer;
