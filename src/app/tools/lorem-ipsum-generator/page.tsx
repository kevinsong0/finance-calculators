import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoremIpsumGenerator from '@/components/LoremIpsumGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Lorem Ipsum?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lorem Ipsum is placeholder text used in design and publishing since the 1500s. It's derived from a Latin text by Cicero, scrambled to produce nonsensical filler. The text has no meaningful content, allowing designers to focus on layout without being distracted by readable text."
      }
    },
    {
      "@type": "Question",
      "name": "Why use Lorem Ipsum instead of real text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lorem Ipsum provides realistic word distribution and letter spacing without meaning. Real text draws attention and influences design decisions. Placeholder text lets you evaluate typography, spacing, and layout objectively. It's standard practice in wireframes, mockups, and prototypes."
      }
    },
    {
      "@type": "Question",
      "name": "Where does Lorem Ipsum come from?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lorem Ipsum originates from 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. Sections 1.10.32 and 1.10.33 were scrambled in the 1500s by an unknown printer. The classic passage begins 'Lorem ipsum dolor sit amet...'."
      }
    },
    {
      "@type": "Question",
      "name": "How much Lorem Ipsum should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Match your expected real content: 1 paragraph for short sections, 3-5 for articles, 5-10 for full pages. Consider word count: 50-100 words for teasers, 300-500 for blog posts, 1000+ for long articles. Generator lets you customize quantity by paragraphs, sentences, or words."
      }
    },
    {
      "@type": "Question",
      "name": "Is there an alternative to Lorem Ipsum?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alternatives: 1) Real content if available - best for accurate design decisions. 2) Other placeholder text generators (Hipster Ipsum, Corporate Ipsum). 3) Blind text with random characters. Lorem Ipsum remains most popular because it looks natural and is universally recognized by designers."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Placeholder Text for Design',
  description: 'Free Lorem Ipsum generator for placeholder text. Generate paragraphs, sentences, or words for wireframes, mockups, and design prototypes. Customizable quantity.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LoremIpsumGenerator />
    </Suspense>
  );
}