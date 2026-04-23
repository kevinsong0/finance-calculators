import type { Metadata } from 'next';
import { Suspense } from 'react';
import CSSFlexboxGenerator from '@/components/CSSFlexboxGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is CSS Flexbox?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CSS Flexbox is a one-dimensional layout system for arranging items in rows or columns. Items flex (expand/shrink) to fill available space or prevent overflow. Key properties: display:flex on container, flex-direction for axis, justify-content for main axis, align-items for cross axis."
      }
    },
    {
      "@type": "Question",
      "name": "How do I center elements with Flexbox?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Center horizontally and vertically: display:flex; justify-content:center; align-items:center; on parent. This centers all children. For single item centering, this is the easiest method. Add height to parent for vertical centering to work."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between justify-content and align-items?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "justify-content aligns items on the main axis (row = horizontal, column = vertical). align-items aligns on the cross axis (row = vertical, column = horizontal). In row layout: justify-content controls horizontal distribution, align-items controls vertical alignment. They swap roles in column layout."
      }
    },
    {
      "@type": "Question",
      "name": "How does flex-wrap work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "flex-wrap:nowrap (default) keeps all items on one line, shrinking if needed. flex-wrap:wrap allows items to wrap to multiple lines when container width is exceeded. wrap-reverse wraps from opposite side. Essential for responsive layouts that adapt to screen width."
      }
    },
    {
      "@type": "Question",
      "name": "What is the flex shorthand?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "flex: grow shrink basis. Common values: flex:1 (grow equally, shrink equally, basis auto), flex:auto (grow:1 shrink:1 basis:auto), flex:none (grow:0 shrink:0 basis:auto). Quick patterns: flex:1 for equal columns, flex:0 0 200px for fixed width."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'CSS Flexbox Generator - Visual Layout Builder with Live Preview',
  description: 'Free CSS Flexbox generator with live preview. Adjust direction, justify-content, align-items, flex-wrap, gap. Copy generated CSS for web layouts, responsive design, and component styling.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CSSFlexboxGenerator />
    </Suspense>
  );
}