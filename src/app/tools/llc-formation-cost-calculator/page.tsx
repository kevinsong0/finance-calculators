import type { Metadata } from 'next';
import { Suspense } from 'react';
import LLCFormationCostCalculator from '@/components/LLCFormationCostCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does it cost to form an LLC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LLC formation costs vary by state. State filing fees range from $50-200. Delaware charges $90, California $70, New York $200, and Texas $200. Additional costs include operating agreement (~$100), registered agent service (~$200/year), and business license ($50-200). Total first-year costs typically range from $500-1,500 depending on state and services needed."
      }
    },
    {
      "@type": "Question",
      "name": "Why is Delaware popular for LLC formation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Delaware is popular due to its business-friendly Court of Chancery, strong legal precedent, privacy protections (no member names in public records), and investor recognition. Multi-owner LLCs and startups seeking funding often choose Delaware. However, you'll still need to register in your home state if operating there, potentially doubling costs."
      }
    },
    {
      "@type": "Question",
      "name": "What are the annual costs to maintain an LLC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Annual LLC costs include state franchise taxes or annual reports. Delaware charges $300/year, California $800/year minimum franchise tax, New York $200/year. Some states like Texas have no annual fee. If you use a registered agent service, that's an additional $200/year. Total annual costs range from $50-1,000+ depending on state."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a registered agent for my LLC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, every LLC must have a registered agent - a person or entity authorized to receive legal documents in the formation state. If you live in the formation state, you can serve as your own registered agent for free. If forming in a state where you don't reside (like Delaware), you'll need a registered agent service (~$200/year)."
      }
    },
    {
      "@type": "Question",
      "name": "Should I form an LLC in my home state or Delaware?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For single-member LLCs operating locally, your home state is usually simplest and cheapest - no registered agent needed, no foreign registration. For multi-owner LLCs, LLCs seeking investors, or businesses with national operations, Delaware offers advantages despite higher costs. Consider: Will you operate in your home state? Do you need investor-friendly structure? Are cost savings more important than legal advantages?"
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'LLC Formation Cost Calculator - State Filing Fees & Startup Costs',
  description: 'Calculate LLC formation costs by state including filing fees, annual fees, registered agent, and optional services. Compare Delaware vs home state formation.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LLCFormationCostCalculator />
    </Suspense>
  );
}