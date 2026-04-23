import type { Metadata } from 'next';
import { Suspense } from 'react';
import BrowserDevTools from '@/components/BrowserDevTools';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I open Chrome DevTools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open Chrome DevTools: F12, Ctrl+Shift+I (Windows/Linux), Cmd+Opt+I (Mac). Right-click element and Inspect. Three-dot menu > More tools > Developer tools. Console only: Ctrl+Shift+J (Windows/Linux), Cmd+Opt+J (Mac). Elements panel: Ctrl+Shift+C (Windows/Linux), Cmd+Opt+C (Mac). DevTools opens in separate window or docked panel."
      }
    },
    {
      "@type": "Question",
      "name": "What are the DevTools panels?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elements: inspect HTML and edit CSS. Console: run JavaScript and view logs. Sources: debug JS with breakpoints. Network: monitor HTTP requests. Performance: profile page speed. Memory: find memory leaks. Application: inspect storage. Security: check HTTPS and certificates. Each panel has specialized debugging tools."
      }
    },
    {
      "@type": "Question",
      "name": "How do I debug JavaScript in DevTools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sources panel: open JS file, click line number for breakpoint. Conditional breakpoint: right-click line number. Debug controls: F10 step over, F11 step into, Shift+F11 step out, F8 resume. Watch expressions: monitor variable values. Call stack: see execution path. Scope: inspect local and global variables. Use console.log for quick debugging."
      }
    },
    {
      "@type": "Question",
      "name": "How do I check network requests in DevTools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Network panel: shows all HTTP requests. Filter by type: JS, CSS, images. Click request for details: headers, response, timing. Disable cache: right-click reload icon. Throttle network: Slow 3G preset. Copy as cURL: right-click request. Export HAR file for sharing. Check response time, status codes, payload sizes."
      }
    },
    {
      "@type": "Question",
      "name": "What are console shortcuts in DevTools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Console shortcuts: $() = document.querySelector, $$() = document.querySelectorAll, console.log(), console.table() for data tables, console.dir() for object properties. debug(function) breaks on call. monitor(function) logs calls. getEventListeners(element) shows listeners. copy(object) copies to clipboard. $_ returns last evaluated result."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Browser DevTools Reference - Chrome, Firefox, Safari Guide',
  description: 'Complete browser DevTools reference. Shortcuts, panels, console commands, debugging tips for Chrome, Firefox, Safari. Master browser debugging.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BrowserDevTools />
    </Suspense>
  );
}