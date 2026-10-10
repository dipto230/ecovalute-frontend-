"use server"
import {httpClient} from "@/lib/axios/httpClient"
import { IVendor } from "../types/vendor.types"


export const getVendors = async()=>{
  try{
    

  }catch(error){
    console.log("Error fetching vendors:", error);
    throw error;
  }
}