"use client"

import { useState, useEffect, useRef } from "react"
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
  category?: string
  loading?: boolean
}

// Helper function to determine sentiment based on title keywords
function determineSentiment(title: string): Sentiment {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes("criticized") || lowerTitle.includes("disaster") || lowerTitle.includes("bleeding") || lowerTitle.includes("clash") || lowerTitle.includes("raid")) {
    return "Negative"
  }
  if (lowerTitle.includes("boost") || lowerTitle.includes("welcomes") || lowerTitle.includes("heights") || lowerTitle.includes("extends")) {
    return "Positive"
  }
  return "Neutral"
}

const articles: Article[] = [
  {
    id: 1,
    title: "Kamala Harris's team criticized for using \"trendy language\" that backfired",
    source: "i-cable",
    time: "28 minutes ago",
    sentiment: "Negative",
    imageUrl: "https://icable-prod.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2026/02/11074815/N_20260210_HARRIS-NUMBER-260210-2300.jpg",
    category: "China"
  },
  {
    id: 2,
    title: "The truth about Trump's tariff disaster that's bleeding America's economy and alienating allies",
    source: "indiatoday",
    time: "34 minutes ago",
    sentiment: "Negative",
    imageUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202602/the-white-house-also-said-india-and-the-us-have-agreed-on-a-framework-to-expand-defence-cooperation-072036559-16x9.jpg",
    category: "India"
  },
  {
    id: 3,
    title: "The U.S. Department of Justice has revealed several names from documents related to the Epstein case",
    source: "ria-ru",
    time: "38 minutes ago",
    sentiment: "Neutral",
    imageUrl: "https://cdnn21.img.ria.ru/images/151236/10/1512361097_0:355:2400:1705_1920x1080_80_0_0_45f686962a59b40e8251990b8e030404.jpg",
    category: "Russia"
  },
  {
    id: 4,
    title: "A political scientist believes that Ukraine will only be welcomed into the EU in words",
    source: "ria-ru",
    time: "38 minutes ago",
    sentiment: "Neutral",
    imageUrl: "https://cdnn21.img.ria.ru/images/07e8/06/1b/1955847682_736:0:3072:1314_1920x1080_80_0_0_f2c79c5773ab37566bcc31757d6a3b4c.jpg",
    category: "Russia"
  },
  {
    id: 5,
    title: "Nigeria: the Senate amends the new electoral law, results will be transmitted in real time",
    source: "mediapart",
    time: "39 minutes ago",
    sentiment: "Positive",
    imageUrl: "https://www.mediapart.fr/assets/front/images/social/og_image/journal.png",
    category: "France"
  },
  {
    id: 6,
    title: "Russia restricts access to Telegram",
    source: "spiegel",
    time: "40 minutes ago",
    sentiment: "Negative",
    imageUrl: "https://cdn.prod.www.spiegel.de/images/d6264910-8768-476c-94d4-2871cdb91758_w1200_r1.778_fpx45.74_fpy55.jpg",
    category: "Germany"
  },
  {
    id: 7,
    title: "EU defense commissioner to tour Europe in effort to ramp up missile output for Ukraine",
    source: "tass-ru",
    time: "41 minutes ago",
    sentiment: "Neutral",
    imageUrl: "https://tass.com/img/blocks/common/tass_logo_share_eng.png",
    category: "Russia"
  },
  {
    id: 8,
    title: "The fate of South Africans recruited by Russian forces discussed between Putin and Ramaphosa",
    source: "mediapart",
    time: "41 minutes ago",
    sentiment: "Neutral",
    imageUrl: "https://www.mediapart.fr/assets/front/images/social/og_image/journal.png",
    category: "France"
  },
  {
    id: 9,
    title: "Australia urges calm after rally clash",
    source: "taipeitimes",
    time: "41 minutes ago",
    sentiment: "Negative",
    imageUrl: "https://img.taipeitimes.com/images/2026/02/11/P05-260211-304.jpg",
    category: "Taiwan"
  },
  {
    id: 10,
    title: "Sri Lanka's palm-sap tappers ride UNESCO boost",
    source: "taipeitimes",
    time: "41 minutes ago",
    sentiment: "Positive",
    imageUrl: "https://img.taipeitimes.com/images/2026/02/11/P05-260211-317.jpg",
    category: "Taiwan"
  },
  {
    id: 11,
    title: "S Korea spy agency raided over drone flight into North",
    source: "taipeitimes",
    time: "41 minutes ago",
    sentiment: "Negative",
    imageUrl: "https://img.taipeitimes.com/images/2026/02/11/p05-260211-webpic5AAA.jpg",
    category: "Taiwan"
  },
  {
    id: 12,
    title: "The Blue and White Coalition's negotiations are locked in a black box, with the impact of tariffs on various items leaving the public to piece together the information",
    source: "udn-tw",
    time: "41 minutes ago",
    sentiment: "Neutral",
    imageUrl: "https://udn.com/static/img/UDN_BABY.png",
    category: "Taiwan"
  },
  {
    id: 13,
    title: "News Perspective / The Tariff Agreement is About to be Signed, Kept Under Wraps...",
    source: "udn-tw",
    time: "41 minutes ago",
    sentiment: "Neutral",
    imageUrl: "https://udn.com/static/img/UDN_BABY.png",
    category: "Taiwan"
  },
  {
    id: 14,
    title: "Barcelona's unfinished Sagrada Familia basilica hits new heights despite delays",
    source: "taipeitimes",
    time: "41 minutes ago",
    sentiment: "Positive",
    imageUrl: "https://img.taipeitimes.com/images/2026/02/11/P05-260211-303.jpg",
    category: "China"
  },
  {
    id: 15,
    title: "Social media addiction trial starts in LA",
    source: "taipeitimes",
    time: "41 minutes ago",
    sentiment: "Neutral",
    imageUrl: "https://img.taipeitimes.com/images/2026/02/11/P05-260211-315.jpg",
    category: "Taiwan"
  },
  {
    id: 16,
    title: "The President of Azerbaijan, Aliyev, welcomed Vance in Baku with an honor guard",
    source: "rt-ru",
    time: "45 minutes ago",
    sentiment: "Positive",
    imageUrl: "https://russian.rt.com/static/blocks/og-img/pl-17.jpg",
    category: "Russia"
  },
  {
    id: 17,
    title: "In the wake of the Epstein scandal, Starmer distances himself from speculation about his future",
    source: "delfi",
    time: "45 minutes ago",
    sentiment: "Neutral",
    imageUrl: "https://images.delfi.lt/media-api-image-cropper/v1/1f24706b-8ae4-48cd-a972-460ccb23cd88.jpg",
    category: "Lithuania"
  },
  {
    id: 18,
    title: "Britain has extended the sanctions exemptions for the Bulgarian subsidiaries of LUKOIL",
    source: "rt-ru",
    time: "47 minutes ago",
    sentiment: "Neutral",
    imageUrl: "https://russian.rt.com/static/blocks/og-img/pl-17.jpg",
    category: "Russia"
  },
  {
    id: 19,
    title: "Szijjartó condemned EU leaders for their interference in the Ukrainian conflict",
    source: "rt-ru",
    time: "48 minutes ago",
    sentiment: "Negative",
    imageUrl: "https://russian.rt.com/static/blocks/og-img/pl-17.jpg",
    category: "Russia"
  },
  {
    id: 20,
    title: "China says that the Japanese Prime Minister must demonstrate a willingness for dialogue",
    source: "15min-lt",
    time: "48 minutes ago",
    sentiment: "Neutral",
    imageUrl: "https://s1.15min.lt/static/cache/MTIwMHg2MjgsLDk5OSxvcmlnaW5hbCwsaWQ9MTA1Mzc1MjImZGF0ZT0yMDI2JTJGMDIlMkYxMCwyMTA3MzkzNTAx/lin-jianas-johannes-neudecker-dpapicture-alliance-698b546156da4.jpg",
    category: "Lithuania"
  }
]

const loadingArticles: Array<{id: number, source: string, time: string, sentiment: Sentiment}> = []

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
          <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg"
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-card-foreground leading-snug line-clamp-3">
              {article.title}
            </h3>
            <div className="flex items-center justify-between mt-3">
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
  const [visibleArticles, setVisibleArticles] = useState<Article[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const ARTICLES_PER_PAGE = 10

  // Load initial articles
  useEffect(() => {
    setVisibleArticles(articles.slice(0, ARTICLES_PER_PAGE))
  }, [])

  // Handle scroll for infinite loading
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100

      if (isNearBottom && !loading && visibleArticles.length < articles.length) {
        setLoading(true)
        // Simulate loading delay
        setTimeout(() => {
          const nextPage = page + 1
          const newArticles = articles.slice(0, nextPage * ARTICLES_PER_PAGE)
          setVisibleArticles(newArticles)
          setPage(nextPage)
          setLoading(false)
        }, 500)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [loading, visibleArticles.length, page])

  return (
    <section className="flex flex-col gap-4 h-full">
      <h2 className="text-lg font-semibold text-foreground">Live Feed</h2>
      <div
        ref={scrollContainerRef}
        className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-12rem)] pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
      >
        {visibleArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="text-sm text-muted-foreground">Loading more articles...</div>
          </div>
        )}
      </div>
    </section>
  )
}
