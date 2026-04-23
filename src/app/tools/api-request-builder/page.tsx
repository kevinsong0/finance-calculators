import type { Metadata } from 'next';
import { Suspense } from 'react';
import APIRequestBuilder from '@/components/APIRequestBuilder';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an HTTP API request?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTTP API request is a message sent to a server to perform an operation. Contains: method (GET/POST/PUT/DELETE), URL (endpoint), headers (metadata), body (data for POST/PUT). Server responds with status code (200, 404, 500) and data. Used for REST APIs, web services, mobile app backends."
      }
    },
    {
      "@type": "Question",
      "name": "How do I make an API request with curl?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "curl command: curl -X METHOD 'URL' -H 'Header: Value' -d 'body'. GET: curl 'https://api.example.com/users'. POST: curl -X POST 'https://api.example.com/users' -H 'Content-Type: application/json' -d '{\"name\":\"John\"}'. Auth: -H 'Authorization: Bearer token'. curl is built into Linux/Mac, download for Windows."
      }
    },
    {
      "@type": "Question",
      "name": "How do I make an API request with fetch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "fetch('URL', {method: 'GET', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)}).then(res => res.json()).then(data => console.log(data)). For POST/PUT, include body. Headers object format. Async/await: const res = await fetch(...); const data = await res.json();. Browser native, no library needed."
      }
    },
    {
      "@type": "Question",
      "name": "What is API authentication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API auth methods: Bearer token (Authorization: Bearer token), Basic auth (Base64 encoded username:password), API key (X-API-Key: key header or query param), OAuth 2.0 (complex flow with access tokens), JWT (JSON Web Token with signature). Most APIs require auth to prevent unauthorized access."
      }
    },
    {
      "@type": "Question",
      "name": "What headers should I include in API requests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common headers: Content-Type (application/json for JSON body), Accept (response format expected), Authorization (credentials), User-Agent (client identification), Cache-Control (caching behavior), X-API-Key (custom auth). GET requests don't need Content-Type. POST/PUT/PATCH need Content-Type matching body format."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'API Request Builder - Generate curl, fetch, Axios Code for HTTP APIs',
  description: 'Build HTTP API requests with curl, fetch code. Configure method, URL, headers, body, and authentication. Generate ready-to-use code snippets for REST API testing and integration.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <APIRequestBuilder />
    </Suspense>
  );
}