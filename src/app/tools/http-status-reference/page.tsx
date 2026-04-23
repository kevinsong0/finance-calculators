import type { Metadata } from 'next';
import { Suspense } from 'react';
import HTTPStatusReference from '@/components/HTTPStatusReference';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are HTTP status codes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTTP status codes are 3-digit numbers returned by servers to indicate request outcome. Categories: 1xx informational, 2xx success, 3xx redirect, 4xx client error, 5xx server error. Common codes: 200 OK, 404 Not Found, 500 Internal Server Error. Codes tell browsers and clients how to handle responses."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between 401 and 403?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "401 Unauthorized: authentication required or failed - user needs to log in or provide valid credentials. 403 Forbidden: authenticated but not authorized - user lacks permission to access resource even with valid credentials. 401 = 'Who are you?', 403 = 'I know who you are, but you can't access this.'"
      }
    },
    {
      "@type": "Question",
      "name": "What causes 500 Internal Server Error?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "500 is generic server error. Common causes: code exceptions, database connection failures, timeout errors, configuration issues, memory limits exceeded, syntax errors in server code. Debugging: check server logs for stack traces, verify database connections, test code locally, review recent changes, check error handling."
      }
    },
    {
      "@type": "Question",
      "name": "What does 429 Too Many Requests mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "429 indicates rate limiting: client sent too many requests in given time period. API responses include Retry-After header. Causes: aggressive polling, loop without delay, missing caching, distributed systems hitting same endpoint. Solutions: implement backoff, add delays, use caching, respect rate limits."
      }
    },
    {
      "@type": "Question",
      "name": "How do I fix 404 Not Found errors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "404 troubleshooting: verify URL spelling, check resource exists, confirm routing configuration, verify file permissions, check case sensitivity, ensure server is running, verify API endpoint path matches documentation. For APIs: check endpoint definition, verify resource ID exists. For websites: check link validity, verify page published."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'HTTP Status Code Reference - Complete Guide for Developers',
  description: 'Complete HTTP status code reference. Search 200, 404, 500 and more. Understand server responses, debug API errors, troubleshoot web applications. DevOps and developer tool.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HTTPStatusReference />
    </Suspense>
  );
}