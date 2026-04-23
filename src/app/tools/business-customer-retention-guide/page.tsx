import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCustomerRetentionGuide from '@/components/BusinessCustomerRetentionGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What strategies retain customers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retention strategies include customer experience (service excellence for satisfaction), value delivery (consistent value for perceived benefit), relationship building (personal connection for loyalty), problem resolution (quick fixes for trust recovery), engagement programs (regular touchpoints for connection), and loyalty rewards (benefit programs for incentive)."
      }
    },
    {
      "@type": "Question",
      "name": "What loyalty programs can businesses implement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Loyalty programs include loyalty point systems, tiered membership levels, exclusive member benefits, referral reward programs, subscription discounts, early access offers, personalized communications, and customer appreciation events."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure customer retention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retention metrics include retention rate (customers retained divided by total showing retention success), churn rate (customers lost divided by total showing loss rate), customer lifetime (average duration showing relationship length), and repeat purchase rate (repeat customers divided by total showing loyalty behavior)."
      }
    },
    {
      "@type": "Question",
      "name": "What actions improve customer retention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retention actions include monitoring satisfaction signals, addressing issues promptly, personalizing communications, providing ongoing value, creating engagement opportunities, rewarding loyalty behavior, building community connections, and anticipating customer needs."
      }
    },
    {
      "@type": "Question",
      "name": "How does customer retention impact profitability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Customer retention significantly impacts profitability because retained customers cost less to serve than new ones, purchase more over time, refer other customers, provide valuable feedback, and generate stable revenue. A 5% increase in retention can increase profits by 25-95% depending on industry."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Customer Retention Guide - Strategies, Programs & Metrics',
  description: 'Retention strategies, loyalty programs, key metrics, and improvement actions.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCustomerRetentionGuide />
    </Suspense>
  );
}