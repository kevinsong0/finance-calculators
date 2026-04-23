import type { Metadata } from 'next';
import { Suspense } from 'react';
import APIDocumentationGuide from '@/components/APIDocumentationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I write API documentation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API documentation structure: Overview (purpose, base URL, versioning). Authentication (API keys, OAuth, headers). Endpoints (each endpoint with method, path, parameters, request body, response). Errors (status codes, error format). Rate limits (limits, retry strategies). Examples (code in multiple languages). Changelog (updates, deprecations). Tools: Swagger/OpenAPI for interactive docs, Postman for testing, Redoc for rendering. Good docs: self-service, no support tickets needed."
      }
    },
    {
      "@type": "Question",
      "name": "What is OpenAPI/Swagger?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OpenAPI (formerly Swagger): standard format for REST API documentation. YAML/JSON file describing: endpoints, methods, parameters, request/response schemas, authentication. Benefits: machine-readable, auto-generate docs, client SDKs, validation, testing. Swagger UI: interactive documentation (try endpoints in browser). Swagger Editor: write and validate OpenAPI specs. Use OpenAPI 3.0+ for modern features. Tools: swagger-jsdoc, swagger-ui-express for Node.js integration."
      }
    },
    {
      "@type": "Question",
      "name": "What are the RESTful API methods?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RESTful methods: GET (retrieve data, no body, safe/idempotent). POST (create new resource, body required, not idempotent). PUT (update entire resource, body required, idempotent). PATCH (partial update, body with changes, not always idempotent). DELETE (remove resource, no body, idempotent). HEAD (get headers only, no body). OPTIONS (get allowed methods). Idempotent = same result from repeated calls. Use correct method for operation type."
      }
    },
    {
      "@type": "Question",
      "name": "How do I document API errors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Error documentation: List all error codes (400, 401, 403, 404, 429, 500). Consistent error format: { error: { code: 'USER_NOT_FOUND', message: '...', details: {} } }. Include: HTTP status code, error code (machine-readable), message (human-readable), details (context). Document each error: when it occurs, how to fix. Example responses for each error. Retry guidance for 5xx/429. Good error docs = developers can debug without contacting support."
      }
    },
    {
      "@type": "Question",
      "name": "What should API rate limit documentation include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rate limit documentation: Limits (requests per minute/hour/day), headers returned (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset), response when exceeded (429 status, Retry-After header), retry strategies (exponential backoff, queue requests), how to request higher limits (contact support, upgrade plan). Example: 100 requests/minute, X-RateLimit headers in every response, 429 with retry guidance. Clear rate limit docs prevent frustration and abuse."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'API Documentation Guide - Structure, Best Practices & Tools',
  description: 'RESTful methods, documentation sections, best practices, and tools.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <APIDocumentationGuide />
    </Suspense>
  );
}