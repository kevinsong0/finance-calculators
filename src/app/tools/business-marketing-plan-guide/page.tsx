import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessMarketingPlanGuide from '@/components/BusinessMarketingPlanGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What components should a marketing plan include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plan components include market analysis (industry and competition for strategic insight), target audience (customer segments for focus clarity), marketing goals (objectives and targets for direction), marketing strategy (approach and positioning for competitive edge), marketing tactics (channels and activities for execution plan), and budget allocation (resource distribution for funding clarity)."
      }
    },
    {
      "@type": "Question",
      "name": "What marketing channels can businesses use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Marketing channels include digital marketing, content marketing, social media, email marketing, search marketing, traditional advertising, events and tradeshows, and public relations."
      }
    },
    {
      "@type": "Question",
      "name": "What process guides marketing planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Planning process includes setting marketing objectives, analyzing market situation, defining target audience, developing positioning, choosing marketing channels, creating marketing content, allocating marketing budget, setting implementation timeline, defining success metrics, and monitoring and adjusting."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure marketing success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include customer acquisition (new customers measured by growth rate), marketing ROI (return on spend measured by efficiency), conversion rate (lead conversion measured by effectiveness), and customer retention (repeat customers measured by loyalty)."
      }
    },
    {
      "@type": "Question",
      "name": "How often should marketing plans be reviewed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Marketing plans should be reviewed quarterly for tactical adjustments, annually for strategic updates, and immediately when significant market changes occur, campaign performance deviates significantly, or new opportunities or threats emerge."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Marketing Plan Guide - Components, Channels & Metrics',
  description: 'Marketing plan components, channels, planning process, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessMarketingPlanGuide />
    </Suspense>
  );
}