import type { Metadata } from 'next';
import { Suspense } from 'react';
import GPACalculator from '@/components/GPACalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate my GPA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GPA = Total grade points ÷ Total credits. For each course, multiply credits by grade points (A=4, B=3, C=2, D=1, F=0). Sum all points, divide by total credits. This calculator handles multiple courses, weighted grades, and shows contribution breakdown."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between weighted and unweighted GPA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unweighted GPA uses a 4.0 scale where all courses count equally. Weighted GPA gives extra points for honors, AP, or IB courses: often +0.5 or +1.0 per grade. An 'A' in AP might be 5.0 instead of 4.0. This calculator supports both scales."
      }
    },
    {
      "@type": "Question",
      "name": "What GPA do I need for honors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Graduation honors thresholds: Summa Cum Laude ≥ 3.9, Magna Cum Laude ≥ 3.7, Cum Laude ≥ 3.5. Requirements vary by school. Some use class rank instead. Academic probation typically starts below 2.0 GPA."
      }
    },
    {
      "@type": "Question",
      "name": "How many credits do I need to graduate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bachelor's degree typically requires 120-130 credits (about 40 courses). Associate degree needs 60-65 credits. Full-time students take 15-18 credits per semester. Use this calculator to track GPA throughout your degree program."
      }
    },
    {
      "@type": "Question",
      "name": "Can I raise my GPA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To raise GPA: take more credits, earn higher grades, consider grade forgiveness policies, focus on higher-credit courses. Impact depends on current GPA, credits completed, and new grades. Each new A significantly helps when you have fewer credits."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'GPA Calculator - Calculate Grade Point Average for College & High School',
  description: 'Free GPA calculator for students. Calculate weighted and unweighted GPA, track academic performance, and estimate graduation honors.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GPACalculator />
    </Suspense>
  );
}