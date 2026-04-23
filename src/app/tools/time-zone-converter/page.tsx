import type { Metadata } from 'next';
import { Suspense } from 'react';
import TimeZoneConverter from '@/components/TimeZoneConverter';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I convert time between different time zones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enter the time in the source time zone, select both source and target zones. The converter calculates the time difference based on UTC offsets and shows the converted time instantly. Useful for scheduling international meetings."
      }
    },
    {
      "@type": "Question",
      "name": "What is UTC time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "UTC (Coordinated Universal Time) is the global time standard used as reference for all time zones. UTC doesn't change with seasons. Time zones are expressed as offsets from UTC: UTC+8 means 8 hours ahead of UTC, UTC-5 means 5 hours behind."
      }
    },
    {
      "@type": "Question",
      "name": "How do time zone offsets work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Time zones have offsets from UTC: positive offsets are east of UTC (earlier time), negative offsets are west (later time). Example: UTC+9 (Tokyo) is 9 hours ahead of UTC. When it's noon UTC, it's 9 PM in Tokyo. DST adds +1 hour during summer."
      }
    },
    {
      "@type": "Question",
      "name": "When is the best time for international meetings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For US-Europe meetings: 9-11 AM EST works (2-4 PM Europe). For US-Asia: early morning PST or late afternoon EST. For global meetings: 7-10 AM UTC works for most regions. Avoid scheduling during local sleeping hours."
      }
    },
    {
      "@type": "Question",
      "name": "Does this converter account for daylight saving time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This converter uses standard offsets. For precise DST calculation, check local DST rules: US DST (Mar-Nov), Europe DST (Mar-Oct), no DST in most of Asia. The offset shown may need adjustment during DST periods."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Time Zone Converter - Convert Time Between World Time Zones',
  description: 'Free time zone converter to calculate time differences between cities. See current time around the world and plan international meetings.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TimeZoneConverter />
    </Suspense>
  );
}