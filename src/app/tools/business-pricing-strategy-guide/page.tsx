import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessPricingStrategyGuide from '@/components/BusinessPricingStrategyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What pricing models can businesses use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pricing models include cost-plus pricing (cost plus margin, simple and predictable), value-based pricing (customer value, higher margins), competitive pricing (market rates, market aligned), dynamic pricing (demand fluctuations, revenue optimization), freemium pricing (free plus premium, user acquisition), and subscription pricing (recurring charge, stable revenue)."
      }
    },
    {
      "@type": "Question",
      "name": "What factors influence pricing decisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pricing factors include production costs, customer willingness to pay, competitor prices, market positioning, product differentiation, customer segment, distribution channel, and brand perception."
      }
    },
    {
      "@type": "Question",
      "name": "What tactics optimize pricing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pricing tactics include bundling (value increase through package combinations), tiered pricing (segment coverage through feature levels), psychological pricing (perception impact through price endings), and promotional pricing (sales boost through temporary discounts)."
      }
    },
    {
      "@type": "Question",
      "name": "How should pricing be optimized?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pricing optimization involves testing price points, analyzing elasticity, monitoring competitor moves, tracking customer response, measuring profit impact, evaluating market share, assessing brand perception, and adjusting based on data."
      }
    },
    {
      "@type": "Question",
      "name": "What is price elasticity of demand?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Price elasticity measures how demand changes with price. Elastic demand means small price changes cause large demand changes. Inelastic demand means demand stays stable despite price changes. Understanding elasticity helps set optimal prices for maximum revenue and profit."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Pricing Strategy Guide - Models, Factors & Optimization',
  description: 'Pricing models, influencing factors, tactical approaches, and optimization.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessPricingStrategyGuide />
    </Suspense>
  );
}