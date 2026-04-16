'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

type AdFormat = 'horizontal' | 'vertical' | 'rectangle'

interface AdBannerProps {
  adSlot: string
  format?: AdFormat
  fullWidth?: boolean
  className?: string
}

export default function AdBanner({
  adSlot,
  format = 'horizontal',
  fullWidth = true,
  className = ''
}: AdBannerProps) {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (e) {
      console.log('AdSense not loaded')
    }
  }, [])

  // Default sizes based on format
  const sizes = {
    horizontal: { width: '728px', height: '90px' }, // Leaderboard
    vertical: { width: '160px', height: '600px' },  // Wide skyscraper
    rectangle: { width: '300px', height: '250px' }, // Medium rectangle
  }

  const size = sizes[format]

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: fullWidth ? '100%' : size.width,
          height: size.height,
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense publisher ID
        data-ad-slot={adSlot}
        data-ad-format={format === 'horizontal' ? 'horizontal' : 'auto'}
        data-full-width-responsive={fullWidth ? 'true' : 'false'}
      />
    </div>
  )
}

// Sidebar ad component for layout
export function SidebarAd() {
  return (
    <div className="hidden lg:block">
      <AdBanner
        adSlot="SIDEBAR_SLOT_ID"
        format="vertical"
        fullWidth={false}
        className="sticky top-24"
      />
    </div>
  )
}

// In-content ad component
export function InContentAd() {
  return (
    <div className="my-8">
      <AdBanner
        adSlot="CONTENT_SLOT_ID"
        format="horizontal"
        fullWidth={true}
        className="mx-auto max-w-4xl"
      />
    </div>
  )
}

// Footer ad component
export function FooterAd() {
  return (
    <div className="mt-8 mb-4">
      <AdBanner
        adSlot="FOOTER_SLOT_ID"
        format="horizontal"
        fullWidth={true}
        className="mx-auto max-w-4xl"
      />
    </div>
  )
}