import type { Metadata } from 'next';
import { Suspense } from 'react';
import HTMLMinifier from '@/components/HTMLMinifier';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is HTML minification?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTML minification removes unnecessary characters from HTML files: comments, whitespace, extra spaces around attributes. Result is smaller file for faster page loads. Minified HTML works exactly the same. Use html-minifier npm package or online tools for production builds."
      }
    },
    {
      "@type": "Question",
      "name": "How much can HTML be minified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typical reduction: 15-30% smaller. Depends on original formatting. Well-formatted HTML with lots of comments can see 40%+ reduction. Inline CSS/JS in HTML gets additional savings. Combined with gzip compression: 60-70% total reduction. Large pages benefit most."
      }
    },
    {
      "@type": "Question",
      "name": "Should I remove quotes from HTML attributes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, for simple attribute values. HTML spec allows unquoted values when: alphanumeric characters only, no spaces, no special chars. class=btn works, class=btn primary needs quotes. Safe to remove quotes from simple values like id, type, name. Keep quotes for complex values with spaces or special chars."
      }
    },
    {
      "@type": "Question",
      "name": "How do I minify HTML automatically?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Build tools minify automatically: Webpack (html-minifier-plugin), Vite (vite-plugin-html), Gulp (gulp-htmlmin). CLI: html-minifier input.html -o output.min.html. npm package: const minified = require('html-minifier').minify(html, options). Integrate into CI/CD pipeline for production builds."
      }
    },
    {
      "@type": "Question",
      "name": "Does HTML minification affect SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No negative SEO impact. Google and search engines parse minified HTML fine. Positive impact: faster page load improves Core Web Vitals, which affects rankings. Minification reduces HTML size, improves TTFB and FCP. Best practice: minify for production, keep readable HTML in development."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'HTML Minifier - Reduce HTML File Size for Faster Page Loads',
  description: 'Minify HTML to reduce file size. Remove comments, whitespace, and unnecessary quotes. Basic HTML compression for faster page loads and production deployment.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HTMLMinifier />
    </Suspense>
  );
}