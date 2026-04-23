import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCostBenefitAnalysisGuide from '@/components/BusinessCostBenefitAnalysisGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What methods are used in cost-benefit analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis methods include: Net Present Value (discounted cash flow analysis for investment value), ROI analysis (return on investment ratio for profitability), Break-even analysis (cost recovery point for risk threshold), and Payback period (investment recovery time for time to profit)."
      }
    },
    {
      "@type": "Question",
      "name": "What steps are involved in cost-benefit analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis steps include: identify decision options, list all costs, list all benefits, quantify monetary values, account for time factors, apply discount rates, calculate net benefits, compare alternatives, assess qualitative factors, and make informed decision."
      }
    },
    {
      "@type": "Question",
      "name": "What factors are considered in cost-benefit analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Factors include: Direct costs (quantifiable, explicit expenses), Indirect costs (estimated, hidden expenses), Tangible benefits (measurable, concrete gains), and Intangible benefits (subjective, qualitative value). Both monetary and non-monetary factors matter."
      }
    },
    {
      "@type": "Question",
      "name": "When should cost-benefit analysis be used?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Applications include: project evaluation, investment decisions, policy assessment, technology adoption, process changes, vendor selection, resource allocation, and risk assessment. Use CBA for any decision with significant costs and benefits."
      }
    },
    {
      "@type": "Question",
      "name": "Why is cost-benefit analysis important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cost-benefit analysis provides rational decision-making, quantifies trade-offs, compares alternatives, and ensures resources are allocated efficiently. It transforms subjective decisions into objective evaluations."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Cost-Benefit Analysis Guide - Methods, Steps & Factors',
  description: 'Analysis methods, implementation steps, cost-benefit factors, and common applications.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCostBenefitAnalysisGuide />
    </Suspense>
  );
}