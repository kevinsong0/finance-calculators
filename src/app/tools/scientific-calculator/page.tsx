import type { Metadata } from 'next';
import { Suspense } from 'react';
import ScientificCalculator from '@/components/ScientificCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I use trigonometric functions on a scientific calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enter a number, then click sin, cos, or tan. Results depend on angle mode (DEG for degrees, RAD for radians). Example: 90 DEG + sin = 1. For inverse functions (asin, acos, atan), the result is the angle. Use DEG mode for everyday calculations."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between log and ln?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "log is base-10 logarithm (log₁₀). ln is natural logarithm (logₑ, base e≈2.718). Example: log(100) = 2, ln(e) = 1. Use log for common calculations, ln for calculus and exponential functions. Both are available on this calculator."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate powers and roots?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For square: enter number, click x². For cube: click x³. For custom power: enter base, click xʸ (or ^), enter exponent. For square root: click √. For nth root: use xʸ with 1/n as exponent. Example: 8 ^ (1/3) = 2 (cube root of 8)."
      }
    },
    {
      "@type": "Question",
      "name": "What is factorial and how do I use it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Factorial (n!) is product of all positive integers up to n. Example: 5! = 5×4×3×2×1 = 120. Used in permutations, combinations, and probability. Enter number, click n!. Maximum practical input is about 170 (171! exceeds floating point)."
      }
    },
    {
      "@type": "Question",
      "name": "How do memory functions work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "M+ adds current value to memory. M- subtracts from memory. MR recalls memory value. MC clears memory. Memory persists across calculations. Useful for storing intermediate results in multi-step calculations."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Scientific Calculator - Free Online Calculator with Trig, Log, and Math Functions',
  description: 'Free scientific calculator with trigonometric, logarithmic, and exponential functions. Supports sin, cos, tan, log, ln, powers, roots, factorial, and memory.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ScientificCalculator />
    </Suspense>
  );
}