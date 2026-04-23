import type { Metadata } from 'next';
import { Suspense } from 'react';
import APIKeyGenerator from '@/components/APIKeyGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I generate a secure API key?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generate secure API key: use 32+ random characters, cryptographically secure random generator. Formats: hexadecimal, base64, UUID v4, alphanumeric. Add prefix for identification (sk_, api_, pk_). Never use predictable values. Store hashed in database. Examples: sk_a1b2c3d4e5f6g7h8, api_123e4567-e89b-12d3-a456-426614174000."
      }
    },
    {
      "@type": "Question",
      "name": "What format should I use for API keys?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API key formats: Hexadecimal - common, URL-safe. Base64 - compact, but + and / may need encoding. UUID v4 - standard format, universally unique. Alphanumeric - human-readable. Choose based on: URL requirements, storage format, existing system conventions. Hex and UUID most common. Length: minimum 32 characters for security."
      }
    },
    {
      "@type": "Question",
      "name": "How should I store API keys?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Store API keys securely: hash keys before database storage (bcrypt, SHA-256), never store plaintext. Store prefix separately if using. Use environment variables for service keys. Encrypt in config files. Implement key rotation. Audit key usage. Delete unused keys. Separate keys by environment. Never commit keys to git."
      }
    },
    {
      "@type": "Question",
      "name": "How long should an API key be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API key length: minimum 32 characters for security, 64+ for high-security. Longer = harder to brute force. UUID: 36 characters (standard). Custom: 32-64 characters. Trade-off: longer keys harder to manage, shorter less secure. Balance usability and security. Use appropriate length for threat model. Industry standard: 32-64 chars."
      }
    },
    {
      "@type": "Question",
      "name": "Should I prefix my API keys?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, prefix API keys: identifies key type (sk_ secret key, pk_ public key, api_ API key), helps detect leaked keys in code, easy visual identification, matches Stripe/AWS patterns. Format: prefix_randomstring. Example: sk_live_abc123, pk_test_xyz789. Different prefixes for environments: sk_test_, sk_prod_. Improves key management."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'API Key Generator - Generate Secure API Keys',
  description: 'Generate secure API keys for applications. Hex, base64, UUID, alphanumeric formats. Add custom prefix. Create multiple keys at once.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <APIKeyGenerator />
    </Suspense>
  );
}