"use client"

import * as React from "react"
import {
  Bot,
  MessageSquare,
  DollarSign,
  Newspaper,
  Video,
  User,
  Settings,
  LogIn,
  Sparkles,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  {
    title: "AI News Agent",
    icon: Bot,
    url: "#",
  },
  {
    title: "Chat With GNOMI",
    icon: MessageSquare,
    url: "#",
  },
  {
    title: "Finance mode",
    icon: DollarSign,
    url: "#",
    badge: "NEW",
  },
]

const mainMenuItems = [
  {
    title: "News",
    icon: Newspaper,
    url: "#news",
    isActive: true,
  },
  {
    title: "Exclusives",
    icon: Video,
    url: "#exclusives",
  },
]

const bottomMenuItems = [
  {
    title: "Profile",
    icon: User,
    url: "#profile",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "#settings",
  },
  {
    title: "Log In / Sign up",
    icon: LogIn,
    url: "#login",
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="none" className="h-screen">
      <SidebarHeader className="border-b border-sidebar-border h-[73px] flex items-center justify-center bg-card">
        <div className="flex items-center justify-center px-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="136" height="32" fill="none">
            <path fill="currentColor" d="M15.487 19.492h8.924q-.374 1.455-1.12 2.742a9.3 9.3 0 0 1-1.869 2.284q-1.122.999-2.657 1.539-1.536.54-3.488.539-2.865.001-5.147-1.33-2.285-1.328-3.633-3.72-1.35-2.388-1.35-5.545 0-3.202 1.37-5.548 1.37-2.348 3.653-3.659 2.283-1.307 5.108-1.307 3.03 0 5.168 1.247 2.14 1.245 3.343 3.324l3.986-2.66a13.5 13.5 0 0 0-3.135-3.47 13.9 13.9 0 0 0-4.172-2.203q-2.325-.768-5.19-.768-3.28 0-6.082 1.08Q6.39 3.118 4.338 5.132 2.28 7.15 1.14 9.912 0 12.675 0 16.002q0 3.322 1.12 6.106 1.121 2.787 3.175 4.82a14.2 14.2 0 0 0 4.838 3.138q2.78 1.103 6.062 1.103 3.446-.001 6.164-1.27 2.719-1.266 4.547-3.47 1.827-2.198 2.742-5.048.912-2.844.828-6.045h-9.838a4.15 4.15 0 0 0-4.152 4.155m39.188 1.495L33.459 0v30.545h4.816V11.011L59.49 32V1.455h-4.816zm32.236.353q-1.267 2.35-3.487 3.677-2.224 1.331-5.128 1.332-2.865 0-5.108-1.332-2.242-1.328-3.507-3.677-1.266-2.347-1.266-5.339 0-2.994 1.266-5.341 1.265-2.348 3.507-3.677t5.108-1.33q2.947 0 5.168 1.33t3.467 3.677q1.245 2.346 1.245 5.341 0 2.991-1.266 5.339m2.201-16.122a14.8 14.8 0 0 0-4.795-3.138Q81.576.956 78.296.957 75.098.956 72.338 2.08q-2.761 1.12-4.816 3.138-2.055 2.015-3.178 4.757-1.119 2.742-1.12 6.026.001 3.24 1.12 6.024 1.123 2.787 3.136 4.82 2.013 2.04 4.795 3.18 2.783 1.143 6.02 1.144 3.281 0 6.042-1.143t4.795-3.18q2.034-2.035 3.156-4.82 1.12-2.784 1.12-6.025 0-3.285-1.12-6.026a14 14 0 0 0-3.176-4.757m22.27 14.523L99.466 0l-3.985 30.545h5.065l1.992-17.704 8.844 15.004 8.844-15.004 2.033 17.704h5.065L123.339 0zm19.676 10.804H136V1.454h-4.942z"></path>
          </svg>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col">
        <SidebarGroup className="px-2 py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-2 py-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={item.isActive}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-2 py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-2 py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg" className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20">
                  <a href="#upgrade">
                    <Sparkles className="text-purple-500" />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">Upgrade</span>
                      <span className="text-xs text-muted-foreground">Get the most from GNOMI</span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="flex-1" />
      </SidebarContent>

      <SidebarFooter>
        <div className="px-3 py-2 text-xs text-muted-foreground">
          <div>About GNOMI • Contact us • Blog</div>
          <div className="mt-1">Privacy • Terms of Service</div>
          <div className="mt-2">© 2026 Gnomi App Corp</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
