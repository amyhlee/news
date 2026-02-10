"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { Header } from "@/components/dashboard/header"
import newsData from "@/data/gnomi_news_articles.json"

type Article = {
  id: number
  title: string
  image: string
  description: string
  source: string
  timeAgo: string
  country?: string
}

type Section = {
  region: string
  category: string
  count: number
  articles: Article[]
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const preferences = searchParams.get("preferences") || ""

  // Get current day of week
  const dayOfWeek = new Date().toLocaleDateString("en-US", { weekday: "long" })

  // Flatten all articles from all sections
  const allArticles: Article[] = []
  Object.values(newsData.sections).forEach((section: any) => {
    allArticles.push(...section.articles)
  })

  return (
    <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Preferences Display */}
          {preferences && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Your Preferences:
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      "{preferences}"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Header */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground">
              Your {dayOfWeek} Curated Selection
            </h2>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-4">
            {allArticles.map((article) => (
              <Card
                key={article.id}
                className="border-border hover:shadow-md transition-shadow overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h3 className="text-base font-semibold text-card-foreground leading-snug line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-medium">{article.source}</span>
                        <span>•</span>
                        <span>{article.timeAgo}</span>
                        {article.country && (
                          <>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {article.country}
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
  )
}

export default function ResultsPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Suspense fallback={
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-foreground">Loading...</h2>
            </div>
          </div>
        </main>
      }>
        <ResultsContent />
      </Suspense>
    </div>
  )
}
