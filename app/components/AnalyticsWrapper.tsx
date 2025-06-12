"use client"

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export function AnalyticsWrapper() {
  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  )
}
