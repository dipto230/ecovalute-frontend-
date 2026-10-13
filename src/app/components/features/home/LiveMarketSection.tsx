
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type MarketQuote = {
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
  bid: number | null;
  ask: number | null;
};

type HistoryPoint = {
  symbol: string;
  price: number;
  timestamp: string;
  source?: string;
};

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
  meta?: {
    source?: string;
    currency?: string;
    lastUpdated?: string;
    cacheTtlMs?: number;
  };
};

type TimeRange = "ALL" | "1H" | "1D" | "1W" | "1M";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1"
).replace(/\/+$/, "");

const METALS = [
  {
    symbol: "COPPER",
    name: "Copper",
    short: "CU",
    color: "#c87543",
  },
  {
    symbol: "ALUMINUM",
    name: "Aluminium",
    short: "AL",
    color: "#64748b",
  },
  {
    symbol: "NICKEL",
    name: "Nickel",
    short: "NI",
    color: "#0d9488",
  },
  {
    symbol: "ZINC",
    name: "Zinc",
    short: "ZN",
    color: "#7c6ee6",
  },
  {
    symbol: "GOLD",
    name: "Gold",
    short: "AU",
    color: "#d6a62c",
  },
  {
    symbol: "SILVER",
    name: "Silver",
    short: "AG",
    color: "#647f91",
  },
] as const;

const TIME_RANGES: { label: string; value: TimeRange }[] = [
  { label: "All", value: "ALL" },
  { label: "1H", value: "1H" },
  { label: "1D", value: "1D" },
  { label: "1W", value: "1W" },
  { label: "1M", value: "1M" },
];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function requestJson<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${url}`);
  }

  return (await response.json()) as ApiResponse<T>;
}

function parseQuotes(payload: unknown): MarketQuote[] {
  if (!isObject(payload)) return [];

  const rawData = payload.data;
  let rows: unknown[] = [];

  if (Array.isArray(rawData)) {
    rows = rawData;
  } else if (isObject(rawData) && Array.isArray(rawData.quotes)) {
    rows = rawData.quotes;
  } else if (Array.isArray(payload.quotes)) {
    rows = payload.quotes;
  }

  return rows.filter((item): item is MarketQuote => {
    if (!isObject(item)) return false;

    return (
      typeof item.symbol === "string" &&
      typeof item.name === "string" &&
      Number.isFinite(Number(item.price))
    );
  }).map((item) => ({
    symbol: item.symbol,
    name: item.name,
    price: Number(item.price),
    currency: typeof item.currency === "string" ? item.currency : "USD",
    unit: typeof item.unit === "string" ? item.unit : "metric tonne",
    category:
      typeof item.category === "string" ? item.category : "industrial-metal",
    source: typeof item.source === "string" ? item.source : "Market provider",
    sourceTimestamp:
      typeof item.sourceTimestamp === "string" ? item.sourceTimestamp : "",
    fetchedAt: typeof item.fetchedAt === "string" ? item.fetchedAt : "",
    change: item.change == null ? null : Number(item.change),
    changePercent:
      item.changePercent == null ? null : Number(item.changePercent),
    high: item.high == null ? null : Number(item.high),
    low: item.low == null ? null : Number(item.low),
    bid: item.bid == null ? null : Number(item.bid),
    ask: item.ask == null ? null : Number(item.ask),
  }));
}

function parseHistory(payload: unknown): HistoryPoint[] {
  if (!isObject(payload)) return [];

  const rawData = payload.data;
  let rows: unknown[] = [];

  if (Array.isArray(rawData)) {
    rows = rawData;
  } else if (isObject(rawData) && Array.isArray(rawData.history)) {
    rows = rawData.history;
  } else if (isObject(rawData) && Array.isArray(rawData.points)) {
    rows = rawData.points;
  } else if (Array.isArray(payload.history)) {
    rows = payload.history;
  }

  return rows.filter((item): item is HistoryPoint => {
    if (!isObject(item)) return false;

    return (
      typeof item.symbol === "string" &&
      Number.isFinite(Number(item.price)) &&
      typeof item.timestamp === "string" &&
      Number.isFinite(new Date(item.timestamp).getTime())
    );
  }).map((item) => ({
    symbol: item.symbol,
    price: Number(item.price),
    timestamp: item.timestamp,
    source: typeof item.source === "string" ? item.source : undefined,
  }));
}

function formatPrice(price: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(price);
}

function formatCompactPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(price);
}

function formatTimestamp(timestamp?: string) {
  if (!timestamp) return "Waiting for update";

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) return "Waiting for update";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function filterByRange(points: HistoryPoint[], range: TimeRange) {
  if (range === "ALL" || points.length === 0) return points;

  const durations: Record<Exclude<TimeRange, "ALL">, number> = {
    "1H": 60 * 60 * 1000,
    "1D": 24 * 60 * 60 * 1000,
    "1W": 7 * 24 * 60 * 60 * 1000,
    "1M": 30 * 24 * 60 * 60 * 1000,
  };

  const newestTimestamp = Math.max(
    ...points.map((point) => new Date(point.timestamp).getTime()),
  );

  const cutoff = newestTimestamp - durations[range];

  return points.filter(
    (point) => new Date(point.timestamp).getTime() >= cutoff,
  );
}

function MarketPriceChart({
  points,
  color,
  currency,
}: {
  points: HistoryPoint[];
  color: string;
  currency: string;
}) {
  const chartData = useMemo(
    () =>
      [...points].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() -
          new Date(b.timestamp).getTime(),
      ),
    [points],
  );

  if (chartData.length < 2) {
    return (
      <div className="lm-empty-chart">
        <div className="lm-empty-icon">
          <TrendingUp size={25} />
        </div>
        <strong>
          {chartData.length === 1
            ? "One price point recorded"
            : "Building your market timeline"}
        </strong>
        <p>
          {chartData.length === 1
            ? "Another price snapshot is needed to draw a trend. The chart will update as real market history is collected."
            : "Historical points will appear as the backend collects snapshots. At least two real price points are needed to draw a trend."}
        </p>
      </div>
    );
  }

  const prices = chartData.map((point) => point.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const padding = (maxPrice - minPrice) * 0.15 || maxPrice * 0.002 || 1;
  const isRising = chartData[chartData.length - 1].price >= chartData[0].price;
  const trendColor = isRising ? "#079669" : "#e05260";

  return (
    <div className="lm-chart-canvas">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="lmPriceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={trendColor} stopOpacity={0.23} />
              <stop offset="95%" stopColor={trendColor} stopOpacity={0.015} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#e8efeb"
            strokeDasharray="4 5"
            vertical={false}
          />

          <XAxis
            dataKey="timestamp"
            tickFormatter={(value: string) =>
              new Date(value).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
            tick={{ fill: "#87958d", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            minTickGap={35}
          />

          <YAxis
            orientation="right"
            domain={[minPrice - padding, maxPrice + padding]}
            tickFormatter={formatCompactPrice}
            tick={{ fill: "#87958d", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={55}
          />

          <Tooltip
            labelFormatter={(value) => new Date(String(value)).toLocaleString()}
            formatter={(value) => [
              formatPrice(Number(value), currency),
              "Market price",
            ]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e0eae4",
              boxShadow: "0 8px 24px rgba(16, 42, 32, 0.09)",
              fontSize: 12,
            }}
          />

          <ReferenceLine
            y={chartData[chartData.length - 1].price}
            stroke={trendColor}
            strokeDasharray="5 5"
            strokeOpacity={0.65}
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke={trendColor}
            strokeWidth={2.5}
            fill="url(#lmPriceGradient)"
            dot={
              chartData.length <= 12
                ? {
                    r: 3,
                    fill: trendColor,
                    stroke: "#fff",
                    strokeWidth: 1.5,
                  }
                : false
            }
            activeDot={{
              r: 5,
              fill: trendColor,
              stroke: "#fff",
              strokeWidth: 2,
            }}
            isAnimationActive
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function LiveMarketSection() {
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState("COPPER");
  const [timeRange, setTimeRange] = useState<TimeRange>("ALL");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const loadQuotes = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);

    try {
      const response = await requestJson<unknown>(
        `${API_BASE_URL}/market/quotes`,
      );
      const nextQuotes = parseQuotes(response);

      if (nextQuotes.length === 0) {
        throw new Error("The market API returned no valid quotes.");
      }

      setQuotes(nextQuotes);
      setLastUpdated(
        response.meta?.lastUpdated ||
          nextQuotes[0]?.fetchedAt ||
          new Date().toISOString(),
      );
      setError("");
    } catch (err) {
      console.error("[EcoValuate Market] Quote request failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load market quotes.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const loadHistory = useCallback(async (symbol: string) => {
    try {
      const response = await requestJson<unknown>(
        `${API_BASE_URL}/market/history/${encodeURIComponent(symbol)}?limit=100`,
      );

      const points = parseHistory(response);
      setHistory((previous) => [
        ...previous.filter(
          (point) => point.symbol.toUpperCase() !== symbol.toUpperCase(),
        ),
        ...points,
      ]);
    } catch (err) {
      console.error(
        `[EcoValuate Market] History request failed for ${symbol}:`,
        err,
      );
      setHistory((previous) =>
        previous.filter(
          (point) => point.symbol.toUpperCase() !== symbol.toUpperCase(),
        ),
      );
    }
  }, []);

  useEffect(() => {
    void loadQuotes();

    const interval = window.setInterval(() => {
      void loadQuotes();
    }, 60_000);

    return () => window.clearInterval(interval);
  }, [loadQuotes]);

  useEffect(() => {
    void loadHistory(selectedSymbol);
  }, [selectedSymbol, loadHistory]);

  const selectedQuote = useMemo(
    () =>
      quotes.find(
        (quote) =>
          quote.symbol.trim().toUpperCase() ===
          selectedSymbol.trim().toUpperCase(),
      ) ?? null,
    [quotes, selectedSymbol],
  );

  const selectedMetal = METALS.find(
    (metal) => metal.symbol === selectedSymbol,
  );

  const filteredHistory = useMemo(
    () =>
      filterByRange(
        history.filter(
          (point) =>
            point.symbol.toUpperCase() === selectedSymbol.toUpperCase(),
        ),
        timeRange,
      ),
    [history, selectedSymbol, timeRange],
  );

  const isPositive = (selectedQuote?.changePercent ?? 0) >= 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <section className="lm-section">
      <div className="lm-container">
        <div className="lm-heading-row">
          <div>
            <div className="lm-eyebrow">
              <span className="lm-live-dot" />
              REAL-TIME COMMODITY TRACKER
            </div>
            <h2 className="lm-main-heading">
              E-waste <span>recovery market</span>
            </h2>
            <p className="lm-subtitle">
              Track metal prices to understand the value behind electronic
              waste.
            </p>
          </div>

          <button
            type="button"
            className="lm-refresh-button"
            onClick={() => void loadQuotes(true)}
            disabled={refreshing}
          >
            <RefreshCw
              size={15}
              className={refreshing ? "lm-spin" : ""}
            />
            {refreshing ? "Updating..." : "Refresh prices"}
          </button>
        </div>

        {error && quotes.length === 0 && (
          <div className="lm-error">
            <strong>Market data unavailable</strong>
            <p>{error}</p>
            <button type="button" onClick={() => void loadQuotes(true)}>
              Try again
            </button>
          </div>
        )}

        <div className="lm-metal-grid">
          {METALS.map((metal) => {
            const quote = quotes.find(
              (item) => item.symbol === metal.symbol,
            );
            const positive = (quote?.changePercent ?? 0) >= 0;
            const ChangeIcon = positive ? ArrowUpRight : ArrowDownRight;
            const selected = selectedSymbol === metal.symbol;

            return (
              <button
                type="button"
                key={metal.symbol}
                className={`lm-metal-card ${selected ? "lm-metal-card-selected" : ""}`}
                onClick={() => setSelectedSymbol(metal.symbol)}
                style={{ "--metal-color": metal.color } as React.CSSProperties}
              >
                <div className="lm-metal-top">
                  <div className="lm-metal-identity">
                    <span className="lm-metal-symbol">{metal.short}</span>
                    <span className="lm-metal-name">{metal.name}</span>
                  </div>
                  {quote?.changePercent != null && (
                    <span
                      className={`lm-change-pill ${positive ? "lm-positive" : "lm-negative"}`}
                    >
                      <ChangeIcon size={13} />
                      {Math.abs(quote.changePercent).toFixed(2)}%
                    </span>
                  )}
                </div>

                <div className="lm-metal-price">
                  {loading && !quote
                    ? "Loading..."
                    : quote
                      ? formatPrice(quote.price, quote.currency)
                      : "Unavailable"}
                </div>

                <div className="lm-metal-bottom">
                  <span>Per {quote?.unit || "unit"}</span>
                  <span className="lm-view-chart">
                    View chart <ArrowRight size={14} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lm-chart-card">
          <div className="lm-chart-header">
            <div className="lm-chart-title-block">
              <div className="lm-eyebrow">PRICE TRACKER</div>
              <h3>
                {selectedMetal?.name || selectedSymbol}{" "}
                <span>price history</span>
              </h3>
              <p>
                {filteredHistory.length} recorded price{" "}
                {filteredHistory.length === 1 ? "point" : "points"}
              </p>
            </div>

            <div className="lm-current-price">
              <span className="lm-current-label">Latest quote</span>
              <strong>
                {selectedQuote
                  ? formatPrice(
                      selectedQuote.price,
                      selectedQuote.currency,
                    )
                  : "—"}
              </strong>
              {selectedQuote?.changePercent != null && (
                <span
                  className={`lm-current-change ${isPositive ? "lm-positive-text" : "lm-negative-text"}`}
                >
                  <TrendIcon size={15} />
                  {isPositive ? "+" : ""}
                  {selectedQuote.changePercent.toFixed(2)}%
                </span>
              )}
            </div>
          </div>

          <div className="lm-chart-toolbar">
            <div className="lm-chart-legend">
              <span
                className="lm-legend-dot"
                style={{
                  backgroundColor: selectedMetal?.color || "#0d9488",
                }}
              />
              <span>{selectedMetal?.name || selectedSymbol}</span>
              <span className="lm-legend-divider">·</span>
              <span>{selectedQuote?.currency || "USD"}</span>
            </div>

            <div className="lm-time-filters">
              {TIME_RANGES.map((range) => (
                <button
                  type="button"
                  key={range.value}
                  className={
                    timeRange === range.value ? "lm-range-active" : ""
                  }
                  onClick={() => setTimeRange(range.value)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lm-chart-area">
            <MarketPriceChart
              points={filteredHistory}
              color={selectedMetal?.color || "#0d9488"}
              currency={selectedQuote?.currency || "USD"}
            />
          </div>

          <div className="lm-chart-footer">
            <span>
              <span className="lm-live-dot" />
              Source: {selectedQuote?.source || "Metals.Dev"}
            </span>
            <span>
              <Clock3 size={13} />
              Updated: {formatTimestamp(selectedQuote?.fetchedAt || lastUpdated)}
            </span>
          </div>
        </div>

        <div className="lm-disclaimer">
          <div className="lm-disclaimer-icon">
            <Activity size={19} />
          </div>
          <div>
            <strong>Market reference prices</strong>
            <p>
              These are commodity reference prices, not guaranteed resale
              prices for e-waste. Actual recovery value depends on material
              composition, purity, recovery yield, processing costs, and local
              market conditions.
            </p>
          </div>
          <a href="/price-estimation">
            Estimate material value <ArrowRight size={15} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .lm-section {
          padding: 64px 24px;
          background:
            radial-gradient(ellipse at 0% 0%, rgba(16, 185, 129, 0.055), transparent 36%),
            #f8fbf9;
          color: #123b2d;
        }

        .lm-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }

        .lm-heading-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 28px;
        }

        .lm-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #07835c;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .lm-live-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          flex: 0 0 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.11);
        }

        .lm-main-heading {
          margin: 13px 0 8px;
          color: #123b2d;
          font-size: clamp(26px, 3vw, 38px);
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: -1.3px;
        }

        .lm-main-heading span,
        .lm-chart-title-block h3 span {
          color: #809188;
          font-weight: 500;
        }

        .lm-subtitle {
          margin: 0;
          color: #819087;
          font-size: 14px;
          line-height: 1.7;
        }

        .lm-refresh-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 12px 16px;
          border: 1px solid #dceae2;
          border-radius: 12px;
          background: #fff;
          color: #087a56;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          white-space: nowrap;
        }

        .lm-refresh-button:hover {
          background: #f0faf4;
          border-color: #a6dbc0;
        }

        .lm-refresh-button:disabled {
          cursor: wait;
          opacity: 0.7;
        }

        .lm-spin {
          animation: lm-spin 0.8s linear infinite;
        }

        @keyframes lm-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .lm-metal-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .lm-metal-card {
          min-width: 0;
          padding: 22px;
          text-align: left;
          border: 1px solid #e0ebe4;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.96);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          color: inherit;
        }

        .lm-metal-card:hover {
          transform: translateY(-3px);
          border-color: var(--metal-color);
          box-shadow: 0 12px 28px rgba(15, 58, 39, 0.06);
        }

        .lm-metal-card-selected {
          border-color: var(--metal-color);
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--metal-color) 12%, transparent);
        }

        .lm-metal-top,
        .lm-metal-identity,
        .lm-metal-bottom,
        .lm-change-pill {
          display: flex;
          align-items: center;
        }

        .lm-metal-top,
        .lm-metal-bottom {
          justify-content: space-between;
          gap: 10px;
        }

        .lm-metal-identity {
          gap: 10px;
          min-width: 0;
        }

        .lm-metal-symbol {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          flex: 0 0 36px;
          border-radius: 11px;
          background: color-mix(in srgb, var(--metal-color) 11%, white);
          color: var(--metal-color);
          font-size: 11px;
          font-weight: 800;
        }

        .lm-metal-name {
          color: #566b60;
          font-size: 13px;
          font-weight: 700;
        }

        .lm-change-pill {
          gap: 2px;
          padding: 5px 7px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 800;
          white-space: nowrap;
        }

        .lm-positive {
          background: #e9f8f0;
          color: #07835c;
        }

        .lm-negative {
          background: #fff0f0;
          color: #d74754;
        }

        .lm-metal-price {
          overflow-wrap: anywhere;
          margin: 23px 0 20px;
          color: #123b2d;
          font-size: clamp(21px, 2.1vw, 29px);
          font-weight: 800;
          letter-spacing: -0.8px;
          font-variant-numeric: tabular-nums;
        }

        .lm-metal-bottom {
          padding-top: 14px;
          border-top: 1px solid #edf2ee;
          color: #8b9a91;
          font-size: 10px;
        }

        .lm-view-chart {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #087a56;
          font-size: 10px;
          font-weight: 800;
        }

        .lm-chart-card {
          overflow: hidden;
          padding: 28px 30px 0;
          border: 1px solid #e0ebe4;
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 15px 40px rgba(15, 58, 39, 0.035);
        }

        .lm-chart-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .lm-chart-title-block h3 {
          margin: 12px 0 7px;
          color: #123b2d;
          font-size: clamp(21px, 2.5vw, 28px);
          font-weight: 800;
          letter-spacing: -0.9px;
        }

        .lm-chart-title-block p {
          margin: 0;
          color: #8b9a91;
          font-size: 12px;
        }

        .lm-current-price {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 7px;
          text-align: right;
        }

        .lm-current-label {
          color: #8b9a91;
          font-size: 11px;
        }

        .lm-current-price strong {
          color: #123b2d;
          font-size: clamp(21px, 2.4vw, 29px);
          font-weight: 800;
          letter-spacing: -0.8px;
          font-variant-numeric: tabular-nums;
        }

        .lm-current-change {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 12px;
          font-weight: 800;
        }

        .lm-positive-text {
          color: #079669;
        }

        .lm-negative-text {
          color: #e05260;
        }

        .lm-chart-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 24px;
          padding: 15px 0;
          border-top: 1px solid #edf2ee;
          border-bottom: 1px solid #edf2ee;
        }

        .lm-chart-legend {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #718178;
          font-size: 11px;
          font-weight: 600;
        }

        .lm-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .lm-legend-divider {
          color: #c4d0c8;
        }

        .lm-time-filters {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px;
          border: 1px solid #eaf0eb;
          border-radius: 10px;
          background: #f8faf8;
        }

        .lm-time-filters button {
          padding: 7px 11px;
          border: 0;
          border-radius: 7px;
          background: transparent;
          color: #819087;
          font-size: 10px;
          font-weight: 800;
          cursor: pointer;
        }

        .lm-time-filters button:hover {
          color: #087a56;
        }

        .lm-time-filters button.lm-range-active {
          background: #fff;
          color: #087a56;
          box-shadow: 0 1px 5px rgba(15, 58, 39, 0.09);
        }

        .lm-chart-area {
          height: 300px;
          padding: 18px 0 8px;
        }

        .lm-chart-canvas {
          width: 100%;
          height: 100%;
          min-width: 0;
        }

        .lm-empty-chart {
          display: flex;
          width: 100%;
          height: 100%;
          min-height: 210px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          text-align: center;
        }

        .lm-empty-icon {
          display: grid;
          place-items: center;
          width: 52px;
          height: 52px;
          margin-bottom: 15px;
          border: 1px solid #d9efe2;
          border-radius: 16px;
          background: #f0faf4;
          color: #079669;
        }

        .lm-empty-chart strong {
          color: #234b39;
          font-size: 13px;
        }

        .lm-empty-chart p {
          max-width: 420px;
          margin: 10px 0 0;
          color: #89988f;
          font-size: 12px;
          line-height: 1.8;
        }

        .lm-chart-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          min-height: 48px;
          border-top: 1px solid #edf2ee;
          color: #8b9a91;
          font-size: 10px;
        }

        .lm-chart-footer > span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .lm-disclaimer {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 24px;
          padding: 22px 24px;
          border: 1px solid #dceee3;
          border-radius: 18px;
          background: linear-gradient(115deg, #effaf3, #fbfdfb);
        }

        .lm-disclaimer-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          border: 1px solid #dceee3;
          border-radius: 13px;
          background: white;
          color: #07835c;
        }

        .lm-disclaimer > div:nth-child(2) {
          flex: 1;
          min-width: 0;
        }

        .lm-disclaimer strong {
          color: #234b39;
          font-size: 12px;
        }

        .lm-disclaimer p {
          margin: 5px 0 0;
          color: #71877a;
          font-size: 11px;
          line-height: 1.7;
        }

        .lm-disclaimer a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #087a56;
          font-size: 11px;
          font-weight: 800;
          text-decoration: none;
          white-space: nowrap;
        }

        .lm-disclaimer a:hover {
          color: #045c40;
        }

        .lm-error {
          margin-bottom: 20px;
          padding: 18px;
          border: 1px solid #f5caca;
          border-radius: 14px;
          background: #fff6f6;
          color: #9f303b;
        }

        .lm-error p {
          margin: 8px 0;
          font-size: 12px;
        }

        .lm-error button {
          padding: 8px 12px;
          border: 1px solid #efb8bd;
          border-radius: 8px;
          background: white;
          color: #9f303b;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .lm-metal-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lm-chart-card {
            padding: 23px 22px 0;
          }

          .lm-disclaimer {
            flex-wrap: wrap;
          }

          .lm-disclaimer > div:nth-child(2) {
            flex-basis: calc(100% - 60px);
          }

          .lm-disclaimer a {
            margin-left: 57px;
          }
        }

        @media (max-width: 600px) {
          .lm-section {
            padding: 42px 15px;
          }

          .lm-heading-row {
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
          }

          .lm-main-heading {
            font-size: 27px;
          }

          .lm-metal-grid {
            gap: 10px;
          }

          .lm-metal-card {
            padding: 14px;
            border-radius: 15px;
          }

          .lm-metal-symbol {
            width: 30px;
            height: 30px;
            flex-basis: 30px;
          }

          .lm-metal-identity {
            gap: 7px;
          }

          .lm-metal-name {
            font-size: 11px;
          }

          .lm-change-pill {
            padding: 4px;
            font-size: 9px;
          }

          .lm-metal-price {
            margin: 19px 0 15px;
            font-size: 19px;
          }

          .lm-metal-bottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }

          .lm-chart-card {
            padding: 20px 14px 0;
            border-radius: 18px;
          }

          .lm-chart-header {
            flex-direction: column;
            gap: 17px;
          }

          .lm-current-price {
            align-items: flex-start;
            text-align: left;
          }

          .lm-chart-toolbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .lm-time-filters {
            width: 100%;
            justify-content: space-between;
          }

          .lm-time-filters button {
            padding: 7px 9px;
          }

          .lm-chart-area {
            height: 245px;
          }

          .lm-chart-footer {
            padding: 12px 0;
          }

          .lm-disclaimer {
            padding: 17px;
          }

          .lm-disclaimer a {
            margin-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
