import type { Metadata } from 'next';
import { Suspense } from 'react';
import MarkdownCheatSheet from '@/components/MarkdownCheatSheet';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create headers in Markdown?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Headers use # symbols: # H1 (one # for level 1), ## H2 (two # for level 2), ### H3, #### H4, ##### H5, ###### H6. Alternative H1: underline with ===. Alternative H2: underline with ---. Closing # optional: # Title #. Headers create document structure for navigation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I add links and images in Markdown?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Links: [link text](https://url.com) - brackets for text, parentheses for URL. Links with title: [text](url 'title'). Reference links: [text][ref] then define [ref]: url. Images: ![alt text](url) - exclamation mark before brackets. Images with title: ![alt](url 'title'). Markdown doesn't support image sizing directly, use HTML: <img src='url' width='100'>."
      }
    },
    {
      "@type": "Question",
      "name": "How do I create code blocks in Markdown?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inline code: `code` with single backticks. Fenced code block: triple backticks ``` above and below code. Code with language: ```javascript then code then ```. Supported languages: js, python, ruby, html, css, bash, etc. Indented code: 4 spaces or 1 tab before each line. Syntax highlighting depends on renderer (GitHub, VS Code support many languages)."
      }
    },
    {
      "@type": "Question",
      "name": "How do I create tables in Markdown?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tables: headers on first line | header | header |, separator with dashes |---|---|, rows | cell | cell |. Alignment: |:--| left, |:--:| center, |--:| right (colons indicate alignment). Must have header and separator rows. Complex tables may need HTML. GFM (GitHub Flavored Markdown) supports tables standard."
      }
    },
    {
      "@type": "Question",
      "name": "What is GitHub Flavored Markdown?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GFM extends standard Markdown: task lists - [ ] incomplete / - [x] complete, tables with | separators, strikethrough ~~text~~, autolinks for URLs without brackets, syntax highlighting in code blocks, mentions @username and issue references #123, emoji :emoji_name:, alerts NOTE, WARNING, TIP. GitHub READMEs, issues, comments all use GFM."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Markdown Cheat Sheet - Complete Markdown Syntax Reference',
  description: 'Complete Markdown syntax reference. Headers, emphasis, links, images, lists, code blocks, tables. Essential for GitHub, documentation, and blog writing.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MarkdownCheatSheet />
    </Suspense>
  );
}