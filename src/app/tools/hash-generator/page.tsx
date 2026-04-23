import type { Metadata } from 'next';
import { Suspense } from 'react';
import HashGenerator from '@/components/HashGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a cryptographic hash?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cryptographic hash is a one-way function that converts any input into a fixed-size string of characters. Properties: deterministic (same input = same output), fast to compute, infeasible to reverse, small changes create completely different outputs, collision-resistant. SHA-256 produces 256-bit (64 hex characters) output."
      }
    },
    {
      "@type": "Question",
      "name": "Which hash algorithm should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SHA-256 is recommended for most applications: file integrity, digital signatures, data fingerprinting. SHA-512 for maximum security. SHA-1 is deprecated (collision attacks proven). For password storage, use bcrypt or Argon2 instead - they're intentionally slow to resist brute force attacks."
      }
    },
    {
      "@type": "Question",
      "name": "Can I decrypt a hash back to original text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NO. Hashes are one-way functions - there's no decryption. The only way to find the original is by brute force: try every possible input until you find one that produces the same hash. This is why salts are crucial for passwords - they make brute force much harder."
      }
    },
    {
      "@type": "Question",
      "name": "How do hashes verify file integrity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Publisher provides file + its hash. User downloads file, computes hash locally, compares to provided hash. If hashes match, file is intact. If different, file was corrupted or tampered. One bit change produces completely different hash, so tampering is detectable."
      }
    },
    {
      "@type": "Question",
      "name": "Why is SHA-1 deprecated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Researchers found collisions: two different inputs producing the same SHA-1 hash. This breaks collision resistance, making digital signatures and certificates unreliable. SHA-1 collision attack (SHAttered) demonstrated in 2017. Use SHA-256 or SHA-512 for all security applications."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Hash Generator - SHA-256, SHA-512, SHA-1 Online Calculator',
  description: 'Free online hash generator for SHA-1, SHA-256, SHA-384, SHA-512. Generate cryptographic hashes for passwords, file integrity, and data verification. Developer security tool.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HashGenerator />
    </Suspense>
  );
}