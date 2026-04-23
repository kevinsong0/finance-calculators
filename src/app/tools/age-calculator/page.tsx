import type { Metadata } from 'next';
import { Suspense } from 'react';
import AgeCalculator from '@/components/AgeCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate my exact age?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enter your birth date and optionally a target date. The calculator shows your age in years, months, and days, plus total days lived, hours lived, zodiac sign, generation, and days until your next birthday."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate age from two dates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The difference between two dates gives age. Calculate years by subtracting birth year from current year, adjusting if birthday hasn't occurred yet. This calculator handles leap years and varying month lengths automatically."
      }
    },
    {
      "@type": "Question",
      "name": "What is my zodiac sign based on birth date?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zodiac signs are determined by birth month and day: Capricorn (Dec 22-Jan 19), Aquarius (Jan 20-Feb 18), Pisces (Feb 19-Mar 20), Aries (Mar 21-Apr 19), Taurus (Apr 20-May 20), Gemini (May 21-Jun 20), Cancer (Jun 21-Jul 22), Leo (Jul 23-Aug 22), Virgo (Aug 23-Sep 22), Libra (Sep 23-Oct 22), Scorpio (Oct 23-Nov 21), Sagittarius (Nov 22-Dec 21)."
      }
    },
    {
      "@type": "Question",
      "name": "What generation am I based on birth year?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generations by birth year: Gen Alpha (2013+), Gen Z (1997-2012), Millennials (1981-1996), Gen X (1965-1980), Baby Boomers (1946-1964), Silent Generation (1928-1945), Greatest Generation (before 1928). This calculator shows your generation based on birth year."
      }
    },
    {
      "@type": "Question",
      "name": "How many days until my next birthday?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Calculate days until your next birthday by finding when your birth month/day occurs next. If it's already passed this year, it will be next year. This calculator shows exact days remaining and what age you'll turn."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Age Calculator - Calculate Exact Age, Zodiac Sign, Generation',
  description: 'Free age calculator to find your exact age in years, months, days, hours. Discover your zodiac sign, generation, life stage, and days until next birthday.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgeCalculator />
    </Suspense>
  );
}