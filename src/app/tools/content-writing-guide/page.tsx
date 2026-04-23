import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContentWritingGuide from '@/components/ContentWritingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I write good web content?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good web content: Clear headline (capture attention, communicate value). Know audience (write for specific reader). Structure with headings (H2, H3 for scannability). Short paragraphs (3-4 sentences max). Active voice (direct, engaging). Value first (answer questions, solve problems). Examples and evidence (concrete, credible). Edit ruthlessly (remove fluff). SEO basics (keyword in title, headings, natural placement). Readable format (bullets, bold key points). Web readers scan - make it easy to find value quickly."
      }
    },
    {
      "@type": "Question",
      "name": "How long should blog posts be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Blog post length: Short posts (500-800 words): news, updates, simple topics. Standard posts (1000-1500 words): most common, good for SEO. Long-form (2000+ words): comprehensive guides, higher SEO potential. Pillar content (3000+ words): ultimate guides, authority building. Rule: Length for topic coverage, not arbitrary number. Cover topic thoroughly = better content. Longer posts tend to rank better (more depth, keywords). But quality > length - don't pad. Match length to intent: quick answer vs deep dive."
      }
    },
    {
      "@type": "Question",
      "name": "What is SEO writing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO writing: creating content optimized for search engines and readers. Elements: Target keyword (research what users search). Keyword in title (natural placement). Keywords in headings (H1, H2). Keyword in first paragraph. Natural keyword density (1-2%, not over-optimized). Internal links (connect related content). External links (cite sources). Meta description (compelling summary). Alt text for images. Structure (headings, bullets). Quality content first, SEO second. Write for readers, optimize for search. Modern SEO = valuable content + technical optimization."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write headlines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Headline writing: Clear (communicate what content delivers). Specific (numbers, details work well). Compelling (curiosity, benefit, urgency). Short (50-60 characters for SEO display). Include keyword (SEO, relevance). Types: How to (How to Write a Resume in 5 Steps). List (10 Tips for Better Productivity). Question (What Makes a Great Leader?). Benefit (Save 2 Hours Daily with This Method). Number + benefit = effective formula (7 Ways to Boost Sales). Test multiple headlines. Headline = most read element, invest time in it."
      }
    },
    {
      "@type": "Question",
      "name": "How do I edit content effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Content editing: First draft = get ideas down (don't edit while writing). Second pass = structure (reorganize, add headings). Third pass = clarity (simplify sentences, remove jargon). Fourth pass = brevity (cut unnecessary words, tighten). Fifth pass = grammar (typos, punctuation). Sixth pass = SEO (keywords, meta). Read aloud (catch awkward phrasing). Let it rest (come back fresh). Use tools (Grammarly, Hemingway). Delete 20% of first draft (fluff, repetition). Good writing = rewriting. Edit until every sentence adds value."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Content Writing Guide - Types, Principles & SEO Elements',
  description: 'Content types, writing principles, SEO elements, and writing checklist.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContentWritingGuide />
    </Suspense>
  );
}