"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { IAdminDashboardData } from "../types/dashboard.types"

export async function getDashboardData() {
    try {
        const response = await httpClient.get<IAdminDashboardData>()
    } catch (error: any) {
        
    }
}