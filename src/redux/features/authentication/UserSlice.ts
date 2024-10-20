import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import customAxios from '../../../components/authentication/customAxios';
import { UserService } from '../../../services/user-service';



const userServices = new UserService();


export interface User {
    userId:string,
    username:string,
    email:string,
    role:string
}

export interface LoginUser{
    userId:string,
    username: string,
    userImageUrl : string,
    role:string
} 

export interface UserState {
    users: User[] | any;
    loginUser: LoginUser  | null;
    loading: boolean;
    error: string | null;
    isUserAlreadyExists: boolean;
}

const initialState: UserState = {
    users: [],
    loginUser:null,
    loading: false,
    error: null,
    isUserAlreadyExists: false
};

export const getUsers = createAsyncThunk<User[], void>(
    'users/getUsers',
    async () => {
        try{
            const response = await userServices.getAllUsers();
            return response;
        }catch(e:any){
            console.log(e.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id:string) =>{
        try{
            const response = await userServices.deleteUser(id)
            return id
        }catch(e){
            console.log(e);
        }
    }
)

export const postUser = createAsyncThunk<User,User>(
    'users/postUser',
    async (user) => {
        try{
            const response = await userServices.addUser(user);
            if(response){
                return response;
            }
        }catch(error:any){
            console.log(error);
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getLoginUser: (state,action) =>{
            state.loginUser = action.payload
        },
        addUserError: (state) =>{
            state.isUserAlreadyExists = false
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action:any) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(postUser.pending, (state,action) =>{
                state.isUserAlreadyExists = false
            })
            .addCase(postUser.fulfilled,(state,action) => {
                if(action.payload){
                    state.isUserAlreadyExists = false
                    state.users.push(action.payload)
                }
                else{
                    state.isUserAlreadyExists = true
                }

            })
            .addCase(deleteUser.fulfilled, (state,action) => {
                // console.log("Removed User");
                const newList = state.users.filter((each:any) => each.userId !== action.payload)
                state.users = newList;
            })
    },
});

export const {getLoginUser,addUserError} = userSlice.actions
export default userSlice.reducer;
