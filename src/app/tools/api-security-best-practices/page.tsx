import type { Metadata } from 'next';
import { Suspense } from 'react';
import APISecurityBestPractices from '@/components/APISecurityBestPractices';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I secure my API?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Secure API: use HTTPS/TLS always, implement authentication (API key, OAuth, JWT), rate limiting per user/key, validate all input, sanitize output, use CORS properly, log auth attempts, store secrets in environment variables, use strong tokens, implement scopes/permissions. OWASP API Security Top 10 provides comprehensive guidance."
      }
    },
    {
      "@type": "Question",
      "name": "What authentication method should I use for API?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose auth method: API Key for simple app identification. OAuth 2.0 for user authorization and third-party apps. JWT for stateless, scalable auth with user context. Session cookies for traditional web apps. Consider: complexity, user context needs, mobile/client apps, third-party integration. Most APIs: API key + JWT combination."
      }
    },
    {
      "@type": "Question",
      "name": "How do I implement API rate limiting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rate limiting: limit requests per IP, API key, or user. Typical: 100/min, 1000/hour. Implement: Redis counters, sliding window algorithm. Response: 429 Too Many Requests, Retry-After header. Protect: DDoS, brute force, abuse. Tools: express-rate-limit, Nginx limit_req, API gateway features. Track usage per endpoint separately."
      }
    },
    {
      "@type": "Question",
      "name": "What are common API security vulnerabilities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API vulnerabilities: Broken authentication (weak tokens, no rate limit), Broken access control (missing permission checks), Injection (SQL, command), Sensitive data exposure (unencrypted), Security misconfiguration (default settings, verbose errors), Rate limiting missing, CORS misconfiguration, Mass assignment. OWASP API Security Top 10 lists all."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use JWT or API keys?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JWT vs API key: JWT for user context, short-lived, self-contained, stateless, scopes support. API key for application identification, long-lived, simple, no user info. Use both: API key identifies app, JWT identifies user session. JWT better for user actions, API key for server-to-server. JWT requires expiry handling, refresh tokens."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'API Security Best Practices - Authentication, Rate Limiting Guide',
  description: 'API security guide. Authentication methods, best practices, common vulnerabilities, rate limiting. Secure API endpoints.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <APISecurityBestPractices />
    </Suspense>
  );
}