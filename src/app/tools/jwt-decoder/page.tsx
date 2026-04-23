import type { Metadata } from 'next';
import { Suspense } from 'react';
import JWTDecoder from '@/components/JWTDecoder';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a JWT token?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JWT (JSON Web Token) is a compact, URL-safe token format for transmitting claims between parties. Structure: header.payload.signature, each base64url encoded. Header specifies algorithm, payload contains claims (user ID, expiration, etc.), signature ensures integrity. Used for authentication, API authorization, and single sign-on."
      }
    },
    {
      "@type": "Question",
      "name": "How do I decode a JWT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JWT decoding: split token by dots into 3 parts, base64url decode each part. Header and payload are JSON objects, signature is a hash. This decoder shows all three parts. Note: decoding reveals payload without verification - always verify signature with proper key before trusting claims."
      }
    },
    {
      "@type": "Question",
      "name": "What claims are in a JWT payload?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard claims: sub (subject/user ID), iss (issuer), aud (audience), exp (expiration timestamp), iat (issued at timestamp), nbf (not valid before). Custom claims: roles, permissions, email, name, organization. Claims determine what the token represents and when it's valid."
      }
    },
    {
      "@type": "Question",
      "name": "How do I check if JWT is expired?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Check exp claim: Unix timestamp of expiration. Compare to current time: if exp timestamp < now, token is expired. This decoder highlights expiration status. For 1-hour token: exp = iat + 3600. API servers reject expired tokens with 401 Unauthorized."
      }
    },
    {
      "@type": "Question",
      "name": "Can I verify JWT signature?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Signature verification requires: 1) the secret key (for HMAC algorithms like HS256) or 2) the public key (for RSA algorithms like RS256). Verification confirms token wasn't tampered. This decoder only decodes - it doesn't verify. Use jwt.verify() in your application code with proper key."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'JWT Decoder - Decode JSON Web Tokens Online',
  description: 'Free online JWT decoder. Inspect JWT header, payload, and signature. View claims like expiration, issuer, subject. Debug authentication tokens and API authorization.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <JWTDecoder />
    </Suspense>
  );
}