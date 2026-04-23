import MovingCostCalculator from '@/components/MovingCostCalculator';

export default function MovingCostCalculatorPage() {
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
                "name": "How much does a local move cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Local moves (same city) cost $400-1,800 depending on home size. Studio/small: ~$400, 1-bedroom: ~$600, 2-bedroom: ~$800, 3-bedroom: ~$1,200, 4+ bedroom: ~$1,800. Full-service movers handle everything, self-move with truck rental costs 80% less."
                }
              },
              {
                "@type": "Question",
                "name": "How much does a cross-country move cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cross-country moves cost $2,500-10,000 depending on home size and services. Studio: ~$2,500, 1-bedroom: ~$3,500, 2-bedroom: ~$5,000, 3-bedroom: ~$7,000, 4+ bedroom: ~$10,000. Get multiple quotes, compare full-service vs self-move options."
                }
              },
              {
                "@type": "Question",
                "name": "Should I hire full-service movers or do a self-move?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Full-service movers cost more but handle packing, loading, transport, and unloading. Self-move with truck rental costs 80% less but requires physical labor and coordination. Hybrid approach (you pack, movers load/unload) balances cost and convenience. Choose based on budget, time, and physical capability."
                }
              },
              {
                "@type": "Question",
                "name": "What additional moving costs should I budget for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Beyond movers, budget for: packing supplies ($100-500), storage ($50-200/month if needed), travel costs (gas, hotels, flights), utility setup deposits ($200), moving insurance, and cleaning. Long-distance moves need hotel nights and potential vehicle transport costs."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce moving costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Declutter before moving to reduce volume and weight. Pack yourself to save $400-500. Compare multiple mover quotes. Move during off-season (winter) for better rates. Use free boxes from stores. Disassemble furniture yourself. Book early for better pricing. Storage longer than 2 months suggests declutter opportunity."
                }
              }
            ]
          })
        }}
      />
      <MovingCostCalculator />
    </>
  );
}