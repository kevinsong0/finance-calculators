'use client'

export default function PerformanceOptimization() {
  const webPerf = [
    { metric: 'LCP', target: '< 2.5s', desc: 'Largest Contentful Paint' },
    { metric: 'FID', target: '< 100ms', desc: 'First Input Delay' },
    { metric: 'CLS', target: '< 0.1', desc: 'Cumulative Layout Shift' },
    { metric: 'TTFB', target: '< 800ms', desc: 'Time to First Byte' },
    { metric: 'INP', target: '< 200ms', desc: 'Interaction to Next Paint' },
  ];

  const techniques = [
    { name: 'Image Optimization', tips: 'Compress, lazy load, use WebP/AVIF, responsive images' },
    { name: 'Code Splitting', tips: 'Dynamic imports, route-based splitting, tree shaking' },
    { name: 'Caching', tips: 'Browser cache, CDN, service workers, HTTP headers' },
    { name: 'Minification', tips: 'JS/CSS/HTML minify, bundle, gzip/brotli compression' },
    { name: 'Critical CSS', tips: 'Inline critical styles, defer non-critical' },
    { name: 'Preloading', tips: 'preload fonts/images, prefetch links, preconnect origins' },
  ];

  const tools = [
    { name: 'Lighthouse', desc: 'Chrome DevTools audit', url: 'chrome://inspect' },
    { name: 'WebPageTest', desc: 'Detailed performance analysis', url: 'webpagetest.org' },
    { name: 'PageSpeed Insights', desc: 'Google SEO + Core Web Vitals', url: 'pagespeed.web.dev' },
    { name: 'Chrome DevTools', desc: 'Performance profiler', url: 'F12 > Performance' },
  ];

  const commonIssues = [
    { issue: 'Large bundle size', fix: 'Code splitting, tree shaking, lazy loading' },
    { issue: 'Unoptimized images', fix: 'WebP, compression, responsive images' },
    { issue: 'Render blocking JS', fix: 'async/defer, move to bottom' },
    { issue: 'Slow server response', fix: 'CDN, caching, optimize backend' },
    { issue: 'Font loading delay', fix: 'font-display:swap, preload fonts' },
    { issue: 'Layout shifts', fix: 'Set dimensions, reserve space' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Performance Optimization Guide</h1>
      <p className="text-zinc-600">Core Web Vitals, optimization techniques, tools, and common fixes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Core Web Vitals Targets</h3>
        <div className="space-y-1 text-xs">
          {webPerf.map((w) => (
            <div key={w.metric} className="bg-white rounded p-2">
              <strong className="text-green-600">{w.metric}</strong>: {w.target}
              <div className="text-zinc-500 mt-1">{w.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Optimization Techniques</h3>
        <div className="space-y-1 text-xs">
          {techniques.map((t) => (
            <div key={t.name} className="bg-white rounded p-2">
              <strong>{t.name}</strong>
              <div className="text-zinc-600 mt-1">{t.tips}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Performance Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tools.map((t) => (
            <div key={t.name} className="bg-white rounded p-2">
              <strong>{t.name}</strong>: {t.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Issues & Fixes</h3>
        <div className="space-y-1 text-xs">
          {commonIssues.map((c) => (
            <div key={c.issue} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{c.issue}</strong>
              <div className="text-green-600 mt-1">Fix: {c.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quick Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Measure (Lighthouse, WebPageTest). 2. Images (compress, WebP, lazy load). 3. JS (minify, split, async). 4. CSS (critical inline, minify). 5. Fonts (preload, swap). 6. Server (CDN, cache headers). 7. Third-party (lazy load, async). 8. Monitor (RUM, alerts). Performance = user experience + SEO ranking.
        </div>
      </div>
    </main>
  );
}