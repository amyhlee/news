"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const insightBullets = [
  "AI leading tech creates growth then motors environment in economics",
  "Climate change on a global entrepreneurship solutions over can optimize the market.",
  "Coat-technically differentiation emote the increase in strategies and wontas.",
]

interface TopicBubble {
  name: string
  size: number
  x: number
  y: number
  color: string
}

const trendingTopics: TopicBubble[] = [
  { name: "Crypto", size: 70, x: 35, y: 52, color: "hsl(186, 45%, 50%)" },
  { name: "Climate\nChange", size: 55, x: 78, y: 28, color: "hsl(215, 35%, 35%)" },
  { name: "Metaverse", size: 52, x: 78, y: 75, color: "hsl(215, 35%, 35%)" },
  { name: "Fed Rates", size: 48, x: 18, y: 78, color: "hsl(215, 35%, 35%)" },
  { name: "Metaverse", size: 44, x: 50, y: 88, color: "hsl(17, 70%, 65%)" },
  { name: "Bopie", size: 42, x: 90, y: 55, color: "hsl(17, 70%, 65%)" },
  { name: "Crypto", size: 36, x: 14, y: 32, color: "hsl(17, 70%, 65%)" },
  { name: "", size: 28, x: 28, y: 15, color: "hsl(210, 15%, 55%)" },
  { name: "", size: 26, x: 58, y: 12, color: "hsl(210, 15%, 55%)" },
]

function AISummaryCard() {
  return (
    <Card className="border-border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold text-card-foreground leading-snug">
          Global Tech Surge: AI Adoption Accelerates
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <ul className="flex flex-col gap-1.5">
          {insightBullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
              {bullet}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function TrendingTopicsCard() {
  return (
    <Card className="border-border">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-2xl font-bold text-card-foreground">
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="relative h-64 w-full">
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-label="Trending topics bubble chart">
            {trendingTopics.map((topic, index) => (
              <g key={`${topic.name}-${index}`}>
                <circle
                  cx={topic.x}
                  cy={topic.y}
                  r={topic.size / 2.5}
                  fill={topic.color}
                />
                {topic.name && (
                  <text
                    x={topic.x}
                    y={topic.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize={topic.size > 60 ? 6.5 : topic.size > 45 ? 5 : 4}
                    fontWeight="600"
                    style={{ pointerEvents: 'none' }}
                  >
                    {topic.name.includes("\n") ? (
                      topic.name.split("\n").map((line, i) => (
                        <tspan key={i} x={topic.x} dy={i === 0 ? -2.5 : 5}>
                          {line}
                        </tspan>
                      ))
                    ) : (
                      topic.name
                    )}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

function ReadingStatsCard() {
  return (
    <Card className="border-border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold text-card-foreground">
          Reading Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col gap-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Daily Reading Goal:</span>
            <span className="text-xs font-semibold text-card-foreground">85% Complete</span>
          </div>
          <Progress value={85} className="h-2 bg-secondary [&>div]:bg-primary" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Articles Read:</span>
          <span className="text-sm font-semibold text-card-foreground">24</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Avg. Reading Time:</span>
          <span className="text-sm font-semibold text-card-foreground">12 min</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function AIInsights() {
  return (
    <aside className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground">AI Insights</h2>
      <AISummaryCard />
      <TrendingTopicsCard />
      <ReadingStatsCard />
    </aside>
  )
}
