import type { Metadata } from 'next';
import { Suspense } from 'react';
import RegexGenerator from '@/components/RegexGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I validate email with regex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Basic email regex: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}. JavaScript: const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/; emailRegex.test('user@example.com'). Note: Simple regex allows invalid emails. For full validation, use RFC 5322 regex or validation libraries (validator.js)."
      }
    },
    {
      "@type": "Question",
      "name": "How do I match phone numbers with regex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "US phone regex: \\d{3}-\\d{3}-\\d{4} matches 123-456-7890. International: \\+?\\d{1,3}[-.\\s]?\\d+ for various formats. JavaScript: const phoneRegex = /\\d{3}-\\d{3}-\\d{4}/; phoneRegex.test('123-456-7890'). For production, normalize input first (remove spaces, dashes) then validate."
      }
    },
    {
      "@type": "Question",
      "name": "How do I validate URLs with regex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "URL regex: https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\/\\w\\-.,@?^=%&:~+#]*. Matches http/https URLs. JavaScript: const urlRegex = /https?:\\/\\/\\S+/; urlRegex.test('https://example.com'). For full validation, use URL constructor in JavaScript: try { new URL(string); return true; } catch { return false; }."
      }
    },
    {
      "@type": "Question",
      "name": "What regex validates credit card numbers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit card regex: \\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4} matches 16 digits with optional spaces/dashes. Card-specific: Visa (4\\d{12}(\\d{3})?), Mastercard (5[1-5]\\d{14}), Amex (3[47]\\d{13}). For validation, also check Luhn algorithm. Libraries like validator.js handle this correctly."
      }
    },
    {
      "@type": "Question",
      "name": "How do I escape special characters in regex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Escape special chars with backslash: \\., \\*, \\+, \\?, \\^, \\$, \\|, \\(, \\), \\[, \\], \\{, \\}. In JavaScript strings, double escape: '\\\\.' for literal dot. Use RegExp.escape() (ES2025) or escape function: str.replace(/[.*+?^${}()|[\\]\\]/g, '\\\\$&'). Test regex patterns carefully."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Regex Pattern Generator - Email, Phone, URL, Credit Card Regex',
  description: 'Generate common regex patterns for email, phone, URL, IP address, date, credit card, and more. Get ready-to-use regex with code examples for JavaScript, Python, and PHP validation.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RegexGenerator />
    </Suspense>
  );
}