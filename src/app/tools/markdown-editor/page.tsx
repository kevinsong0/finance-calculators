import type { Metadata } from 'next';
import { Suspense } from 'react';
import MarkdownEditor from '@/components/MarkdownEditor';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Markdown?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Markdown is a lightweight markup language for formatting text using simple syntax. Created by John Gruber in 2004, it converts to HTML for web display. Key features: readable as plain text, converts to HTML, supported everywhere (GitHub, Stack Overflow, Reddit, documentation)."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write Markdown headers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use # symbols before text: # for Heading 1, ## for Heading 2, ### for Heading 3, etc. Up to 6 levels. Example: ## Features produces an h2 HTML element. Headers create document structure and navigation in rendered output."
      }
    },
    {
      "@type": "Question",
      "name": "How do I create links in Markdown?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inline link: [link text](URL). Example: [GitHub](https://github.com) renders as clickable link. Reference link: [text][ref] with [ref]: URL later in document. Auto-link: <URL> for raw URLs. Images: ![alt text](image-url) similar syntax with ! prefix."
      }
    },
    {
      "@type": "Question",
      "name": "How do I format code in Markdown?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inline code: wrap in single backticks `code`. Code block: triple backticks ``` on separate lines before and after. Add language after opening backticks for syntax highlighting: ```javascript, ```python, etc. Indented code: 4 spaces or tab before each line (older syntax)."
      }
    },
    {
      "@type": "Question",
      "name": "Why use Markdown for documentation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Markdown benefits: portable (plain text files), version control friendly (diffs readable), platform independent (works everywhere), human readable (even unrendered), fast to write (simple syntax), converts to HTML/PDF/Word. Standard for README files, technical docs, blogs, API documentation."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Markdown Editor - Write and Preview Markdown Live',
  description: 'Free online Markdown editor with real-time preview. Write Markdown, see rendered HTML output instantly. Perfect for README files, documentation, blog posts, GitHub issues.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MarkdownEditor />
    </Suspense>
  );
}