import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessFinancialControlGuide from '@/components/BusinessFinancialControlGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What areas require financial control?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Control areas include: Budgetary control (spending limits, cost management purpose), Cash control (cash flows, liquidity management purpose), Asset control (asset usage, resource efficiency purpose), and Credit control (credit extension, risk management purpose)."
      }
    },
    {
      "@type": "Question",
      "name": "What mechanisms implement financial control?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Control mechanisms include: budget approval process, expense authorization, cash flow monitoring, payment verification, asset tracking system, credit limit enforcement, financial reporting, variance analysis, internal audits, and control reviews."
      }
    },
    {
      "@type": "Question",
      "name": "What principles guide financial control?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Control principles include: Authorization limits (spending thresholds for control boundaries), Segregation duties (separate responsibilities for fraud prevention), Documentation requirements (record keeping for audit trail), and Review procedures (regular checks for error detection)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure control effectiveness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: control compliance rate, budget variance percentage, cash accuracy rate, asset tracking accuracy, credit policy compliance, audit finding reduction, control effectiveness score, and error detection rate."
      }
    },
    {
      "@type": "Question",
      "name": "Why is financial control important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial control ensures accountability, prevents fraud, manages costs, maintains liquidity, and supports compliance. Effective control transforms financial operations from chaotic to controlled."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Financial Control Guide - Areas, Mechanisms & Principles',
  description: 'Control areas, implementation mechanisms, guiding principles, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessFinancialControlGuide />
    </Suspense>
  );
}
