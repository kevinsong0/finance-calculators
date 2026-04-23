import type { Metadata } from 'next';
import { Suspense } from 'react';
import JSONFormatter from '@/components/JSONFormatter';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I format JSON?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste your JSON into the input field. The formatter automatically validates and beautifies it with proper indentation. Choose 2 or 4 space indentation, optionally sort keys alphabetically. Copy formatted output for use in documentation or debugging."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my JSON invalid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common JSON errors: missing quotes around keys/values, trailing commas in arrays/objects, single quotes instead of double quotes, unescaped special characters, mismatched brackets. The error message shows exact position. Fix syntax errors before the JSON can be parsed."
      }
    },
    {
      "@type": "Question",
      "name": "What is JSON minification?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Minification removes all whitespace and newlines from JSON, making it as compact as possible. This reduces file size for API payloads and storage. A 500-line formatted JSON might minify to a single line. Use minified JSON in production, formatted for debugging."
      }
    },
    {
      "@type": "Question",
      "name": "How do JSON paths work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON paths navigate nested structures: .key accesses object property, [0] accesses array index, .*.key gets a key from all array items, ..key finds key recursively. Tools like jq use paths for querying. JavaScript uses bracket notation: obj.items[0].name."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between JSON and JavaScript objects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON is a strict subset of JavaScript: keys must be quoted with double quotes, no trailing commas, no comments, strings must use double quotes. JavaScript objects allow unquoted keys (if valid identifiers), trailing commas, single quotes, comments. JSON.parse() converts JSON string to JS object."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator - Beautify, Minify, Analyze JSON',
  description: 'Free online JSON formatter for developers. Validate JSON, beautify with indentation, minify for production, view structure statistics. Debug API responses and config files.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <JSONFormatter />
    </Suspense>
  );
}