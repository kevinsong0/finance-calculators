import type { Metadata } from 'next';
import { Suspense } from 'react';
import PerformanceOptimization from '@/components/PerformanceOptimization';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are Core Web Vitals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Core Web Vitals: LCP (Largest Contentful Paint) < 2.5s - load speed. FID (First Input Delay) < 100ms - interactivity. CLS (Cumulative Layout Shift) < 0.1 - visual stability. INP (Interaction to Next Paint) < 200ms - responsiveness. TTFB (Time to First Byte) < 800ms. Google uses these for SEO ranking. Measure with Lighthouse, PageSpeed Insights, WebPageTest."
      }
    },
    {
      "@type": "Question",
      "name": "How do I optimize website images?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Image optimization: compress images (TinyPNG, Squoosh), use modern formats (WebP, AVIF), responsive images (srcset, sizes), lazy loading (loading='lazy'), set width/height to prevent layout shift, use CDN for delivery, preload critical images. Images often 50%+ of page weight. Optimization = faster load, better UX, higher SEO."
      }
    },
    {
      "@type": "Question",
      "name": "How do I reduce JavaScript bundle size?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reduce bundle: code splitting (dynamic imports, route-based), tree shaking (remove unused code), lazy loading (load on demand), minification (terser, uglify), compression (gzip, brottli), avoid large dependencies, use smaller alternatives (date-fns vs moment). Analyze with webpack-bundle-analyzer, source-map-explorer. Smaller bundle = faster download + parse."
      }
    },
    {
      "@type": "Question",
      "name": "What causes layout shifts (CLS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CLS causes: images without dimensions, ads/embeds injecting content, fonts causing swap, dynamic content insertion, animations moving elements. Fix: set width/height on images, reserve space for ads/embeds, use font-display:swap, insert content before existing elements, avoid layout animations. CLS hurts UX and SEO. Prevent with proper HTML structure."
      }
    },
    {
      "@type": "Question",
      "name": "How do I improve server response time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TTFB improvement: use CDN (edge caching), enable HTTP/2, optimize database queries, implement server caching (Redis, memcached), reduce middleware, use faster hosting, optimize backend code, enable compression. Target: TTFB < 800ms. Slow server = delays everything else. CDN helps most - caches at edge closer to users."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Performance Optimization Guide - Core Web Vitals & Techniques',
  description: 'Core Web Vitals targets, optimization techniques, tools, and common fixes.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PerformanceOptimization />
    </Suspense>
  );
}