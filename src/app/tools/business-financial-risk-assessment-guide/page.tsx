import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessFinancialRiskAssessmentGuide from '@/components/BusinessFinancialRiskAssessmentGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of financial risk exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial risk types include: Market risk (price fluctuations, value volatility), Credit risk (counterparty default, loss exposure), Liquidity risk (cash constraints, operational disruption), and Operational risk (process failures, efficiency loss)."
      }
    },
    {
      "@type": "Question",
      "name": "What methods are used for risk assessment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Assessment methods include: risk identification, risk quantification, probability assessment, impact analysis, risk mapping, scenario analysis, stress testing, sensitivity analysis, VaR calculation, and risk aggregation."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure financial risk?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk metrics include: Probability of occurrence (likelihood estimate, risk frequency), Impact magnitude (consequence severity, risk severity), Expected loss (probability × impact, risk exposure), and Risk-adjusted return (return after risk, net value)."
      }
    },
    {
      "@type": "Question",
      "name": "How should businesses respond to financial risks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Response strategies include: risk avoidance, risk reduction, risk transfer, risk acceptance, risk hedging, risk diversification, risk monitoring, and risk contingency. Choose strategies based on risk type and business capacity."
      }
    },
    {
      "@type": "Question",
      "name": "Why is financial risk assessment important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial risk assessment provides proactive protection, quantifies exposures, guides risk response, prevents losses, and supports strategic decisions. Unassessed risks create unexpected losses; assessed risks enable managed outcomes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Financial Risk Assessment Guide - Types, Methods & Metrics',
  description: 'Risk types, assessment methods, measurement metrics, and response strategies.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessFinancialRiskAssessmentGuide />
    </Suspense>
  );
}