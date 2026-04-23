import type { Metadata } from 'next';
import { Suspense } from 'react';
import HTTPHeadersReference from '@/components/HTTPHeadersReference';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are HTTP headers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTTP headers are key-value pairs sent with HTTP requests and responses. Provide metadata about request/response: content type, authentication, caching, security. Request headers: sent by client (User-Agent, Accept, Authorization). Response headers: sent by server (Content-Type, Cache-Control, Set-Cookie). Headers enable content negotiation, caching, security, CORS."
      }
    },
    {
      "@type": "Question",
      "name": "What are common request headers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common request headers: Accept - content types client accepts. Authorization - authentication credentials. Content-Type - request body media type. User-Agent - client software info. Host - target server domain. Cookie - send stored cookies. Origin - request source for CORS. Cache-Control - cache directives. Accept-Encoding - compression support."
      }
    },
    {
      "@type": "Question",
      "name": "What are common response headers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common response headers: Content-Type - response media type. Cache-Control - caching rules. Set-Cookie - send cookies to client. Location - redirect URL. Content-Length - body size. Content-Encoding - compression applied. ETag - resource version. Access-Control-Allow-Origin - CORS allowed origins. Strict-Transport-Security - HTTPS enforcement."
      }
    },
    {
      "@type": "Question",
      "name": "What are security headers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Security headers protect web applications. Content-Security-Policy: restrict resource sources, prevent XSS. Strict-Transport-Security: force HTTPS connections. X-Content-Type-Options: block MIME type sniffing. X-Frame-Options: prevent clickjacking via iframe. X-XSS-Protection: XSS filter (deprecated, use CSP instead). Implement all for best security posture."
      }
    },
    {
      "@type": "Question",
      "name": "How do CORS headers work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CORS headers control cross-origin requests. Access-Control-Allow-Origin: allowed origins. Access-Control-Allow-Methods: allowed HTTP methods. Access-Control-Allow-Headers: allowed custom headers. Access-Control-Allow-Credentials: allow cookies. Preflight OPTIONS request sent first for non-simple requests. Server must return CORS headers for browser to allow request."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'HTTP Headers Reference - Request, Response, Security Headers',
  description: 'Complete HTTP headers reference. Request headers, response headers, security headers, CORS configuration, and caching directives for web development.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HTTPHeadersReference />
    </Suspense>
  );
}