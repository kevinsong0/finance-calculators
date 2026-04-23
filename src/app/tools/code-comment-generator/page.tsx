import type { Metadata } from 'next';
import { Suspense } from 'react';
import CodeCommentGenerator from '@/components/CodeCommentGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I add comments to my code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use comment syntax for your language. JavaScript: // inline, /* block */, /** JSDoc */. Python: # inline, multi-line string as docstring. CSS: /* comment */. HTML: &lt;!-- comment --&gt;. Comments explain code logic, document functions, mark sections. Good comments explain WHY, not WHAT code does. Use auto-generator for quick documentation."
      }
    },
    {
      "@type": "Question",
      "name": "What is JSDoc documentation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSDoc is JavaScript documentation standard. Format: /** @param {type} name - description */. Tags: @param for parameters, @returns for return value, @function for functions, @class for classes, @example for usage. Generate API docs from JSDoc. IDEs show tooltips from JSDoc. Use JSDoc for public APIs, libraries, complex functions."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write Python docstrings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Python docstrings: triple-quoted string first in function/class. Single line: \"\"\"Description.\"\"\" Multi-line: \"\"\"Description with Args, Returns.\"\"\" Use Google style, NumPy style, or reStructuredText. Args: param: type - description. Returns: type - description. Tools: Sphinx, pydoc generate docs from docstrings."
      }
    },
    {
      "@type": "Question",
      "name": "Why should I comment my code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Comments help: other developers understand code, future self remember logic, document APIs and public interfaces, explain complex algorithms, mark TODOs and FIXMEs. Bad comments: explain obvious code, become outdated, distract from code. Good comments: explain intent, document decisions, clarify edge cases, warn about pitfalls."
      }
    },
    {
      "@type": "Question",
      "name": "How do I generate documentation from comments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JavaScript: JSDoc tool generates HTML docs from /** */ comments. Python: Sphinx, pydoc from docstrings. Java: Javadoc from /** */ comments. Run documentation generator on source code. Output: HTML reference site. Include examples, parameter descriptions, return types. Keep comments updated with code changes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Code Comment Generator - Auto-Generate Code Documentation',
  description: 'Auto-generate comments for JavaScript, Python, CSS, HTML code. JSDoc, docstrings, inline comments. Add documentation to your code instantly.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CodeCommentGenerator />
    </Suspense>
  );
}