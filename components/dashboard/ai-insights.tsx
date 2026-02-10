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
  { name: "Crypto", size: 52, x: 30, y: 50, color: "hsl(186, 45%, 38%)" },
  { name: "Climate\nChange", size: 42, x: 72, y: 28, color: "hsl(215, 25%, 30%)" },
  { name: "Metaverse", size: 38, x: 52, y: 78, color: "hsl(186, 45%, 50%)" },
  { name: "Fed Rates", size: 32, x: 18, y: 78, color: "hsl(210, 25%, 45%)" },
  { name: "Biopie", size: 28, x: 88, y: 60, color: "hsl(17, 70%, 55%)" },
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
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold text-card-foreground">
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="relative h-44 w-full">
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-label="Trending topics bubble chart">
            {trendingTopics.map((topic) => (
              <g key={topic.name}>
                <circle
                  cx={topic.x}
                  cy={topic.y}
                  r={topic.size / 2.5}
                  fill={topic.color}
                  opacity={0.85}
                />
                <text
                  x={topic.x}
                  y={topic.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize={topic.size > 40 ? 5 : 4}
                  fontWeight="600"
                >
                  {topic.name.includes("\n") ? (
                    topic.name.split("\n").map((line, i) => (
                      <tspan key={i} x={topic.x} dy={i === 0 ? -3 : 6}>
                        {line}
                      </tspan>
                    ))
                  ) : (
                    topic.name
                  )}
                </text>
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
