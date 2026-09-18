import { httpClient } from "@/lib/axios/httpClient"

export const getVendors = async () => {
    const vendors = await httpClient.get('/vendors');
    return vendors
}