"use server"
import {httpClient} from "@/lib/axios/httpClient"
import { IVendor } from "../types/vendor.types"


export const getVendors = async()=>{
    const vendors = await httpClient.get<IVendor[]>("/vendors");
    return vendors;
}