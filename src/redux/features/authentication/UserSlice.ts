import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {UserService} from "../../../services/user-service";

const userServices = new UserService();

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
            const response = await userServices.getAllUsers();
            return response;
        }catch(e:any){
            console.log(e.message);
        }
    }
);

export const postUser = createAsyncThunk<User,User>(
    'users/postUser',
    async (user) => {
        try{
            const response = await userServices.addUser(user);
            return response;
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
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action:any) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(postUser.fulfilled,(state,action) => {
                state.users.push(action.payload)

            })
    },
});

export const {getLoginUser} = userSlice.actions
export default userSlice.reducer;
