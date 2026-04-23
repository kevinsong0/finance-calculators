import type { Metadata } from 'next';
import { Suspense } from 'react';
import HTTPMethodCheatSheet from '@/components/HTTPMethodCheatSheet';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between GET and POST?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GET retrieves data without modifying server (safe, cacheable, no body). POST creates new resource (unsafe, not cacheable, has body). GET parameters in URL query string. POST data in request body. GET can be bookmarked and cached. POST cannot. Use GET for reading data, POST for creating resources."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between PUT and PATCH?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PUT replaces entire resource with new data (full update). PATCH partially updates specific fields (partial update). PUT requires complete resource data. PATCH only needs changed fields. PUT is idempotent (same result repeated). PATCH can be idempotent if designed correctly. Use PUT for full replacement, PATCH for partial updates."
      }
    },
    {
      "@type": "Question",
      "name": "What HTTP methods are idempotent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Idempotent methods: GET, HEAD, OPTIONS, PUT, DELETE. Same request multiple times produces same result. Not idempotent: POST (creates new resource each time). PATCH can be idempotent if designed correctly. Idempotency important for retry logic and caching. Safe methods (GET, HEAD, OPTIONS) are always idempotent and don't modify server."
      }
    },
    {
      "@type": "Question",
      "name": "When should I use DELETE method?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DELETE removes resource from server. Use DELETE for removing data. DELETE is idempotent (deleting same resource twice gives same result). Successful DELETE returns 200 OK or 204 No Content. Body optional. Should require authentication and authorization. Cannot be cached. Commonly used in REST APIs for resource removal."
      }
    },
    {
      "@type": "Question",
      "name": "What is HEAD method used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HEAD returns headers only without body, like GET without response content. Use HEAD to: check if resource exists, get metadata (size, type, last-modified), test links, verify caching. HEAD is safe and cacheable. Useful for checking file size before downloading. Returns same headers as GET would return."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'HTTP Methods Reference - GET, POST, PUT, PATCH, DELETE Guide',
  description: 'Complete reference for HTTP request methods. Learn GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS, CONNECT, TRACE. Understand when to use each method for REST APIs.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HTTPMethodCheatSheet />
    </Suspense>
  );
}