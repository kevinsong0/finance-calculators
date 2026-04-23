import type { Metadata } from 'next';
import { Suspense } from 'react';
import CSSMinifier from '@/components/CSSMinifier';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is CSS minification?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CSS minification removes unnecessary characters from CSS files: whitespace, comments, newlines, last semicolons. Result is smaller file size for faster page loads. Minified CSS still works exactly the same. Professional tools like cssnano, CleanCSS automate this for production builds."
      }
    },
    {
      "@type": "Question",
      "name": "How much can CSS be minified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typical reduction: 20-40% smaller. Depends on original formatting (more whitespace = more reduction). Well-formatted CSS with lots of comments can see 50%+ reduction. Compact CSS with minimal formatting may only see 10-15%. Minification + removing unused CSS (PurgeCSS) can achieve 80%+ reduction."
      }
    },
    {
      "@type": "Question",
      "name": "Does minified CSS affect performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, positively. Smaller CSS files: faster download (less bandwidth), quicker parsing (browser reads less), faster page render (critical CSS loads sooner). For large CSS files (Tailwind, Bootstrap), minification is essential. HTTP/2 helps but minification still matters for initial load speed."
      }
    },
    {
      "@type": "Question",
      "name": "Should I minify CSS in development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Keep readable CSS in development for debugging. Minify only for production. Build tools (Webpack, Vite) handle this automatically: dev mode keeps readable CSS, production mode minifies. Use source maps to debug minified CSS in production if needed."
      }
    },
    {
      "@type": "Question",
      "name": "How do I minify CSS automatically?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Build tools handle minification: Webpack (css-minimizer-webpack-plugin), Vite (built-in), Parcel (built-in). PostCSS plugins: cssnano, css-minimizer. Node.js: CleanCSS package. Online tools work for one-off files. For production sites, integrate minification into CI/CD pipeline."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'CSS Minifier - Reduce CSS File Size for Faster Page Loads',
  description: 'Minify CSS to reduce file size. Remove comments, whitespace, and unnecessary characters. Optimize hex colors and values. Perfect for production deployment and faster page speeds.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CSSMinifier />
    </Suspense>
  );
}