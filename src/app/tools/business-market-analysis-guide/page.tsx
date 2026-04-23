import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessMarketAnalysisGuide from '@/components/BusinessMarketAnalysisGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What components should market analysis include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis components include market size (total revenue potential from industry reports), market growth (expansion rate from historical trends), market segments (customer groups from segmentation analysis), competitive landscape (competitor mapping from competitive research), customer needs (demand patterns from surveys), and market trends (direction changes from trend monitoring)."
      }
    },
    {
      "@type": "Question",
      "name": "What methods conduct market research?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Research methods include primary research (surveys, interviews), secondary research (industry reports, publications), competitive analysis, customer surveys, industry reports, market segmentation, SWOT analysis, and PESTEL framework."
      }
    },
    {
      "@type": "Question",
      "name": "What steps guide market analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis steps include defining research objectives, identifying data sources, collecting market data, analyzing competitive position, segmenting target markets, evaluating market trends, assessing opportunities, identifying threats, formulating conclusions, and reporting findings."
      }
    },
    {
      "@type": "Question",
      "name": "What outputs result from market analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis outputs include market size estimate (for opportunity assessment and investment decisions), competitive analysis (for positioning strategy and differentiation plans), customer insights (for product development and feature prioritization), and trend forecast (for strategic planning and future preparation)."
      }
    },
    {
      "@type": "Question",
      "name": "How often should market analysis be conducted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Market analysis should be conducted annually for strategic planning, quarterly for tactical adjustments, and whenever major decisions require market insight. More frequent analysis is needed in rapidly changing markets, before major investments, when entering new markets, or when competitive dynamics shift significantly."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Market Analysis Guide - Components, Methods & Outputs',
  description: 'Market analysis components, research methods, steps, and outputs.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessMarketAnalysisGuide />
    </Suspense>
  );
}