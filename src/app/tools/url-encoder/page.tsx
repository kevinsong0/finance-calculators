import type { Metadata } from 'next';
import { Suspense } from 'react';
import URLEncoder from '@/components/URLEncoder';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is URL encoding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "URL encoding (percent-encoding) converts unsafe characters into %XX format where XX is hex value. Space becomes %20, & becomes %26. Only alphanumeric and -_.!~*'() are safe. Encoding ensures URLs work correctly across browsers, servers, and APIs without breaking due to special characters."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between encodeURI and encodeURIComponent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "encodeURI encodes for full URLs, preserving reserved chars: /?:@&=+$,#. encodeURIComponent encodes for query parameters, encoding ALL special chars. Use encodeURI for 'https://example.com/path', encodeURIComponent for query values like 'search?q=' + encodeURIComponent(userInput)."
      }
    },
    {
      "@type": "Question",
      "name": "Why do spaces become %20 or +?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "%20 is standard URL encoding for space (hex 20). + is legacy form encoding from application/x-www-form-urlencoded. In URLs and URI components, use %20. In form submissions, + is acceptable. decodeURIComponent handles both. Modern APIs expect %20."
      }
    },
    {
      "@type": "Question",
      "name": "When should I encode query parameters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Always encode query parameter values: user input, search terms, IDs, any data that might contain spaces, symbols, or Unicode. Encode the value only, not the key or = or & separators. Example: '?q=' + encodeURIComponent('hello world') gives '?q=hello%20world'."
      }
    },
    {
      "@type": "Question",
      "name": "How do I encode Unicode characters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "encodeURIComponent handles Unicode automatically: '日本' becomes '%E6%97%A5%E6%9C%AC' (UTF-8 encoded as multiple percent-escaped bytes). JavaScript's encode functions use UTF-8. Each Unicode char becomes 2-4 %XX sequences. decodeURIComponent reverses correctly."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'URL Encoder & Decoder - Percent Encoding for URLs',
  description: 'Free online URL encoder and decoder. Encode query parameters, decode URLs. encodeURIComponent and encodeURI. Web developer tool for API URLs, forms, and redirects.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <URLEncoder />
    </Suspense>
  );
}