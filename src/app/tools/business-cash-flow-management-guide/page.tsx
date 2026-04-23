import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCashFlowManagementGuide from '@/components/BusinessCashFlowManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the components of business cash flow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow components include operating cash (business operations as core funding), investing cash (asset transactions for capital decisions), financing cash (debt and equity for external funding), working capital (current assets for short-term liquidity), reserve funds (saved cash for emergency buffer), and credit access (borrowing capacity for flexibility)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the cash flow management process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves tracking all cash movements, categorizing cash flows, projecting future cash, identifying shortfalls, planning mitigation actions, monitoring cash position, optimizing timing, managing receivables, controlling payables, and reviewing regularly."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies improve cash flow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow strategies include accelerating receivables (cash inflow faster through prompt invoicing), delaying payables (cash retention longer through negotiated terms), reducing expenses (lower cash outflow through cost cutting), and building reserves (safety buffer through regular saving)."
      }
    },
    {
      "@type": "Question",
      "name": "What challenges affect cash flow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common challenges include seasonal fluctuations, unexpected expenses, delayed payments, overextension, insufficient reserves, poor forecasting, timing mismatches, and credit constraints."
      }
    },
    {
      "@type": "Question",
      "name": "How often should cash flow be monitored?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow should be monitored daily for businesses with tight liquidity, weekly for most businesses, and monthly for stable businesses with strong reserves. More frequent monitoring is needed during growth phases, seasonal peaks, or financial stress periods."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Cash Flow Management Guide - Components, Process & Strategies',
  description: 'Cash flow components, management process, improvement strategies, and challenges.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCashFlowManagementGuide />
    </Suspense>
  );
}