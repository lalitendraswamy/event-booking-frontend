import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customAxios from "../../../components/authentication/customAxios";

const initialState: any = {
    orders: [],
    loading: false,
    error: null,
};


export const createOrder = createAsyncThunk(
    "orders/post",
    async(orderData:any) =>{
            try{
                const response = await customAxios.post("/ticket-booking", orderData);
                console.log("Post Order", response.data)
                return response.data;
            }catch(e){
                console.log(e);
            }
    }
)

export const getOrders = createAsyncThunk(
    "order/get",
    async() => {
        try{
            const response = await customAxios.get("/ticket-booking");
            console.log("Get All Orders", response.data);
            return response.data
        }catch(e){
            console.log(e);
        }
    }
)

export const deleteOrder = createAsyncThunk(
    "order/delete",
    async(id:string) => {
        try{
            const response = await customAxios.delete(`/ticket-booking/${id}`);
            return id;
        }catch(e){
            console.log(e)
        }
    }
)


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
    },
    extraReducers:(builder) =>{
        builder
            .addCase(createOrder.fulfilled, (state,action:any) =>{
                console.log("Order Created");
            })
            .addCase(getOrders.fulfilled, (state,action) =>{
                state.orders = action.payload
            })
            .addCase(deleteOrder.fulfilled, (state,action) =>{
                console.log("Cancelled Order");
                state.orders= state.orders.filter((order :any)=> order.bookingId!==action.payload)
            })
    }
});


export const {getAllOrders,postOrder,cancelOrder}=orderSlice.actions;
export default orderSlice.reducer;