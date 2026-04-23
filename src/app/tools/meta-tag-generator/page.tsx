import type { Metadata } from 'next';
import { Suspense } from 'react';
import MetaTagGenerator from '@/components/MetaTagGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are SEO meta tags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO meta tags provide information about webpage to search engines and social media. Title tag: displayed in search results, browser tabs. Description meta: summary shown in search results. Keywords meta: topic keywords (less important now). Open Graph tags: control social media sharing appearance. Twitter Card tags: control Twitter share display."
      }
    },
    {
      "@type": "Question",
      "name": "How long should meta title and description be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Title: 50-60 characters optimal. Google truncates after ~60 chars. Description: 150-160 characters optimal. Google may truncate or ignore longer descriptions. Write compelling copy within limits. Include keywords naturally. Avoid keyword stuffing. Each page should have unique title and description."
      }
    },
    {
      "@type": "Question",
      "name": "What is Open Graph meta tags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open Graph tags control how content appears when shared on Facebook, LinkedIn, other social platforms. og:title: share title. og:description: share description. og:image: share image URL. og:url: canonical URL. og:type: content type (website, article). Use 1200x630 pixel images for best display."
      }
    },
    {
      "@type": "Question",
      "name": "What is Twitter Card meta tags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Twitter Card tags control how links appear on Twitter. twitter:card: card type (summary, summary_large_image). twitter:title: share title. twitter:description: share description. twitter:image: share image. twitter:site: Twitter account. Large image cards more engaging. Test with Twitter Card Validator."
      }
    },
    {
      "@type": "Question",
      "name": "Where do I place meta tags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Place all meta tags inside &lt;head&gt; section of HTML. Before other scripts if possible. Title tag required in head. Meta tags follow title. Open Graph and Twitter tags after basic meta. Use unique tags for each page. Validate with Facebook Sharing Debugger and Twitter Card Validator."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Meta Tag Generator - SEO, Open Graph, Twitter Card Tags',
  description: 'Generate SEO meta tags, Open Graph, and Twitter Card tags. Optimize title, description, and social media sharing for better visibility.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MetaTagGenerator />
    </Suspense>
  );
}