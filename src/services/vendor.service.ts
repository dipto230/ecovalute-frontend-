"use server"
import {httpClient} from "@/lib/axios/httpClient"
import { IVendor } from "../types/vendor.types"


export const getVendors = async()=>{
  try{
      const vendors = await httpClient.get<IVendor[]>("/vendors");
    return vendors;

  }catch(error){
    console.log("Error fetching vendors:", error);
    throw error;
  }
}