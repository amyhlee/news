"use client"

import { usePathname } from "next/navigation"
import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = ["Live Feed", "Analytics", "Insights"]

export function Header() {
  const pathname = usePathname()

  // Determine active tab based on route
  const getActiveTab = () => {
    return "Live Feed" // Default to Live Feed for home page
  }

  const activeTab = getActiveTab()

  return (
    <header className="sticky top-0 z-50 flex items-center px-6 h-[73px] bg-card border-b border-border">
      <div className="flex-1 flex justify-center">
        <nav className="flex items-center rounded-full border border-border bg-background shadow-sm">
          {navItems.map((item) => {
            const href = item === "Live Feed" ? "/" : "#"
            return (
              <a
                key={item}
                href={href}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                  item === activeTab
                    ? "bg-background text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </a>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 mr-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Smart search"
            className="pl-9 pr-4 h-10 w-56 rounded-full bg-background border-border text-sm"
          />
        </div>
        <ThemeToggle />
        <button className="relative flex items-center justify-center h-10 w-10 rounded-full bg-background border border-border text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          <span className="sr-only">Notifications</span>
        </button>
      </div>
    </header>
  )
}
