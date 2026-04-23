import type { Metadata } from 'next';
import { Suspense } from 'react';
import JSMinifier from '@/components/JSMinifier';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is JavaScript minification?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JavaScript minification removes unnecessary characters: whitespace, comments, newlines, semicolons where optional. Result is smaller file for faster downloads. Professional minifiers (Terser, UglifyJS) also rename variables, remove dead code, and optimize expressions. Basic minifiers just remove formatting."
      }
    },
    {
      "@type": "Question",
      "name": "How much can JavaScript be minified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Basic minification: 20-40% reduction (whitespace and comments). Full minification with Terser: 40-60% reduction (variable renaming, dead code removal). Combined with gzip compression: 70-80% total reduction. Large frameworks (React, Vue) show biggest savings. Libraries benefit from property mangling."
      }
    },
    {
      "@type": "Question",
      "name": "What is Terser vs UglifyJS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Terser is modern JavaScript minifier (ES6+ support, active development). UglifyJS is older but still works for ES5 code. Terser features: ES6 minification, dead code removal, class properties, async/await. Most build tools (Webpack, Vite) use Terser. Use Terser for new projects, UglifyJS for legacy."
      }
    },
    {
      "@type": "Question",
      "name": "Should I minify JavaScript in development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Keep readable code in development for debugging. Minify only in production builds. Build tools handle this: Webpack dev mode keeps readable JS, production mode minifies. Use source maps (.map files) to debug minified code in production if needed."
      }
    },
    {
      "@type": "Question",
      "name": "How do I minify JavaScript automatically?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Build tools minify automatically: Webpack (terser-webpack-plugin), Vite (built-in Terser), Parcel (built-in), Rollup (rollup-plugin-terser). CLI tools: terser input.js -o output.min.js. npm scripts: 'terser src/*.js -o dist/bundle.min.js'. CI/CD pipelines should run minification on deploy."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'JavaScript Minifier - Reduce JS File Size for Faster Page Loads',
  description: 'Minify JavaScript to reduce file size. Remove comments, whitespace, and unnecessary characters. Basic JS compression for faster page loads. For production, use Terser for full optimization.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <JSMinifier />
    </Suspense>
  );
}