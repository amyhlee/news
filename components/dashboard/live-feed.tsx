"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Sentiment = "Positive" | "Negative" | "Neutral"

interface Article {
  id: number
  title: string
  source: string
  time: string
  sentiment: Sentiment
  imageUrl: string
  loading?: boolean
}

const articles: Article[] = [
  {
    id: 1,
    title: "Global Tech Surge: AI Adoption Accelerates",
    source: "Financial Times",
    time: "15 min ago",
    sentiment: "Positive",
    imageUrl: "/images/news-tech.jpg",
  },
  {
    id: 2,
    title: "Climate Mortets: Sustainability Investment Properly Stopes in Market Phase",
    source: "Financial Times",
    time: "13 min ago",
    sentiment: "Negative",
    imageUrl: "/images/news-climate.jpg",
  },
  {
    id: 3,
    title: "Cryptocomand Frin Chants Footinate on Itets Compensation",
    source: "Financial Times",
    time: "11 min ago",
    sentiment: "Neutral",
    imageUrl: "/images/news-crypto.jpg",
  },
  {
    id: 4,
    title: "China's Green-Sooateild Porson's Most Ireworm Warking New York China",
    source: "Financial Times",
    time: "15 min ago",
    sentiment: "Positive",
    imageUrl: "/images/news-china.jpg",
  },
]

const loadingArticles = [
  { id: 5, source: "Financial Times", time: "15 min ago", sentiment: "Neutral" as Sentiment },
  { id: 6, source: "Financial Times", time: "15 min ago", sentiment: "Neutral" as Sentiment },
]

function SentimentDot({ sentiment }: { sentiment: Sentiment }) {
  const colorMap = {
    Positive: "bg-[hsl(145,55%,42%)]",
    Negative: "bg-[hsl(0,72%,55%)]",
    Neutral: "bg-[hsl(210,10%,55%)]",
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${colorMap[sentiment]}`} />
      <span className="text-xs text-muted-foreground">{sentiment}</span>
    </div>
  )
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="border-border hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-card-foreground leading-snug line-clamp-2">
              {article.title}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                {article.source} &middot; {article.time}
              </p>
              <SentimentDot sentiment={article.sentiment} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function LoadingArticleCard({
  source,
  time,
  sentiment,
}: {
  source: string
  time: string
  sentiment: Sentiment
}) {
  return (
    <Card className="border-border">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Skeleton className="h-16 w-20 flex-shrink-0 rounded-md" />
          <div className="flex-1 min-w-0">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-3" />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {source} &middot; {time}
              </p>
              <SentimentDot sentiment={sentiment} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function LiveFeed() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground">Live Feed</h2>
      <div className="flex flex-col gap-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        {loadingArticles.map((la) => (
          <LoadingArticleCard
            key={la.id}
            source={la.source}
            time={la.time}
            sentiment={la.sentiment}
          />
        ))}
      </div>
    </section>
  )
}
