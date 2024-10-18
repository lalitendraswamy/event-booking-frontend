import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    orders: [],
    loading: false,
    error: null,
};

const orderSlice= createSlice({
    name:'orders',
    initialState,
    reducers:{
        getAllOrders:(state,action)=>{
            state.orders=action.payload;
        },
        postOrder:(state,action)=>{
              state.orders= [...state.orders,action.payload]  
        },
        cancelOrder:(state,action)=>{
            // console.log(action.payload)
            state.orders= state.orders.filter((order :any)=> order.bookingId!==action.payload)
        }
    }
});


export const {getAllOrders,postOrder,cancelOrder}=orderSlice.actions;
export default orderSlice.reducer;