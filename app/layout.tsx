import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AnalyticsWrapper } from "./components/AnalyticsWrapper"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "SENIPY - AI Cognitive Training",
  description: "AI-powered cognitive training platform for enhanced mental performance",
  keywords: "AI, cognitive training, brain games, mental fitness, SENIPY",
  authors: [{ name: "SENIPY Team" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          {children}
          <AnalyticsWrapper />
        </Suspense>
      </body>
    </html>
  )
}
