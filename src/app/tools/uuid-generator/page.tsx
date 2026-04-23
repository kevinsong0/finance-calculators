import type { Metadata } from 'next';
import { Suspense } from 'react';
import UUIDGenerator from '@/components/UUIDGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a UUID?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "UUID (Universally Unique Identifier) is a 128-bit identifier standard (RFC 4122). It's 36 characters: 32 hexadecimal digits plus 4 hyphens. Example: 550e8400-e29b-41d4-a716-446655440000. Collision probability is astronomically low - generating billions still unlikely to duplicate."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between UUID v1 and v4?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "UUID v1 is time-based: includes timestamp (60 bits) and MAC address (48 bits). Sortable but reveals machine identity and time. UUID v4 is random: 122 random bits, no predictability or traceability. v4 recommended for privacy and security, v1 for sortable distributed IDs."
      }
    },
    {
      "@type": "Question",
      "name": "How unique are UUIDs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "UUID collision probability is negligible. For v4: after generating 1 billion UUIDs, collision chance is 0.00000000006%. Practically guaranteed unique across all systems worldwide. No need for central coordination - generate independently and they won't clash."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use UUID as database primary key?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, UUIDs are excellent primary keys for distributed systems, no central ID authority needed. Pros: globally unique, no sequential gaps, can generate client-side. Cons: larger than integers (16 bytes vs 4), slightly slower indexing, not naturally sortable (use v1 or ULID if needed)."
      }
    },
    {
      "@type": "Question",
      "name": "What is GUID vs UUID?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GUID (Globally Unique Identifier) and UUID are effectively the same. GUID is Microsoft's name, UUID is the RFC standard name. Both use same 128-bit format, same generation algorithms. Microsoft GUID = RFC UUID. Use UUID term for cross-platform, GUID for Windows-specific."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'UUID Generator - Generate UUID v4, v1 Unique Identifiers',
  description: 'Free online UUID generator for bulk unique identifier creation. UUID v4 (random) and v1 (time-based), multiple output formats. Generate database keys, API IDs, session tokens.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <UUIDGenerator />
    </Suspense>
  );
}