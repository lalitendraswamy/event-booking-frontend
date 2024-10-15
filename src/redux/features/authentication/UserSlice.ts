import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

// export const fetchUsers = createAsyncThunk<User[], void>(
//     'users/fetchUsers',
//     async () => {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
//         return response.json();
//     }
// );

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchUsers.fulfilled, (state, action:any) => {
    //             state.loading = false;
    //             state.users = action.payload;
    //         })
    // },
});

export default userSlice.reducer;
