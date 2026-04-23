import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessFinancialStatementAnalysisGuide from '@/components/BusinessFinancialStatementAnalysisGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What financial statements are analyzed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial statements include: Balance sheet (assets, liabilities, equity for financial position), Income statement (revenue, expenses, profit for profitability), Cash flow statement (cash movements for liquidity), and Equity statement (owner changes for ownership tracking)."
      }
    },
    {
      "@type": "Question",
      "name": "What techniques analyze financial statements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis techniques include: horizontal analysis, vertical analysis, ratio analysis, common-size analysis, trend analysis, comparative analysis, segment analysis, DuPont analysis, quality of earnings, and red flag detection."
      }
    },
    {
      "@type": "Question",
      "name": "What ratio categories are analyzed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ratio categories include: Profitability ratios (margin, ROI, ROE for earning ability), Liquidity ratios (current, quick ratios for short-term health), Efficiency ratios (turnover ratios for asset utilization), and Solvency ratios (debt ratios for long-term stability)."
      }
    },
    {
      "@type": "Question",
      "name": "What factors affect statement analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Considerations include: accounting policies, revenue recognition, expense timing, asset valuation, disclosure completeness, management integrity, industry context, and economic conditions. These factors ensure accurate interpretation."
      }
    },
    {
      "@type": "Question",
      "name": "Why is financial statement analysis important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Statement analysis reveals business transparency, identifies risks, guides investment decisions, supports lending decisions, and enables benchmarking. Analyzed statements transform raw data into actionable insights."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Financial Statement Analysis Guide - Statements & Techniques',
  description: 'Financial statements, analysis techniques, ratio categories, and interpretation considerations.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessFinancialStatementAnalysisGuide />
    </Suspense>
  );
}