"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bot, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useAIChat } from "@/components/ai-chat-context"

export function AIChatFAB() {
  const { open, setOpen } = useAIChat()
  const [preferences, setPreferences] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!preferences.trim()) return

    setIsSubmitting(true)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Navigate to results page with preferences as query param
    const encodedPreferences = encodeURIComponent(preferences)
    router.push(`/results?preferences=${encodedPreferences}`)

    // Reset and close
    setIsSubmitting(false)
    setOpen(false)
    setPreferences("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
          >
            <Bot className="!h-10 !w-10" />
            <span className="sr-only">Open AI Chat</span>
          </Button>
        </DialogTrigger>

        {/* Modal Content */}
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI News Agent
            </DialogTitle>
            <DialogDescription>
              Tell me what kind of news you're interested in, and I'll personalize your feed.
              Try mentioning topics, regions, or specific interests.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Example: I'm interested in technology news from Asia, especially AI developments and startup funding rounds..."
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[150px] resize-none"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              Press <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded">Ctrl</kbd> +{" "}
              <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded">Enter</kbd> to submit
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false)
                setPreferences("")
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!preferences.trim() || isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Get Results
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
