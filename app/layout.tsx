import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { AIChatFAB } from "@/components/ai-chat-fab"
import { AIChatProvider } from "@/components/ai-chat-context"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'GNOMI - Financial Intelligence Dashboard',
  description: 'AI-powered financial news and market insights dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AIChatProvider>
            <SidebarProvider defaultOpen={true}>
              <AppSidebar />
              <SidebarInset className="ml-[var(--sidebar-width)]">
                {children}
                <AIChatFAB />
              </SidebarInset>
            </SidebarProvider>
          </AIChatProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
