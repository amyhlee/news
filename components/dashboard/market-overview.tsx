"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

const sp500Data = [
  { time: "9:30", value: 5180 },
  { time: "10:00", value: 5195 },
  { time: "10:30", value: 5210 },
  { time: "11:00", value: 5200 },
  { time: "11:30", value: 5220 },
  { time: "12:00", value: 5230 },
  { time: "12:30", value: 5215 },
  { time: "13:00", value: 5225 },
  { time: "13:30", value: 5240 },
  { time: "14:00", value: 5245 },
]

const nasdaqData = [
  { time: "9:30", value: 4080 },
  { time: "10:00", value: 4070 },
  { time: "10:30", value: 4060 },
  { time: "11:00", value: 4050 },
  { time: "11:30", value: 4045 },
  { time: "12:00", value: 4055 },
  { time: "12:30", value: 4040 },
  { time: "13:00", value: 4035 },
  { time: "13:30", value: 4030 },
  { time: "14:00", value: 4029 },
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

function IndexCard({
  name,
  value,
  isPositive,
  data,
}: {
  name: string
  value: string
  isPositive: boolean
  data: { time: string; value: number }[]
}) {
  return (
    <Card className="border-border">
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-2xl font-bold text-card-foreground">{value}</span>
          {isPositive ? (
            <TrendingUp className="h-5 w-5" style={{ color: "hsl(145, 55%, 42%)" }} />
          ) : (
            <TrendingDown className="h-5 w-5" style={{ color: "hsl(0, 72%, 55%)" }} />
          )}
        </div>
        <div className="mt-3 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={isPositive ? "hsl(145, 55%, 42%)" : "hsl(0, 72%, 55%)"}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor={isPositive ? "hsl(145, 55%, 42%)" : "hsl(0, 72%, 55%)"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "hsl(145, 55%, 42%)" : "hsl(0, 72%, 55%)"}
                fill={`url(#gradient-${name})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function SectorHeatMap() {
  return (
    <Card className="border-border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base font-semibold text-card-foreground">
          Sector Heat Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-4 gap-1">
          {sectorData.map((sector) => (
            <div
              key={sector.name}
              className="flex flex-col items-center justify-center rounded-md p-2 text-center"
              style={{
                backgroundColor: sector.color,
                gridColumn: sector.size >= 3 ? "span 2" : undefined,
                minHeight: sector.size >= 3 ? "56px" : "48px",
              }}
            >
              <span className="text-[10px] font-medium text-card leading-tight truncate w-full">
                {sector.name}
              </span>
              <span className="text-[9px] text-card/80">{sector.change}</span>
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
      <IndexCard
        name="S&P 500"
        value="5,245.60"
        isPositive={true}
        data={sp500Data}
      />
      <IndexCard
        name="NASDAQ"
        value="4,029.60"
        isPositive={false}
        data={nasdaqData}
      />
      <SectorHeatMap />
    </aside>
  )
}
