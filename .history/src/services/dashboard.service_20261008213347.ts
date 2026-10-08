"use server"

import { httpClient } from "@/lib/axios/httpClient"

export async function getDashboardData() {
    try {
        const response = await httpClient.get<IAdminDashboardData>
    } catch (error: any) {
        
    }
}