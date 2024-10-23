import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import customAxios from '../../../components/authentication/customAxios';
import { UserService } from '../../../services/user-service';

const userServices = new UserService();

export interface User {
    statusCode: string | number;
    userId: string;
    username: string;
    email: string;
    role: string;
}

export interface LoginUser {
    userId: string;
    username: string;
    userImageUrl: string;
    role: string;
}

export interface UserState {
    users: User[] | any;
    loginUser: LoginUser | null|string;
    loading: boolean;
    error: string | null;
    isUserAlreadyExists: boolean;
    addUserResponse:any;
}

const initialState: UserState = {
    users: [],
    loginUser: "",
    loading: false,
    error: null,
    isUserAlreadyExists: false,
    addUserResponse:"",
};

export const getUsers = createAsyncThunk<any>(
    'users/getUsers',
    async () => {
        try {
            const response = await userServices.getAllUsers();
            return response; // Ensure this returns the correct type
        } catch (e: any) {
            
            return Promise.reject(e); // Reject on error
        }
    }
);

export const deleteUser = createAsyncThunk<string, string>(
    "users/deleteUser",
    async (id: string) => {
        try {
            await userServices.deleteUser(id);
            return id; // Return id directly on success
        } catch (e) {          
            return Promise.reject(e); // Reject on error
        }
    }
);

export const postUser = createAsyncThunk<User, User>(
    'users/postUser',
    async (userData) => {
        try {
            const response = await customAxios.post("/users", userData);
          
            return response.data; // Return the actual user data
        } catch (error: any) {
           
            return Promise.reject(error); // Reject on error
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getLoginUser: (state, action) => {
            state.loginUser = action.payload;
        },
        addUserError: (state) => {
            state.isUserAlreadyExists = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                
                state.users = action.payload.data; // Assuming payload is already in correct format
            })
            // .addCase(postUser.pending, (state) => {
            //     state.isUserAlreadyExists = false;
            // })
            .addCase(postUser.fulfilled, (state, action) => {
                if (action.payload) {
                 

                    state.isUserAlreadyExists = false;
                    state.addUserResponse= action.payload.statusCode; // Add the new user
                } else {
                    state.isUserAlreadyExists = true;
                    state.addUserResponse= undefined;
                }
            })
            .addCase(postUser.rejected, (state, action) => {
                state.isUserAlreadyExists = true;
                state.addUserResponse= undefined;
                
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const newList = state.users.filter((user: User) => user.userId !== action.payload);
                state.users = newList;
            });
    },
});

export const { getLoginUser, addUserError } = userSlice.actions;
export default userSlice.reducer;
