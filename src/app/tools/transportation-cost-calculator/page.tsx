import TransportationCostCalculator from '@/components/TransportationCostCalculator';

export default function TransportationCostCalculatorPage() {
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
                "name": "How much should transportation cost per month?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Transportation should be 5-10% of income. For a $5,000 monthly income, that's $250-500. This includes fuel, insurance, maintenance, car payments, parking, and public transit. Car ownership typically costs $500-800/month total."
                }
              },
              {
                "@type": "Question",
                "name": "What is the total cost of owning a car?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Total annual car cost is $8,000-12,000 including depreciation. Monthly breakdown: fuel $150-200, insurance $100-150, maintenance $50-150, car payment $300-500, parking $50-100. Public transit costs 10-20% of car expenses."
                }
              },
              {
                "@type": "Question",
                "name": "Is public transit cheaper than driving?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Public transit typically costs $50-150/month vs $500-800/month for car ownership. Annual savings can be $5,000-10,000. Consider convenience, commute time, and flexibility needs when comparing. Mixed modes often optimize cost and convenience."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce transportation costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cost-saving strategies: carpool or rideshare, use public transit, bike for short trips, negotiate insurance rates, maintain fuel efficiency, work remotely when possible, choose housing near work, and compare fuel prices."
                }
              },
              {
                "@type": "Question",
                "name": "What transportation option is best for long commutes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For commutes over 30 miles, consider: fuel-efficient vehicle, public transit if available, carpooling, or relocation closer to work. Calculate total cost per mile including depreciation. Remote work eliminates commute costs entirely."
                }
              }
            ]
          })
        }}
      />
      <TransportationCostCalculator />
    </>
  );
}