import type { Metadata } from 'next';
import { Suspense } from 'react';
import Base64Encoder from '@/components/Base64Encoder';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Base64 encoding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Base64 is a binary-to-text encoding scheme that converts binary data into ASCII characters using 64 symbols: A-Z, a-z, 0-9, plus + and /. It's used when binary data needs to be stored or transmitted over media designed for text, like email or JSON APIs."
      }
    },
    {
      "@type": "Question",
      "name": "What is URL-safe Base64?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "URL-safe Base64 replaces + with - and / with _, removing characters that have special meaning in URLs. It also removes trailing = padding. Used in JWT tokens, data URLs, and anywhere Base64 appears in URL paths or query parameters."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use Base64 for HTTP Basic Auth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Basic Auth encodes username:password as Base64. The header format is: Authorization: Basic base64(username:password). For user:pass, encode 'user:pass' to get 'dXNlcjpwYXNz'. Note: Base64 is NOT encryption - use HTTPS to protect credentials in transit."
      }
    },
    {
      "@type": "Question",
      "name": "Why does Base64 output grow by 33%?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Base64 encodes 3 bytes into 4 characters. Every 3 input bytes become 4 output bytes, a 4/3 ratio or 33% increase. For example, 12 bytes encode to 16 characters. This overhead is the tradeoff for having only safe ASCII characters in the output."
      }
    },
    {
      "@type": "Question",
      "name": "Is Base64 secure encryption?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NO. Base64 is encoding, not encryption. Anyone can decode Base64 back to original text. It provides zero security - it's just a representation format. Never use Base64 to protect secrets. Use proper encryption (AES, RSA) for security, then optionally Base64 encode the encrypted output."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder - URL-Safe Encoding for Developers',
  description: 'Free online Base64 encoder and decoder. Convert text to Base64, decode Base64 strings, URL-safe variant for APIs and JWT. Developer tool for Basic Auth, data URLs, and API debugging.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Base64Encoder />
    </Suspense>
  );
}