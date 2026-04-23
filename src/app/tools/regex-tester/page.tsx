import type { Metadata } from 'next';
import { Suspense } from 'react';
import RegexTester from '@/components/RegexTester';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I test a regular expression?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enter your regex pattern in the pattern field, add flags (g for global, i for case-insensitive), and input your test string. Matches are highlighted in yellow instantly. View match details including position and capture groups."
      }
    },
    {
      "@type": "Question",
      "name": "What are regex flags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flags modify regex behavior: g (global) finds all matches, i (case-insensitive) ignores case, m (multiline) makes ^ and $ match line boundaries, s (dotall) lets . match newlines, u (unicode) enables unicode features. Combine flags like 'gi' for multiple effects."
      }
    },
    {
      "@type": "Question",
      "name": "How do capture groups work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Parentheses () create capture groups that extract parts of matches. For phone (\\d{3})-(\\d{3})-(\\d{4}), groups capture area code, prefix, line number. Named groups (?<name>...) give groups names. Non-capture groups (?:...) group without capturing."
      }
    },
    {
      "@type": "Question",
      "name": "What regex patterns match email addresses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simple: \\b\\w+@\\w+\\.\\w+\\b matches basic emails. Complex: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,} handles most real emails. Full RFC-compliant regex is extremely long. For validation, prefer simple patterns or dedicated validators."
      }
    },
    {
      "@type": "Question",
      "name": "Why do developers need regex testers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Regex testers help developers: debug patterns before deploying, visualize matches to verify behavior, learn regex syntax with examples, test edge cases and special characters, validate input patterns for forms. Essential tool for text processing, validation, and parsing."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Regex Tester - Test Regular Expressions with Live Highlighting',
  description: 'Free online regex tester for developers. Test regular expressions with instant match highlighting, capture group visualization, and syntax reference. Debug patterns for JavaScript, Python, and more.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RegexTester />
    </Suspense>
  );
}