import type { Metadata } from 'next';
import { Suspense } from 'react';
import HTTPErrorCodes from '@/components/HTTPErrorCodes';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are HTTP error codes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTTP error codes: 3-digit status codes returned by server. 4xx: client errors - request problem. 5xx: server errors - server problem. Common: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error. Each code indicates specific error type. First digit indicates category."
      }
    },
    {
      "@type": "Question",
      "name": "What does HTTP 404 error mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTTP 404 Not Found: requested resource does not exist on server. Causes: wrong URL, deleted resource, typo in endpoint, moved resource. Fix: check URL spelling, verify endpoint exists, update links. Common for broken links. Custom 404 pages help users. Check routing configuration."
      }
    },
    {
      "@type": "Question",
      "name": "What does HTTP 500 error mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTTP 500 Internal Server Error: generic server-side error. Server encountered unexpected condition. Causes: code error, database failure, configuration problem, resource exhaustion. Fix: check server logs, stack trace, database connection, memory usage. Debug server code. Most common server error."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between 401 and 403?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "401 Unauthorized: authentication required, not logged in. 403 Forbidden: authenticated but not permitted. 401: need credentials, login, API key. 403: credentials valid but access denied - wrong role, permissions. 401: missing auth. 403: wrong permissions. Both require different fixes."
      }
    },
    {
      "@type": "Question",
      "name": "How do I debug HTTP errors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debug HTTP errors: use DevTools Network panel, check request headers and body, examine response body for error details, test with curl/Postman, verify endpoint URL, check authentication, review server logs. 4xx: fix client request. 5xx: check server-side. Use HTTP error reference for fixes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'HTTP Error Codes Reference - 4xx and 5xx Status Codes',
  description: 'Complete HTTP error codes reference. Client errors (400-499), server errors (500-599). Causes and fixes for 401, 403, 404, 500, and more.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HTTPErrorCodes />
    </Suspense>
  );
}