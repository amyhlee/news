import { Header } from "@/components/dashboard/header"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { LiveFeed } from "@/components/dashboard/live-feed"
import { AIInsights } from "@/components/dashboard/ai-insights"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr_280px]">
            <MarketOverview />
            <LiveFeed />
            <AIInsights />
          </div>
        </div>
      </main>
    </div>
  )
}
