import type { Metadata } from 'next';
import { Suspense } from 'react';
import DateCalculator from '@/components/DateCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate the number of days between two dates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enter both dates in the calculator and it will instantly show the difference in days, weeks, months, and years. The calculation accounts for the exact number of days, including leap years when applicable."
      }
    },
    {
      "@type": "Question",
      "name": "How do I add or subtract days from a date?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the Add/Subtract Days mode. Enter your base date and the number of days to add (positive) or subtract (negative). The calculator shows the resulting date with day of week. Useful for calculating deadlines, expiration dates, or planning events."
      }
    },
    {
      "@type": "Question",
      "name": "What is a countdown calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A countdown calculator shows the remaining time until a future date. Enter your target date and see days, hours, and minutes remaining. Perfect for tracking deadlines, events, holidays, or project milestones."
      }
    },
    {
      "@type": "Question",
      "name": "How many days are in a year?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A standard year has 365 days. A leap year has 366 days (adding February 29). Leap years occur every 4 years except century years not divisible by 400. The average year length is 365.25 days accounting for leap years."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate weeks from days?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divide the number of days by 7 to get weeks. For example, 30 days equals approximately 4 weeks and 2 days (4 × 7 = 28, remaining 2 days). The calculator shows both total weeks and remaining days for precise planning."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Date Calculator - Calculate Days Between Dates, Add Days, Countdown',
  description: 'Free date calculator to find days between two dates, add or subtract days from a date, and countdown to events. Calculate deadlines and milestones.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DateCalculator />
    </Suspense>
  );
}