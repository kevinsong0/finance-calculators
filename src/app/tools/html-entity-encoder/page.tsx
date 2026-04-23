import type { Metadata } from 'next';
import { Suspense } from 'react';
import HTMLEntityEncoder from '@/components/HTMLEntityEncoder';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are HTML entities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTML entities are special codes that represent characters which have special meaning in HTML or cannot be typed easily. Format: &name; (named) or &#number; (numeric). Example: &lt; displays as <, &amp; displays as &, &copy; displays as copyright symbol."
      }
    },
    {
      "@type": "Question",
      "name": "Why encode HTML entities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Encoding prevents XSS attacks: <script> becomes &lt;script&gt; which displays as text instead of executing. Also displays special characters in HTML: symbols (©, €, °), reserved chars (<, >, &, quotes), characters not on keyboard. Essential for user input sanitization."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between named and numeric entities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Named entities: &lt;, &amp;, &copy; - easier to read, limited set. Numeric entities: &#60;, &#169; - any Unicode character, &#x3C; for hex format. Numeric works for all characters including emojis: &#x1F600; for 😀. Named only for common symbols."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prevent XSS with HTML encoding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Encode all user input before displaying in HTML: convert < to &lt;, > to &gt;, & to &amp;, quotes to &quot; or &#39;. This makes malicious <script>alert('xss')</script> display harmlessly as text. Use server-side encoding libraries or client-side sanitization before rendering."
      }
    },
    {
      "@type": "Question",
      "name": "What characters must be encoded in HTML?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Required: < (less than), > (greater than), & (ampersand) - these have special HTML meaning. In attributes: \" (double quote), ' (single quote) must be encoded. Optional: symbols like ©, €, non-ASCII characters. Encode reserved chars always; symbols only if needed for display."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'HTML Entity Encoder & Decoder - Convert Special Characters',
  description: 'Free online HTML entity encoder and decoder. Encode special characters to prevent XSS, decode HTML entities back to text. Security tool for web developers and content sanitization.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HTMLEntityEncoder />
    </Suspense>
  );
}