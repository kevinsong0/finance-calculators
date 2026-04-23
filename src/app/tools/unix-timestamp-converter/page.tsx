import type { Metadata } from 'next';
import { Suspense } from 'react';
import UnixTimestampConverter from '@/components/UnixTimestampConverter';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a Unix timestamp?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unix timestamp is the number of seconds since January 1, 1970 00:00:00 UTC (Unix Epoch). It's a timezone-independent integer that increases by 1 every second. Used universally in databases, APIs, logs, and file systems for time representation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I convert Unix timestamp to date?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In JavaScript: new Date(timestamp * 1000) for seconds, new Date(timestamp) for milliseconds. In Python: datetime.fromtimestamp(timestamp). In PHP: date('Y-m-d', timestamp). Online converters like this tool handle both seconds and milliseconds automatically."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between seconds and milliseconds timestamp?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Seconds timestamp: 10-digit integer (e.g., 1704067200). Milliseconds timestamp: 13-digit integer (e.g., 1704067200000). JavaScript Date uses milliseconds internally. Unix/Linux typically uses seconds. Milliseconds provide more precision (dates within same second)."
      }
    },
    {
      "@type": "Question",
      "name": "Why does Unix timestamp start at 1970?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unix Epoch (1970-01-01) was chosen when Unix was developed in the early 1970s. January 1 makes calculations simpler (month boundaries don't affect day count). Early Unix developers needed a simple, arbitrary starting point. Timestamp 0 represents this epoch."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when Unix timestamp exceeds 32-bit integer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "32-bit signed integer max is 2147483647 seconds = January 19, 2038. This 'Year 2038 problem' affects older systems. Modern systems use 64-bit integers, extending range to billions of years. Most current systems are already 64-bit and unaffected."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter - Convert Timestamp to Date & Date to Timestamp',
  description: 'Free online Unix timestamp converter. Convert timestamps in seconds or milliseconds to human-readable dates. Convert dates to Unix timestamp. Developer tool for API debugging, logs, and databases.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <UnixTimestampConverter />
    </Suspense>
  );
}