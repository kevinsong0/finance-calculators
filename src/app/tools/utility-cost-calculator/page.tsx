import UtilityCostCalculator from '@/components/UtilityCostCalculator';

export default function UtilityCostCalculatorPage() {
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
                "name": "How much do utilities cost per month?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Average monthly utility costs: Electric $100-150, Gas $50-100 (varies by region), Water/Sewer $40-80, Internet $50-80, Trash $20-40. Total: $250-450/month for average home. Larger homes cost 30-60% more. Northern regions use more gas for heating, southern use more electric for AC. Older homes 10-20% higher due to efficiency."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce my electric bill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "LED bulbs save 15% vs incandescent. Smart thermostat saves 10-15% on HVAC. Seal air leaks and add insulation for 10-20% savings. Energy-efficient appliances reduce 10-15%. Unplug devices when not in use (5-10% savings). Use cold water for laundry. Solar panels can offset 50-80% of electric costs. Compare electric providers for better rates."
                }
              },
              {
                "@type": "Question",
                "name": "How much water does an average household use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Average household: 3,000-6,000 gallons/month. 1-2 people: 2,000-3,000 gallons. 3-4 people: 4,000-5,000 gallons. 5+ people: 6,000-8,000 gallons. Cost: $40-80/month water + sewer (sewer typically 50% of water bill). Low-flow fixtures reduce 20%. Fix leaks promptly - even small leaks waste 3,000+ gallons/year."
                }
              },
              {
                "@type": "Question",
                "name": "What affects utility costs most?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Home size (larger = more energy). Occupant count (more people = more water/electric). Climate (extreme temperatures increase HVAC costs). Home age (older homes less efficient). Appliance efficiency. Heating/cooling type (electric heat expensive, gas heat varies). Water heating method. Solar panels significantly reduce electric. Insulation quality affects 20%+."
                }
              },
              {
                "@type": "Question",
                "name": "Should I install solar panels to reduce utilities?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Solar panels typically offset 50-80% of electric bill. Cost: $15,000-25,000 installed (before incentives). Tax credits reduce cost 30%. Break-even: 7-10 years. Best for: homes with $100+ electric bills, sunny locations, south-facing roof. Consider: roof age/condition, local utility policies, net metering availability. Solar doesn't affect gas/water costs."
                }
              }
            ]
          })
        }}
      />
      <UtilityCostCalculator />
    </>
  );
}