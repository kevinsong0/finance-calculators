import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessFinancialForecastingGuide from '@/components/BusinessFinancialForecastingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of financial forecasting exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Forecast types include: Revenue forecasting (historical trends, market analysis for income planning), Expense forecasting (cost trends, budget analysis for cost control), Cash forecasting (cash flow analysis for liquidity planning), and Profit forecasting (revenue minus costs for performance projection)."
      }
    },
    {
      "@type": "Question",
      "name": "What techniques are used for financial forecasting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Techniques include: historical trend analysis, regression analysis, moving average methods, seasonal adjustment, scenario planning, driver-based forecasting, rolling forecasts, machine learning models, expert judgment, and market research integration."
      }
    },
    {
      "@type": "Question",
      "name": "What inputs drive financial forecasts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Forecast inputs include: Historical data (past performance, high reliability), Market trends (industry analysis, medium reliability), Economic indicators (macro factors, variable reliability), and Business drivers (internal metrics, high reliability)."
      }
    },
    {
      "@type": "Question",
      "name": "How is forecast accuracy measured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Accuracy measures include: forecast bias check, variance analysis, confidence intervals, sensitivity testing, back-testing results, forecast reconciliation, stakeholder feedback, and continuous improvement. Regular validation improves forecast quality."
      }
    },
    {
      "@type": "Question",
      "name": "Why is financial forecasting important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial forecasting enables proactive planning, anticipates challenges, guides resource allocation, supports strategic decisions, and improves financial outcomes. Accurate forecasts transform uncertainty into manageable expectations."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Financial Forecasting Guide - Types, Techniques & Inputs',
  description: 'Forecast types, techniques, data inputs, and accuracy measures for proactive planning.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessFinancialForecastingGuide />
    </Suspense>
  );
}