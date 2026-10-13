
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
  Wifi,
} from "lucide-react";

import {
  getMarketHistory,
  getMarketQuotes,
  type MarketHistoryPoint,
  type MarketQuote,
} from "@/src/services/market.service";

import "./live-market.css";

const REFRESH_INTERVAL = 60_000;

const METAL_ORDER = [
  "COPPER",
  "SILVER",
  "GOLD",
  "ALUMINUM",
  "NICKEL",
  "ZINC",
];

const METAL_COLORS: Record<string, string> = {
  COPPER: "#c87948",
  SILVER: "#94a3b8",
  GOLD: "#eab308",
  ALUMINUM: "#64748b",
  NICKEL: "#22a06b",
  ZINC: "#0d9488",
};

const formatPrice = (price: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 4,
    minimumFractionDigits: 2,
  }).format(price);

const formatTime = (date?: string) => {
  if (!date) return "Waiting for update";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Time unavailable";

  return parsed.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

function Sparkline({
  points,
  color,
}: {
  points: number[];
  color: string;
}) {
  const values = points.filter(Number.isFinite);

  if (values.length < 2) {
    return (
      <div className="market-spark-empty">
        Collecting price history...
      </div>
    );
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const coordinates = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 34 - ((value - min) / range) * 28;
      return `${x},${y}`;
    })
    .join(" ");

  const last = coordinates.split(" ").at(-1);

  return (
    <svg
      className="market-sparkline"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      role="img"
      aria-label="Collected price history chart"
    >
      <polyline
        points={coordinates}
        fill="none"
        stroke={color}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {last && (
        <circle
          cx={Number(last.split(",")[0])}
          cy={Number(last.split(",")[1])}
          r="2.2"
          fill={color}
        />
      )}
    </svg>
  );
}

export default function LiveMarketSection() {
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [history, setHistory] = useState<MarketHistoryPoint[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState("COPPER");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const loadQuotes = useCallback(async (quiet = false) => {
    if (quiet) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await getMarketQuotes();

      setQuotes(
        [...data].sort((a, b) => {
          const aIndex = METAL_ORDER.indexOf(a.symbol.toUpperCase());
          const bIndex = METAL_ORDER.indexOf(b.symbol.toUpperCase());
          return (
            (aIndex === -1 ? 999 : aIndex) -
            (bIndex === -1 ? 999 : bIndex)
          );
        }),
      );

      setLastUpdated(new Date().toISOString());
      setError("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load market prices.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadQuotes();

    const interval = window.setInterval(() => {
      void loadQuotes(true);
    }, REFRESH_INTERVAL);

    return () => window.clearInterval(interval);
  }, [loadQuotes]);

  useEffect(() => {
    let cancelled = false;

    getMarketHistory(selectedSymbol, 100)
      .then((points) => {
        if (!cancelled) setHistory(points);
      })
      .catch(() => {
        if (!cancelled) setHistory([]);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedSymbol, quotes]);

  const selectedQuote = useMemo(
    () =>
      quotes.find(
        (quote) =>
          quote.symbol.toUpperCase() === selectedSymbol,
      ),
    [quotes, selectedSymbol],
  );

  const selectedHistory = useMemo(() => {
    const points = history
      .filter((point) => point.symbol.toUpperCase() === selectedSymbol)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() -
          new Date(b.timestamp).getTime(),
      );

    if (points.length > 0) {
      return points.map((point) => point.price);
    }

    return selectedQuote ? [selectedQuote.price] : [];
  }, [history, selectedQuote, selectedSymbol]);

  const positive =
    selectedQuote?.changePercent != null
      ? selectedQuote.changePercent >= 0
      : null;

  return (
    <section className="live-market-section" id="live-market">
      <div className="live-market-container">
        <div className="market-heading-row">
          <div className="market-heading-copy">
            <div className="market-eyebrow">
              <span className="market-eyebrow-dot" />
              ECOVALUATE MARKET INTELLIGENCE
            </div>

            <h2>
              E-waste materials.
              <br />
              <span>Real market signals.</span>
            </h2>

            <p>
              Track precious and industrial metal prices to better
              understand the value behind electronic waste recovery.
            </p>
          </div>

          <div className="market-heading-actions">
            <div className="market-live-badge">
              <span className="market-pulse" />
              LIVE PRICE FEED
            </div>

            <button
              type="button"
              className="market-refresh-button"
              onClick={() => void loadQuotes(true)}
              disabled={refreshing}
            >
              <RefreshCw
                size={15}
                className={refreshing ? "market-spin" : ""}
              />
              {refreshing ? "Updating" : "Refresh"}
            </button>
          </div>
        </div>

        {error && (
          <div className="market-error" role="alert">
            <Activity size={18} />
            <div>
              <strong>Market feed unavailable</strong>
              <p>{error}</p>
              <button
                type="button"
                onClick={() => void loadQuotes()}
              >
                Try again
              </button>
            </div>
          </div>
        )}

        <div className="market-summary-strip">
          <div className="market-summary-item">
            <span className="market-summary-icon">
              <Activity size={18} />
            </span>
            <div>
              <span className="market-summary-label">
                Tracked materials
              </span>
              <strong>{quotes.length.toString().padStart(2, "0")}</strong>
            </div>
          </div>

          <div className="market-summary-item">
            <span className="market-summary-icon">
              <Wifi size={18} />
            </span>
            <div>
              <span className="market-summary-label">Data source</span>
              <strong>Metals.Dev</strong>
            </div>
          </div>

          <div className="market-summary-item">
            <span className="market-summary-icon">
              <Clock3 size={18} />
            </span>
            <div>
              <span className="market-summary-label">Last checked</span>
              <strong>{formatTime(lastUpdated)}</strong>
            </div>
          </div>
        </div>

        <div className="market-section-label">
          <div>
            <span className="market-overline">MARKET WATCHLIST</span>
            <h3>Metal price board</h3>
          </div>
          <span className="market-currency-label">Prices in USD</span>
        </div>

        <div className="market-cards-grid">
          {loading && quotes.length === 0
            ? Array.from({ length: 6 }).map((_, index) => (
                <div className="market-metal-card market-skeleton" key={index}>
                  <div />
                  <div />
                  <div />
                </div>
              ))
            : quotes.map((quote) => {
                const symbol = quote.symbol.toUpperCase();
                const isSelected = symbol === selectedSymbol;
                const isUp =
                  quote.changePercent != null &&
                  quote.changePercent >= 0;
                const hasChange = quote.changePercent != null;
                const color = METAL_COLORS[symbol] || "#0d9488";

                return (
                  <button
                    type="button"
                    key={symbol}
                    className={`market-metal-card ${
                      isSelected ? "is-selected" : ""
                    }`}
                    onClick={() => setSelectedSymbol(symbol)}
                    aria-pressed={isSelected}
                  >
                    <div className="market-card-top">
                      <span
                        className="market-metal-symbol"
                        style={{ "--metal-color": color } as React.CSSProperties}
                      >
                        {symbol.slice(0, 2)}
                      </span>

                      <span
                        className={`market-change ${
                          hasChange
                            ? isUp
                              ? "market-up"
                              : "market-down"
                            : "market-neutral"
                        }`}
                      >
                        {hasChange ? (
                          isUp ? (
                            <ArrowUpRight size={14} />
                          ) : (
                            <ArrowDownRight size={14} />
                          )
                        ) : null}
                        {hasChange
                          ? `${isUp ? "+" : ""}${quote.changePercent!.toFixed(2)}%`
                          : "No change data"}
                      </span>
                    </div>

                    <span className="market-metal-name">{quote.name}</span>

                    <strong className="market-metal-price">
                      {formatPrice(quote.price, quote.currency)}
                    </strong>

                    <div className="market-card-bottom">
                      <span>
                        Per {quote.unit || "unit"}
                      </span>
                      <span className="market-card-open">
                        {isSelected ? "Selected" : "View chart"}
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </button>
                );
              })}
        </div>

        {!loading && quotes.length === 0 && !error && (
          <div className="market-empty">
            No market quotes are available yet.
          </div>
        )}

        <div className="market-chart-panel">
          <div className="market-chart-header">
            <div>
              <span className="market-overline">PRICE TRACKER</span>
              <h3>
                {selectedQuote?.name || selectedSymbol}{" "}
                <span>price history</span>
              </h3>
              <p>
                {history.length > 1
                  ? `${history.length} recorded price points`
                  : "Historical points will appear as the backend collects snapshots."}
              </p>
            </div>

            <div className="market-chart-current">
              <span>Latest quote</span>
              <strong>
                {selectedQuote
                  ? formatPrice(
                      selectedQuote.price,
                      selectedQuote.currency,
                    )
                  : "—"}
              </strong>

              {positive !== null && selectedQuote?.changePercent != null && (
                <span className={positive ? "market-up" : "market-down"}>
                  {positive ? "+" : ""}
                  {selectedQuote.changePercent.toFixed(2)}%
                </span>
              )}
            </div>
          </div>

          <div className="market-chart">
            {selectedHistory.length > 1 ? (
              <Sparkline
                points={selectedHistory}
                color={METAL_COLORS[selectedSymbol] || "#0d9488"}
              />
            ) : (
              <div className="market-chart-placeholder">
                <div className="market-chart-placeholder-icon">
                  <TrendingUp size={26} />
                </div>
                <strong>Building your market timeline</strong>
                <p>
                  More than one stored price point is needed to draw a
                  meaningful trend line. Check back after further updates.
                </p>
              </div>
            )}
          </div>

          <div className="market-chart-footer">
            <span>
              <span className="market-source-dot" />
              Source: {selectedQuote?.source || "Metals.Dev"}
            </span>
            <span>
              Quote time: {formatTime(selectedQuote?.sourceTimestamp)}
            </span>
          </div>
        </div>

        <div className="market-bottom-cta">
          <div>
            <span className="market-overline">TURN DATA INTO DECISIONS</span>
            <h3>Estimate the recovery value of your materials.</h3>
            <p>
              Metal market prices are a reference—not a guaranteed scrap
              buying price.
            </p>
          </div>

          <a href="/price-estimation" className="market-cta-button">
            Estimate material value
            <ArrowRight size={17} />
          </a>
        </div>

        <p className="market-disclaimer">
          Market prices are indicative reference prices from the connected
          provider. They are not guaranteed e-waste purchase offers. Actual
          recovery value depends on material composition, purity, yield,
          processing costs and local market conditions. Quotes refresh
          periodically; prices may not change on every refresh.
        </p>
      </div>
    </section>
  );
}
