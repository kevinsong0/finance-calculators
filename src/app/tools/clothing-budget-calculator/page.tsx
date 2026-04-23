import ClothingBudgetCalculator from '@/components/ClothingBudgetCalculator';

export default function ClothingBudgetCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much should I budget for clothing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Clothing should be 2-4% of income. For a $5,000 monthly income, that's $100-200. Average American spends $150-200/month on clothing. Children require 50-100% more budget due to growth. Work attire needs separate consideration."
                }
              },
              {
                "@type": "Question",
                "name": "What is a capsule wardrobe and how does it save money?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A capsule wardrobe is 30-40 versatile, quality items that mix and match. It eliminates impulse purchases, reduces closet clutter, and saves 30-50% on clothing costs. Quality basics last longer than trendy fast fashion."
                }
              },
              {
                "@type": "Question",
                "name": "When is the best time to buy clothes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Best savings: end-of-season clearance (40-70% off), Black Friday/Cyber Monday, January white sales, and back-to-school season. Plan purchases around sales cycles. Thrift and consignment stores offer 50-70% savings year-round."
                }
              },
              {
                "@type": "Question",
                "name": "How does clothing quality affect long-term costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Quality items cost more upfront but last 3-5x longer. A $100 quality shirt lasting 5 years equals $20/year, while $20 fast fashion lasting 1 year equals $20/year but needs replacement. Invest in basics, save on trends."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce clothing spending?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Strategies: shop with a list, buy during sales, compare online prices, thrift/resale shopping, capsule wardrobe approach, avoid impulse purchases, care for existing clothes, and repair instead of replace. Children's clothes: buy gender-neutral for hand-downs."
                }
              }
            ]
          })
        }}
      />
      <ClothingBudgetCalculator />
    </>
  );
}