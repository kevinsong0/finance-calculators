import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCreditManagementGuide from '@/components/BusinessCreditManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of business credit exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit types include: Trade credit (supplier financing, working capital focus), Bank credit (bank financing, liquidity focus), Customer credit (customer receivables, revenue collection focus), and Line of credit (flexible borrowing, cash flexibility focus)."
      }
    },
    {
      "@type": "Question",
      "name": "What processes manage business credit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Management processes include: credit assessment, credit approval, credit monitoring, credit collection, credit adjustment, credit reporting, credit risk evaluation, credit limit setting, credit terms negotiation, and credit policy enforcement."
      }
    },
    {
      "@type": "Question",
      "name": "What policies govern business credit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit policies include: Credit limits (risk containment through customer categorization), Credit terms (payment timing through standard terms), Collection procedures (receivables recovery through step-by-step process), and Credit review (regular assessment through periodic evaluation)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure credit management success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: days sales outstanding, credit utilization ratio, bad debt percentage, collection efficiency, credit loss ratio, average collection period, credit approval rate, and credit risk score."
      }
    },
    {
      "@type": "Question",
      "name": "Why is credit management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit management ensures financial discipline, controls risk, improves cash flow, reduces bad debt, and supports growth. Effective credit management transforms credit from risk into opportunity."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Credit Management Guide - Types, Processes & Policies',
  description: 'Credit types, management processes, governing policies, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCreditManagementGuide />
    </Suspense>
  );
}
