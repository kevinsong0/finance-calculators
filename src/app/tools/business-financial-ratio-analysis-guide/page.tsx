import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessFinancialRatioAnalysisGuide from '@/components/BusinessFinancialRatioAnalysisGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What categories of financial ratios exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ratio categories include: Profitability ratios (margin, ROI, ROE for earning ability), Liquidity ratios (current, quick ratios for short-term health), Efficiency ratios (turnover ratios for asset utilization), and Solvency ratios (debt, leverage ratios for long-term stability)."
      }
    },
    {
      "@type": "Question",
      "name": "What ratios are commonly analyzed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key ratios include: gross profit margin, net profit margin, return on assets, return on equity, current ratio, quick ratio, asset turnover, inventory turnover, debt-to-equity ratio, and interest coverage ratio."
      }
    },
    {
      "@type": "Question",
      "name": "What methods analyze financial ratios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis methods include: Trend analysis (compare over time for progress tracking), Industry benchmark (compare to peers for market position), Target comparison (compare to goals for goal achievement), and DuPont analysis (decompose ROE for component insight)."
      }
    },
    {
      "@type": "Question",
      "name": "How should ratios be interpreted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Interpretations include: ratio above/below benchmark, ratio trending upward/downward, ratio within/outside target, ratio improvement needed, and ratio maintaining stability. Interpretation guides action."
      }
    },
    {
      "@type": "Question",
      "name": "Why is financial ratio analysis important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial ratio analysis provides business insight, enables benchmarking, identifies trends, guides improvement, and supports decisions. Ratio analysis transforms financial statements into actionable intelligence."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Financial Ratio Analysis Guide - Categories, Ratios & Methods',
  description: 'Ratio categories, key ratios, analysis methods, and interpretation guidance.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessFinancialRatioAnalysisGuide />
    </Suspense>
  );
}
