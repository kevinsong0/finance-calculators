import type { Metadata } from 'next';
import { Suspense } from 'react';
import RegexCheatSheet from '@/components/RegexCheatSheet';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are regex character classes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Regex character classes: \\d matches digits 0-9, \\D matches non-digits, \\w matches word characters (a-z, A-Z, 0-9, _), \\W matches non-word, \\s matches whitespace (space, tab, newline), \\S matches non-whitespace, . matches any character except newline. Use character classes to match specific character types efficiently."
      }
    },
    {
      "@type": "Question",
      "name": "What are regex quantifiers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Regex quantifiers control how many times a pattern matches: * means 0 or more times (a* matches empty, a, aaa), + means 1 or more (a+ matches a, aaa), ? means 0 or 1 (a? matches empty or a), {n} means exactly n times, {n,} means n or more, {n,m} means between n and m times. Quantifiers apply to the preceding character or group."
      }
    },
    {
      "@type": "Question",
      "name": "What are regex anchors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Regex anchors match positions, not characters: ^ matches start of string or line (with m flag), $ matches end of string or line, \\b matches word boundary (between word and non-word), \\B matches non-word boundary. Anchors are zero-width matches. Use ^...$ to match entire string, \\b...\\b to match whole words."
      }
    },
    {
      "@type": "Question",
      "name": "What are regex groups and lookarounds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Regex groups: (...) captures for backreference, (?:...) groups without capturing, (?=...) positive lookahead (match if followed by), (?!...) negative lookahead (match if NOT followed by), (?<=...) positive lookbehind (match if preceded), (?<!...) negative lookbehind (match if NOT preceded). Lookarounds are zero-width assertions."
      }
    },
    {
      "@type": "Question",
      "name": "What are regex modifiers/flags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Regex modifiers change matching behavior: i makes case-insensitive (abc matches ABC), g finds all matches not just first, m makes ^ and $ match line boundaries not just string boundaries, s makes . match newline too, x allows whitespace and comments in pattern. JavaScript: /pattern/gi, Python: re.compile(pattern, re.I | re.M)."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Regex Cheat Sheet - Complete Regular Expression Syntax Reference',
  description: 'Complete regex syntax reference. Character classes, anchors, quantifiers, groups, lookarounds, sets, modifiers. Quick reference for JavaScript, Python, PHP regex patterns.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RegexCheatSheet />
    </Suspense>
  );
}