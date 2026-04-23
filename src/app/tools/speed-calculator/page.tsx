import type { Metadata } from 'next';
import { Suspense } from 'react';
import SpeedCalculator from '@/components/SpeedCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate speed from distance and time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Speed = Distance ÷ Time. Example: 100 km in 2 hours = 50 km/h. Use this calculator to convert between km/h, mph, m/s automatically. Enter distance and time, select units, get speed in multiple formats."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate travel time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Time = Distance ÷ Speed. Example: 500 km at 100 km/h = 5 hours. The calculator shows time in hours, minutes, seconds format. Useful for trip planning, arrival time estimation, and scheduling."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate distance traveled?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Distance = Speed × Time. Example: 60 km/h for 3 hours = 180 km. Enter speed and time, the calculator shows distance in km, miles, meters. Use for trip planning, commute estimation, and running routes."
      }
    },
    {
      "@type": "Question",
      "name": "What is average running speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Average running speeds: casual jog 8-10 km/h, recreational runner 10-12 km/h, competitive runner 14-16 km/h, elite marathoner 20+ km/h. Walking average is 5 km/h. Use this calculator to track your pace."
      }
    },
    {
      "@type": "Question",
      "name": "How do I convert between km/h and mph?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "km/h to mph: divide by 1.60934. mph to km/h: multiply by 1.60934. Example: 100 km/h = 62.14 mph. This calculator automatically converts between km/h, mph, m/s, ft/s for you."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Speed Distance Time Calculator - Calculate Travel Speed and Time',
  description: 'Free speed distance time calculator. Calculate speed from distance and time, find travel time, estimate distance. Perfect for trip planning and running.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SpeedCalculator />
    </Suspense>
  );
}