import axios from "axios";
import customAxios from "../components/authentication/customAxios";


export class PaymentService{
    constructor(){}

    goToCheckout=async(orderDetails:any)=>{
        try{
            console.log('orders',orderDetails)
            
            const response= await customAxios.post('/ticket-booking/checkout',orderDetails);
            return response.data

        }catch(error){
            return error;
        }
    }




}