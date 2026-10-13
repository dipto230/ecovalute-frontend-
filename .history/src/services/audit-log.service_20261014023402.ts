
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface IAuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  createdAt: string;
}

export interface IAuditLogMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IAuditLogsResult {
  data: IAuditLog[];
  meta: IAuditLogMeta;
}

interface IApiResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
  meta?: IAuditLogMeta;
}

export const getMyAuditLogs = async (
  page = 1,
  limit = 5
): Promise<IAuditLogsResult> => {
  const response = await axios.get<IApiResponse>(
    `${API_BASE_URL}/audit-logs/my-logs`,
    {
      params: {
        page,
        limit,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
      withCredentials: true,
    }
  );

  const body = response.data;

  // Supports both:
  // { data: [...], meta: {...} }
  // { data: { data: [...], meta: {...} } }
  const nested = body.data as
    | { data?: IAuditLog[]; meta?: IAuditLogMeta }
    | IAuditLog[]
    | undefined;

  const logs = Array.isArray(nested)
    ? nested
    : nested?.data ?? [];

  const meta = Array.isArray(nested)
    ? body.meta
    : nested?.meta ?? body.meta;

  return {
    data: logs,
    meta: meta ?? {
      page,
      limit,
      total: logs.length,
      totalPages: logs.length > 0 ? 1 : 0,
    },
  };
};
