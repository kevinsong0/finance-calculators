import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessReturnOnInvestmentAnalysisGuide from '@/components/BusinessReturnOnInvestmentAnalysisGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of ROI analysis exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ROI types include: ROI ratio (gain/cost for investment efficiency), Annualized ROI (ROI per year for time comparison), Risk-adjusted ROI (ROI adjusted for risk for risk consideration), and Incremental ROI (marginal gain/cost for additional investment)."
      }
    },
    {
      "@type": "Question",
      "name": "What steps perform ROI analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis steps include: identify investment costs, estimate expected returns, calculate ROI percentage, consider time factors, assess risk factors, compare alternatives, determine investment viability, make investment decision, monitor actual returns, and evaluate ROI achievement."
      }
    },
    {
      "@type": "Question",
      "name": "What factors affect ROI analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Considerations include: Time horizon (return timing, present value evaluation), Risk level (return certainty, risk adjustment evaluation), Alternative uses (opportunity cost, comparative ROI evaluation), and Cash flow pattern (return distribution, cash timing evaluation)."
      }
    },
    {
      "@type": "Question",
      "name": "When should ROI analysis be used?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Applications include: capital investments, marketing campaigns, technology projects, training programs, process improvements, new product development, market expansion, and asset acquisition. Use ROI analysis for any investment decision."
      }
    },
    {
      "@type": "Question",
      "name": "Why is ROI analysis important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ROI analysis guides investment decisions, quantifies returns, compares alternatives, ensures efficient allocation, and measures success. ROI transforms subjective investment decisions into objective evaluations."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Return on Investment Analysis Guide - Types, Steps & Applications',
  description: 'ROI types, analysis steps, key considerations, and common applications.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessReturnOnInvestmentAnalysisGuide />
    </Suspense>
  );
}
