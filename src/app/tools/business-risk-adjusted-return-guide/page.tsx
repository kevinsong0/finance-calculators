import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessRiskAdjustedReturnGuide from '@/components/BusinessRiskAdjustedReturnGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What measures evaluate risk-adjusted returns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance measures include: Sharpe ratio ((return - risk-free)/std dev for risk efficiency), Treynor ratio ((return - risk-free)/beta for market risk efficiency), Jensen alpha (actual - expected return for excess performance), and Information ratio (active return/tracking error for manager skill)."
      }
    },
    {
      "@type": "Question",
      "name": "What steps calculate risk-adjusted performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Calculation steps include: calculate portfolio return, determine risk-free rate, measure portfolio volatility, calculate beta coefficient, compute Sharpe ratio, compute Treynor ratio, calculate Jensen alpha, calculate information ratio, compare to benchmarks, and interpret risk-adjusted performance."
      }
    },
    {
      "@type": "Question",
      "name": "What factors affect risk-adjusted calculations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key factors include: Return volatility (risk measure, standard deviation consideration), Market correlation (beta measure, systematic risk consideration), Time period (calculation accuracy, appropriate horizon consideration), and Benchmark selection (relative performance, proper comparison consideration)."
      }
    },
    {
      "@type": "Question",
      "name": "When should risk-adjusted return analysis be used?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Applications include: portfolio evaluation, manager selection, investment comparison, performance attribution, risk management, strategy assessment, asset allocation, and fund ranking. Use risk-adjusted measures for fair performance comparison."
      }
    },
    {
      "@type": "Question",
      "name": "Why is risk-adjusted return important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk-adjusted return reveals true performance, enables fair comparison, accounts for risk, identifies skill, and supports better decisions. Risk-adjusted metrics transform raw returns into meaningful performance measures."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Risk-Adjusted Return Guide - Measures, Steps & Applications',
  description: 'Performance measures, calculation steps, key factors, and common applications.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessRiskAdjustedReturnGuide />
    </Suspense>
  );
}
