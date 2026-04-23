import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCashFlowAnalysisGuide from '@/components/BusinessCashFlowAnalysisGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the main types of cash flow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow types include: Operating cash flow (from core business, primary importance), Investing cash flow (from asset activities, secondary importance), Financing cash flow (from capital activities, secondary importance), and Free cash flow (available capital, key metric for investors)."
      }
    },
    {
      "@type": "Question",
      "name": "What methods are used for cash flow analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis methods include: direct method analysis, indirect method analysis, cash flow forecasting, break-even analysis, working capital analysis, cash conversion cycle, liquidity ratio analysis, cash budgeting, trend analysis, and comparative analysis."
      }
    },
    {
      "@type": "Question",
      "name": "What are key cash flow indicators?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key indicators include: Cash ratio (cash/current liabilities for immediate liquidity), Quick ratio ((cash+receivables)/liabilities for near-term liquidity), Operating cash ratio (OCF/current liabilities for operational liquidity), and Cash burn rate (cash/monthly expenses for survival months)."
      }
    },
    {
      "@type": "Question",
      "name": "How can businesses improve cash flow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Improvement actions include: accelerate receivables, delay payables, reduce inventory, cut operating costs, increase sales velocity, negotiate better terms, optimize payment timing, and improve collection process. These actions optimize cash position."
      }
    },
    {
      "@type": "Question",
      "name": "Why is cash flow analysis important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow analysis reveals financial health, identifies liquidity risks, guides financial decisions, and ensures business survival. Positive cash flow sustains operations, while negative cash flow threatens business continuity."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Cash Flow Analysis Guide - Types, Methods & Indicators',
  description: 'Cash flow types, analysis methods, key indicators, and improvement actions for financial health.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCashFlowAnalysisGuide />
    </Suspense>
  );
}