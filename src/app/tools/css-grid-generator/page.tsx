import type { Metadata } from 'next';
import { Suspense } from 'react';
import CSSGridGenerator from '@/components/CSSGridGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is CSS Grid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CSS Grid is a two-dimensional layout system for creating rows and columns. Unlike Flexbox (one-dimensional), Grid handles both axes simultaneously. Define grid-template-columns and grid-template-rows, then place items into cells or span multiple cells."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between CSS Grid and Flexbox?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flexbox is one-dimensional (row OR column), Grid is two-dimensional (rows AND columns together). Use Flexbox for navbars, card lists, centering single elements. Use Grid for page layouts, dashboards, image galleries, complex multi-row/column designs. Grid gives precise placement control."
      }
    },
    {
      "@type": "Question",
      "name": "What does 1fr mean in CSS Grid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1fr means 1 fractional unit - one share of available space. grid-template-columns: 1fr 1fr 1fr splits space into 3 equal parts. 2fr 1fr gives first column 2/3, second column 1/3. fr units distribute free space proportionally after fixed sizes and content."
      }
    },
    {
      "@type": "Question",
      "name": "How do I make responsive CSS Grids?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use minmax() and auto-fit/auto-fill: grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)). This creates as many 200px columns as fit, expanding to fill remaining space. For mobile: reduce columns or use media queries to change grid-template-columns."
      }
    },
    {
      "@type": "Question",
      "name": "How do items span multiple grid cells?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "grid-column: 1 / 3 spans from line 1 to line 3 (2 columns). grid-row: 1 / 4 spans 3 rows. Or use shorthand: grid-column: span 2. Named areas: grid-template-areas defines layout visually, items use grid-area property."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'CSS Grid Generator - Visual Grid Layout Builder',
  description: 'Free CSS Grid generator with live preview. Configure columns, rows, gap, alignment. Generate CSS for page layouts, dashboards, galleries. Two-dimensional layout tool.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CSSGridGenerator />
    </Suspense>
  );
}