
const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1"
).replace(/\/+$/, "");

export interface MarketQuote {
  symbol: string;
  name: string;
  price: number;
  currency: string;
  unit: string;
  category: string;
  source: string;
  sourceTimestamp: string;
  fetchedAt: string;
  change: number | null;
  changePercent: number | null;
  high: number | null;
  low: number | null;
}

export interface MarketHistoryPoint {
  symbol: string;
  price: number;
  timestamp: string;
  source?: string;
}

async function requestMarket<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/market${path}`, {
    method: "GET",
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Market API failed (${response.status})`);
  }

  const result = await response.json();

  if (result?.success === false) {
    throw new Error(result.message || "Market request failed");
  }

  return result as T;
}

function unwrapQuotes(result: unknown): MarketQuote[] {
  const body = result as {
    data?: unknown;
    quotes?: unknown;
  };

  const data = body?.data as {
    quotes?: unknown;
  } | undefined;

  const quotes = Array.isArray(body?.quotes)
    ? body.quotes
    : Array.isArray(data?.quotes)
      ? data.quotes
      : Array.isArray(body?.data)
        ? body.data
        : [];

  return quotes.filter(
    (item): item is MarketQuote =>
      !!item &&
      typeof item === "object" &&
      typeof (item as MarketQuote).symbol === "string" &&
      Number.isFinite(Number((item as MarketQuote).price)),
  ).map((item) => ({
    ...item,
    price: Number(item.price),
    change: item.change == null ? null : Number(item.change),
    changePercent:
      item.changePercent == null
        ? null
        : Number(item.changePercent),
  }));
}

export async function getMarketQuotes(): Promise<MarketQuote[]> {
  const result = await requestMarket<unknown>("/quotes");
  return unwrapQuotes(result);
}

export async function getMarketHistory(
  symbol: string,
  limit = 100,
): Promise<MarketHistoryPoint[]> {
  const result = await requestMarket<unknown>(
    `/history/${encodeURIComponent(symbol)}?limit=${limit}`,
  );

  const body = result as {
    data?: unknown;
    history?: unknown;
  };

  const data = body?.data as {
    history?: unknown;
    points?: unknown;
  } | undefined;

  const points = Array.isArray(body?.history)
    ? body.history
    : Array.isArray(data?.history)
      ? data.history
      : Array.isArray(data?.points)
        ? data.points
        : Array.isArray(body?.data)
          ? body.data
          : [];

  return points.filter(
    (item): item is MarketHistoryPoint =>
      !!item &&
      typeof item === "object" &&
      Number.isFinite(Number((item as MarketHistoryPoint).price)) &&
      typeof (item as MarketHistoryPoint).timestamp === "string",
  ).map((item) => ({
    ...item,
    price: Number(item.price),
  }));
}
