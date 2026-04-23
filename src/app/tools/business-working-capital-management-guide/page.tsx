import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessWorkingCapitalManagementGuide from '@/components/BusinessWorkingCapitalManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the components of working capital?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Working capital components include: Current assets (cash, receivables, inventory as operating resources), Current liabilities (payables, short-term debt as operating obligations), Working capital (assets minus liabilities as operating buffer), and Net working capital (adjusted working capital as true liquidity)."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies optimize working capital?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Optimization strategies include: optimize cash balance, accelerate collections, manage inventory levels, negotiate payment terms, use credit facilities, forecast cash needs, monitor liquidity ratios, control credit extension, streamline payables, and balance working capital."
      }
    },
    {
      "@type": "Question",
      "name": "What ratios measure working capital health?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key ratios include: Current ratio (assets/liabilities, target above 1.5), Quick ratio ((cash+receivables)/liabilities, target above 1.0), Cash conversion cycle (DSO+DIO-DPO, minimize days), and Working capital turnover (revenue/working capital, maximize ratio)."
      }
    },
    {
      "@type": "Question",
      "name": "What risks affect working capital?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common risks include: liquidity crisis, cash flow mismatch, collection delays, inventory buildup, credit extension risks, supplier payment issues, seasonal fluctuations, and growth capital needs. Managing these risks ensures operational stability."
      }
    },
    {
      "@type": "Question",
      "name": "Why is working capital management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Working capital management ensures operational liquidity, supports daily operations, prevents cash crises, enables growth, and optimizes financial efficiency. Proper management balances liquidity with profitability."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Working Capital Management Guide - Components & Strategies',
  description: 'Working capital components, management strategies, key ratios, and common risks for liquidity.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessWorkingCapitalManagementGuide />
    </Suspense>
  );
}