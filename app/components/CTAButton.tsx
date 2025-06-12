'use client'

import { useFeatureFlagVariantKey } from 'posthog-js/react'
import posthog from '@/lib/posthog'

const CTAButton: React.FC = () => {
  const variant = useFeatureFlagVariantKey('cta-button-variant')

  const handleClick = () => {
    posthog.capture('cta_clicked', { variant })
    // Redirect or open modal etc.
  }

  switch (variant) {
    case 'variant-b':
      return (
        <button
          onClick={handleClick}
          className="bg-purple-500 animate-pulse hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          Try It Now
        </button>
      )
    default:
      return (
        <button
          onClick={handleClick}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </button>
      )
  }
}

export default CTAButton
