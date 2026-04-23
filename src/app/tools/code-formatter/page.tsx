import type { Metadata } from 'next';
import { Suspense } from 'react';
import CodeFormatter from '@/components/CodeFormatter';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why format code properly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Proper code formatting improves readability, reduces bugs, and makes code review faster. Consistent indentation shows code structure visually. Good spacing separates logical elements. Professional teams enforce style guides (PEP8 for Python, Google Style for JS). Formatted code is easier to debug, maintain, and share."
      }
    },
    {
      "@type": "Question",
      "name": "What is Prettier?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prettier is an opinionated code formatter for JavaScript, TypeScript, JSON, HTML, CSS, and more. It automatically formats code on save or commit, enforcing consistent style across teams. Install: npm install prettier. Run: prettier --write filename.js. Config: .prettierrc file with rules. Widely adopted in professional development."
      }
    },
    {
      "@type": "Question",
      "name": "What is Python PEP 8 style?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PEP 8 is Python style guide: 4 spaces per indentation level (no tabs), maximum line length 79 characters, spaces around operators, no extra whitespace inside brackets, imports at top separated by groups, function/class names: lowercase_with_underscores. Tools like Black, autopep8, flake8 enforce PEP 8 automatically."
      }
    },
    {
      "@type": "Question",
      "name": "How do I format JSON properly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON formatting: use JSON.stringify(data, null, 2) in JavaScript (2 spaces indent). In Python: json.dumps(data, indent=2). Online tools: paste minified JSON, click format. Proper JSON has keys in quotes, consistent spacing, arrays and objects clearly indented. Formatted JSON is readable for debugging API responses."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use tabs or spaces?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spaces recommended: 2 for JS/TS/JSON (Google, Airbnb style), 4 for Python (PEP 8). Tabs can display differently across editors. Most style guides prefer spaces. Tools like Prettier use spaces by default. Consistency matters more than choice - configure editor to auto-format on save with team's preferred style."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Code Formatter - Beautify JavaScript, Python, JSON, HTML',
  description: 'Free online code formatter. Format JavaScript, TypeScript, Python, JSON, HTML with proper indentation. Improve code readability for review and documentation.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CodeFormatter />
    </Suspense>
  );
}