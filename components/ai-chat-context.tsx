"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type AIChatContextType = {
  open: boolean
  setOpen: (open: boolean) => void
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined)

export function AIChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <AIChatContext.Provider value={{ open, setOpen }}>
      {children}
    </AIChatContext.Provider>
  )
}

export function useAIChat() {
  const context = useContext(AIChatContext)
  if (context === undefined) {
    throw new Error("useAIChat must be used within an AIChatProvider")
  }
  return context
}
