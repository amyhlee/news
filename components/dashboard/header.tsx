"use client"

import { Search, Bell, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"

const navItems = ["Live Feed", "Analytics", "Insights"]

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 h-[73px] bg-card border-b border-border">
      <div className="flex-1" />

      <nav className="flex items-center rounded-full border border-border bg-background shadow-sm">
        {navItems.map((item) => (
          <button
            key={item}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
              item === "Live Feed"
                ? "bg-background text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex-1 flex items-center gap-3 justify-end">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Smart search"
            className="pl-9 pr-4 h-10 w-56 rounded-full bg-background border-border text-sm"
          />
        </div>
        <button className="flex items-center justify-center h-10 w-10 rounded-full bg-background border border-border text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </button>
        <button className="relative flex items-center justify-center h-10 w-10 rounded-full bg-background border border-border text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          <span className="sr-only">Notifications</span>
        </button>
      </div>
    </header>
  )
}
