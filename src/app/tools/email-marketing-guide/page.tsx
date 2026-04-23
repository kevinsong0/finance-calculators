import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmailMarketingGuide from '@/components/EmailMarketingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes a good email subject line?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good subject lines: Clear and specific (tell what's inside). Personalized (use name, location). Compelling (create curiosity, urgency). Under 50 characters (mobile display). Avoid spam triggers (FREE, ALL CAPS, excessive punctuation). Examples: 'Your weekly update', 'John, 20% off ends tonight', '3 tips to boost productivity'. A/B test subject lines (try variations). Match email content to subject (no misleading). Subject line = open rate driver, test continuously."
      }
    },
    {
      "@type": "Question",
      "name": "What are email marketing metrics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Email metrics: Open Rate (opened emails / delivered, target 20-30%). Click Rate (clicked link / opened, target 2-5%). Conversion Rate (completed action / clicked, varies by goal). Bounce Rate (failed delivery / sent, keep below 2%). Unsubscribe Rate (opted out / delivered, below 0.5%). List Growth Rate (new subscribers minus lost). Track over time, benchmark against industry. Improve low metrics: Open rate = better subjects. Click rate = better content/CTA. Bounce rate = clean list. Conversion = better offer/landing page."
      }
    },
    {
      "@type": "Question",
      "name": "How do I avoid spam filters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Avoid spam filters: Use clean sender reputation (don't send from spam-flagged domain). Avoid spam trigger words (FREE, BUY NOW, CLICK HERE, GUARANTEED). Don't use ALL CAPS or excessive punctuation (!!!!). Include unsubscribe link (legal requirement). Use authentication (SPF, DKIM, DMARC). Send relevant content (engagement affects reputation). Maintain clean list (remove bounces, inactive). Balance text and images (don't send image-only emails). Test deliverability (tools: Mail Tester, Glock Apps). Spam complaints hurt sender reputation long-term."
      }
    },
    {
      "@type": "Question",
      "name": "Should I segment my email list?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Segment email list: Yes, segmentation improves results significantly. Segments: Demographics (age, location, gender). Behavior (past purchases, engagement level). Interests (content preferences). Stage (new subscriber, customer, churned). Timing (send time preferences). Benefits: Relevant content = higher engagement. Higher open/click rates (studies show 14%+ improvement). Better conversions. Reduced unsubscribes. More personal connection. Start simple (engaged vs inactive), refine over time. Segmentation = foundation of effective email marketing."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I send marketing emails?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Email frequency: Balance relevance vs annoyance. Weekly: good for newsletters, updates. Bi-weekly: moderate engagement. Monthly: minimum for staying top of mind. Promotional: limit to 1-2 per week max. Rules: Let subscribers choose frequency preference. Consistency matters (same day/time weekly). Quality over quantity (don't send just to send). Watch unsubscribe rate (increases if over-mailing). Segment engaged users (send more to active, less to inactive). Test optimal frequency for your audience. Too much = unsubscribes. Too little = forgotten."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Email Marketing Guide - Components, Metrics & Best Practices',
  description: 'Email components, key metrics, best practices, and spam trigger avoidance.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmailMarketingGuide />
    </Suspense>
  );
}