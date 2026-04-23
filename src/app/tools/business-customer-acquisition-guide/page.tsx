import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCustomerAcquisitionGuide from '@/components/BusinessCustomerAcquisitionGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What channels acquire customers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Acquisition channels include content marketing (medium cost, slow speed, high quality), paid advertising (high cost, fast speed, medium quality), social media (low cost, medium speed, variable quality), SEO (low cost, slow speed, high quality), referral programs (medium cost, medium speed, high quality), and direct sales (high cost, fast speed, high quality)."
      }
    },
    {
      "@type": "Question",
      "name": "What process guides customer acquisition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Acquisition process includes defining target customer, identifying acquisition channels, creating acquisition content, building landing pages, implementing tracking, launching campaigns, monitoring performance, optimizing conversion, scaling successful channels, and calculating acquisition cost."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics track customer acquisition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key metrics include CAC (acquisition cost divided by customer showing cost efficiency), conversion rate (customers divided by leads showing channel effectiveness), lead volume (total leads generated showing channel reach), and CAC:LTV ratio (CAC divided by customer lifetime value showing profitability)."
      }
    },
    {
      "@type": "Question",
      "name": "How can acquisition be optimized?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Optimization tactics include improving landing pages, refining targeting, enhancing messaging, testing different offers, optimizing channel mix, reducing acquisition cost, increasing conversion rate, and speeding up conversion time."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good customer acquisition cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A good CAC depends on business model and customer lifetime value (LTV). Generally, CAC should be significantly lower than LTV - ideally CAC:LTV ratio of 1:3 or better. For subscription businesses, CAC should be recoverable within 12 months of customer revenue."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Customer Acquisition Guide - Channels, Process & Metrics',
  description: 'Acquisition channels, process, key metrics, and optimization tactics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCustomerAcquisitionGuide />
    </Suspense>
  );
}