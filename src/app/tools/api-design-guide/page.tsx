import type { Metadata } from 'next';
import { Suspense } from 'react';
import APIDesignGuide from '@/components/APIDesignGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I design RESTful API endpoints?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RESTful endpoint design: Resource-oriented (nouns not verbs) - /users, /orders, /products. Hierarchical for relationships - /users/{id}/orders. Use plural nouns - /users not /user. Lowercase, hyphens for multi-word - /user-profiles. Version in URL or header - /v1/users. Consistent naming across API. Avoid: /getUsers, /createOrder, /deleteProduct (action verbs). Instead: GET /users, POST /users, DELETE /users/{id}. Good naming = self-documenting, predictable, intuitive."
      }
    },
    {
      "@type": "Question",
      "name": "What HTTP status codes should API return?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTTP status codes: Success: 200 OK (GET, PUT, PATCH success), 201 Created (POST resource created), 204 No Content (DELETE success, no body). Client errors: 400 Bad Request (invalid input), 401 Unauthorized (not authenticated), 403 Forbidden (no permission), 404 Not Found (resource missing), 422 Unprocessable Entity (validation failed), 429 Too Many Requests (rate limit). Server errors: 500 Internal Server Error (server fault), 503 Service Unavailable (down). Use correct codes - helps clients handle responses properly. Never return 200 for errors."
      }
    },
    {
      "@type": "Question",
      "name": "How do I implement API pagination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API pagination methods: Offset/Limit (simple) - GET /users?offset=0&limit=20, easy but inefficient for large datasets, can miss/duplicate items if data changes. Cursor-based (efficient) - GET /users?after_id=123&limit=20, uses last item ID as cursor, consistent results, handles data changes well. Keyset pagination - GET /users?created_after=2024-01-01, filter by indexed field, very fast for ordered data. Include pagination metadata: { data: [], total: 100, offset: 0, limit: 20, next: '/users?offset=20' }. Cursor recommended for large, changing datasets."
      }
    },
    {
      "@type": "Question",
      "name": "How should I version APIs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API versioning strategies: URL path (/v1/users, /v2/users) - most common, explicit, easy to route. Header (Accept: application/vnd.api.v1+json) - cleaner URLs, client specifies version. Query parameter (/users?version=1) - simple but less standard. Hostname (v1.api.example.com) - separate deployments. Recommendation: URL path for public APIs (most visible), header for internal APIs. Maintain backward compatibility when possible. Deprecate old versions gracefully (announce timeline, support both during transition). Document version changes clearly."
      }
    },
    {
      "@type": "Question",
      "name": "What makes a good API error response?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good API error response: Correct HTTP status code (not 200). Consistent structure: { error: { code: 'USER_NOT_FOUND', message: 'User with ID 123 does not exist', details: { userId: 123 } } }. Machine-readable error code (for program handling). Human-readable message (for debugging). Request details (what failed). Documentation link (for more info). Include timestamp, request ID (for support). Examples: 400 { error: { code: 'VALIDATION_ERROR', message: 'Email is required', details: { field: 'email' } } }. Consistent errors = easier debugging, better developer experience."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'API Design Guide - REST Principles, Status Codes & Best Practices',
  description: 'REST API design principles, status codes, pagination, and best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <APIDesignGuide />
    </Suspense>
  );
}