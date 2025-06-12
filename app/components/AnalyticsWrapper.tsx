"use client"

import dynamic from "next/dynamic"

// Dynamically import analytics components to prevent SSR issues
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => ({ default: mod.SpeedInsights })),
  { ssr: false },
)

const Analytics = dynamic(() => import("@vercel/analytics/next").then((mod) => ({ default: mod.Analytics })), {
  ssr: false,
})

export function AnalyticsWrapper() {
  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  )
}
