import type { Metadata } from 'next';
import { Suspense } from 'react';
import RatioCalculator from '@/components/RatioCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I simplify a ratio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Find the greatest common divisor (GCD) of both numbers and divide each by it. Example: 12:18 → GCD is 6 → divide both by 6 → simplified to 2:3. This calculator finds the GCD automatically and shows the simplified ratio."
      }
    },
    {
      "@type": "Question",
      "name": "How do I check if two ratios are equivalent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Convert both ratios to decimals by dividing first number by second. If decimals match, ratios are equivalent. Example: 3:4 = 0.75, 6:8 = 0.75 → equivalent. Or cross-multiply: if a×d = b×c, ratios are equivalent."
      }
    },
    {
      "@type": "Question",
      "name": "How do I solve for X in a ratio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For a:b = c:x, solve by cross-multiplication: a×x = b×c → x = b×c/a. Example: 3:4 = 9:x → x = 4×9/3 = 12. The calculator solves ratio equations automatically."
      }
    },
    {
      "@type": "Question",
      "name": "How do I scale a ratio up or down?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiply both parts by the scale factor. For ratio 2:3 scaled by 4 → 8:12. First simplify the ratio, then scale. Use this calculator to find simplified and scaled versions automatically."
      }
    },
    {
      "@type": "Question",
      "name": "What is the golden ratio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Golden ratio is approximately 1:1.618 or φ. Found in nature, art, and architecture. Mathematically: a/b = (a+b)/a = 1.618. Useful in design, proportions, and aesthetic calculations."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Ratio Calculator - Simplify, Compare, and Solve Ratios',
  description: 'Free ratio calculator to simplify ratios, find equivalent ratios, scale ratios, compare ratios, and solve for X. Perfect for recipes, finance, and proportions.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RatioCalculator />
    </Suspense>
  );
}