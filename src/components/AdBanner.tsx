'use client'

import { CSSProperties, useEffect, useRef, useState } from 'react'
import { ADSENSE_CLIENT } from '@/lib/adsense'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

type AdFormat = 'horizontal' | 'vertical' | 'rectangle'

interface AdBannerProps {
  adSlot: string
  placement?: string
  format?: AdFormat
  fullWidth?: boolean
  className?: string
}

export default function AdBanner({
  adSlot,
  placement = 'unknown',
  format = 'horizontal',
  fullWidth = true,
  className = ''
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null)
  const trackedRef = useRef(false)
  const [status, setStatus] = useState<'loading' | 'rendered' | 'no_fill' | 'blocked'>('loading')

  useEffect(() => {
    const adNode = adRef.current
    if (!adNode) return
    if (adNode.getAttribute('data-adsbygoogle-status') === 'done') return

    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch {
      // Ignore transient errors from blocked/slow ad script loading.
    }
  }, [adSlot])

  useEffect(() => {
    const adNode = adRef.current
    if (!adNode) return

    const maybeTrackRendered = () => {
      const adsStatus = adNode.getAttribute('data-adsbygoogle-status')
      const adStatus = adNode.getAttribute('data-ad-status')

      if (adsStatus !== 'done') return

      if (adStatus === 'unfilled') {
        setStatus('no_fill')
        if (!trackedRef.current) {
          trackedRef.current = true
          window.gtag?.('event', 'ad_slot_no_fill', {
            source_site: 'finance',
            ad_slot: adSlot,
            ad_placement: placement,
            page_path: window.location.pathname,
          })
        }
        return
      }

      setStatus('rendered')
      if (!trackedRef.current) {
        trackedRef.current = true
        window.gtag?.('event', 'ad_slot_rendered', {
          source_site: 'finance',
          ad_slot: adSlot,
          ad_placement: placement,
          page_path: window.location.pathname,
        })
      }
    }

    maybeTrackRendered()
    const observer = new MutationObserver(maybeTrackRendered)
    observer.observe(adNode, {
      attributes: true,
      attributeFilter: ['data-adsbygoogle-status', 'data-ad-status'],
    })

    return () => observer.disconnect()
  }, [adSlot, placement])

  useEffect(() => {
    if (status === 'rendered' || status === 'no_fill') return

    const timeoutId = window.setTimeout(() => {
      setStatus('blocked')
      window.gtag?.('event', 'ad_slot_blocked_or_timeout', {
        source_site: 'finance',
        ad_slot: adSlot,
        ad_placement: placement,
        page_path: window.location.pathname,
      })
    }, 2500)

    return () => window.clearTimeout(timeoutId)
  }, [status, adSlot, placement])

  // Default sizes based on format
  const sizes = {
    horizontal: { width: '728px', height: '90px' }, // Leaderboard
    vertical: { width: '160px', height: '600px' },  // Wide skyscraper
    rectangle: { width: '300px', height: '250px' }, // Medium rectangle
  }

  const size = sizes[format]
  const style: CSSProperties = fullWidth
    ? { display: 'block' }
    : { display: 'inline-block', width: size.width, height: size.height }

  return (
    <div className={`ad-container ${className}`} style={{ minHeight: 120 }}>
      <div className="mb-1 text-[11px] uppercase tracking-wide text-gray-500">Sponsored</div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive={fullWidth ? 'true' : 'false'}
      />
      {status === 'loading' ? (
        <div className="mt-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3 text-sm text-gray-600">
          Ad slot is loading...
        </div>
      ) : null}
      {status === 'no_fill' || status === 'blocked' ? (
        <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
          <div className="font-medium">
            {status === 'no_fill' ? 'Ad inventory unavailable now' : 'Ad blocked or network unavailable'}
          </div>
          <div className="mt-1 text-gray-600">
            Explore high-intent tools while ad inventory refreshes.
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <a href="/tools/mortgage-calculator" className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100">
              Mortgage Calculator
            </a>
            <a href="/tools/debt-payoff-calculator" className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100">
              Debt Payoff
            </a>
          </div>
        </div>
      ) : null}
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
