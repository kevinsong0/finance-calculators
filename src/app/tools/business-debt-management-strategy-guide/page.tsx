import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessDebtManagementStrategyGuide from '@/components/BusinessDebtManagementStrategyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of business debt exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debt types include: Short-term debt (under 1 year maturity, working capital focus), Long-term debt (over 1 year maturity, capital structure focus), Bank debt (variable maturity, financial flexibility focus), and Bond debt (fixed maturity, market access focus)."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies manage business debt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Management strategies include: debt reduction, debt refinancing, debt restructuring, debt consolidation, debt prioritization, debt scheduling, interest optimization, maturity management, covenant compliance, and debt capacity planning."
      }
    },
    {
      "@type": "Question",
      "name": "What techniques reduce business debt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reduction techniques include: Snowball method (smallest debt first for quick wins), Avalanche method (highest interest first for cost savings), Refinancing (replace with lower rate for interest reduction), and Consolidation (combine multiple debts for simplified management)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure debt management success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: debt-to-equity ratio, debt service coverage, interest coverage ratio, debt maturity profile, average interest rate, debt reduction progress, refinancing savings, and debt capacity utilization."
      }
    },
    {
      "@type": "Question",
      "name": "Why is debt management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debt management ensures financial freedom, reduces interest costs, improves credit rating, enables growth investment, and builds financial resilience. Strategic debt management transforms liabilities into manageable obligations."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Debt Management Strategy Guide - Types, Strategies & Techniques',
  description: 'Debt types, management strategies, reduction techniques, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessDebtManagementStrategyGuide />
    </Suspense>
  );
}
