"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

const sp500Stocks = [
  { symbol: "AAPL", name: "Apple", price: 178.45, change: 2.34, changePercent: 1.33 },
  { symbol: "MSFT", name: "Microsoft", price: 412.89, change: 5.67, changePercent: 1.39 },
  { symbol: "GOOGL", name: "Alphabet", price: 142.56, change: -1.23, changePercent: -0.86 },
  { symbol: "AMZN", name: "Amazon", price: 168.34, change: 3.45, changePercent: 2.09 },
  { symbol: "NVDA", name: "NVIDIA", price: 875.21, change: 12.34, changePercent: 1.43 },
  { symbol: "TSLA", name: "Tesla", price: 234.56, change: -4.32, changePercent: -1.81 },
  { symbol: "META", name: "Meta", price: 456.78, change: 8.90, changePercent: 1.99 },
  { symbol: "BRK.B", name: "Berkshire", price: 389.45, change: 2.11, changePercent: 0.54 },
  { symbol: "JPM", name: "JP Morgan", price: 178.90, change: 1.56, changePercent: 0.88 },
  { symbol: "V", name: "Visa", price: 267.34, change: 3.21, changePercent: 1.21 },
]

const sectorData = [
  { name: "Technology", change: "+5.67%", size: 4, color: "hsl(186, 45%, 38%)" },
  { name: "Finance", change: "+1.37%", size: 3, color: "hsl(186, 45%, 45%)" },
  { name: "Sectoral", change: "-1.23%", size: 2, color: "hsl(0, 72%, 55%)" },
  { name: "Electoral", change: "-1.75%", size: 2, color: "hsl(0, 72%, 60%)" },
  { name: "Healthcare", change: "+1.29%", size: 3, color: "hsl(186, 45%, 50%)" },
  { name: "Conomi...", change: "-3.02%", size: 2, color: "hsl(0, 72%, 65%)" },
  { name: "Pharma", change: "1.12%", size: 2, color: "hsl(210, 15%, 70%)" },
  { name: "Stock", change: "0.60%", size: 1, color: "hsl(210, 15%, 75%)" },
  { name: "Moto", change: "1.58%", size: 1, color: "hsl(210, 15%, 65%)" },
  { name: "Coro", change: "0.25%", size: 1, color: "hsl(210, 15%, 80%)" },
  { name: "Rectors", change: "-3.23%", size: 2, color: "hsl(0, 72%, 50%)" },
  { name: "Recession", change: "-1.73%", size: 2, color: "hsl(0, 72%, 58%)" },
  { name: "Sector", change: "-3.15%", size: 2, color: "hsl(0, 72%, 52%)" },
  { name: "Ranki...", change: "-3.51%", size: 1, color: "hsl(0, 72%, 48%)" },
  { name: "Compe...", change: "-1.05%", size: 1, color: "hsl(0, 72%, 62%)" },
]

function LiveStockTicker() {
  const [stocks, setStocks] = useState(sp500Stocks)

  useEffect(() => {
    // Simulate live price updates every 3 seconds
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const randomChange = (Math.random() - 0.5) * 2 // Random change between -1 and 1
          const newPrice = stock.price + randomChange
          const newChange = stock.change + randomChange
          const newChangePercent = (newChange / stock.price) * 100

          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(newChange.toFixed(2)),
            changePercent: parseFloat(newChangePercent.toFixed(2)),
          }
        })
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Duplicate stocks twice for seamless infinite scroll
  const allStocks = [...stocks, ...stocks]

  return (
    <Card className="border-border">
      <CardContent className="p-0">
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes tickerScroll {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-50%);
              }
            }
            .ticker-wrapper {
              animation: tickerScroll 20s linear infinite;
              display: flex;
              width: fit-content;
            }
            .ticker-wrapper:hover {
              animation-play-state: paused;
            }
          `
        }} />
        <div className="overflow-hidden">
          <div className="ticker-wrapper">
            {allStocks.map((stock, index) => (
              <div
                key={`${stock.symbol}-${index}`}
                className="flex items-center gap-2 px-3 py-3 whitespace-nowrap flex-shrink-0"
              >
                <span className="text-sm font-semibold text-foreground">{stock.symbol}</span>
                <span className="text-sm font-medium text-foreground">
                  ${stock.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1">
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-3 w-3" style={{ color: "hsl(145, 55%, 42%)" }} />
                  ) : (
                    <TrendingDown className="h-3 w-3" style={{ color: "hsl(0, 72%, 55%)" }} />
                  )}
                  <span
                    className="text-xs font-medium"
                    style={{
                      color: stock.change >= 0 ? "hsl(145, 55%, 42%)" : "hsl(0, 72%, 55%)",
                    }}
                  >
                    {stock.change >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SectorHeatMap() {
  return (
    <Card className="border-border">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-2xl font-bold text-card-foreground">
          Sector Heat Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-4 gap-1 rounded-lg overflow-hidden">
          {sectorData.map((sector) => (
            <div
              key={sector.name}
              className="flex flex-col items-center justify-center p-2 text-center overflow-hidden"
              style={{
                backgroundColor: sector.color,
                gridColumn: sector.size >= 3 ? "span 2" : undefined,
                gridRow: sector.size >= 4 ? "span 2" : undefined,
                minHeight: sector.size >= 3 ? "80px" : "60px",
              }}
            >
              <span className="text-xs font-semibold text-white leading-tight overflow-hidden w-full">
                {sector.name}
              </span>
              <span className="text-[10px] font-medium text-white/90 mt-0.5">{sector.change}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function MarketOverview() {
  return (
    <aside className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground">Market Overview</h2>
      <LiveStockTicker />
      <SectorHeatMap />
    </aside>
  )
}
