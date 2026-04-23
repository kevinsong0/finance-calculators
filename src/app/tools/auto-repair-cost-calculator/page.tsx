import AutoRepairCostCalculator from '@/components/AutoRepairCostCalculator';

export default function AutoRepairCostCalculatorPage() {
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
                "name": "How much does car maintenance cost per year?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Annual car maintenance averages 2% of vehicle value. For a $15,000 car: ~$300/year. New cars under 3 years: $500-1,000. Cars 5-10 years: $1,000-1,500. Cars over 10 years: $1,500-2,500+. Luxury vehicles cost 80% more. High mileage (100K+) adds 30%. Preventive maintenance saves 30% vs reactive repairs."
                }
              },
              {
                "@type": "Question",
                "name": "What are typical car maintenance costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oil changes: $50-75 every 5,000 miles. Tires: $400-800 per set (40,000-60,000 miles). Brakes: $300-600 pads/rotors (30,000-50,000 miles). Battery: $150-200 (3-5 years). Transmission fluid: $150-250 (30,000-60,000 miles). Timing belt: $500-1,000 (60,000-100,000 miles). Annual inspection: $50-100. Budget $500-1,500 for emergency repairs."
                }
              },
              {
                "@type": "Question",
                "name": "How do vehicle age and mileage affect repair costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Costs increase significantly with age and mileage. 0-3 years: minimal, warranty coverage. 4-7 years: maintenance increases, tires, brakes common. 8-12 years: more repairs, timing belt, suspension, battery. 13+ years: frequent repairs, consider replacement. Each 50,000 miles adds ~20% to annual costs. Luxury cars 10+ years very expensive to maintain."
                }
              },
              {
                "@type": "Question",
                "name": "When should I replace vs repair my car?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Consider replacement when: annual repairs exceed 10% of value, major repair (engine/transmission) exceeds value, safety issues persist, reliability affects daily life. For older cars (10+ years) with $3,000+ annual repairs, replacement often better. For newer cars, major repairs worth fixing. Compare repair cost vs remaining useful life."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce car maintenance costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Preventive maintenance catches issues early (30% savings). Regular oil changes prevent engine damage. Follow manufacturer service schedule. DIY simple maintenance (air filter, wipers). Compare mechanic quotes. Independent shops 20-40% cheaper than dealers. Use quality parts, not cheapest. Maintain tires properly. Address issues promptly before they worsen."
                }
              }
            ]
          })
        }}
      />
      <AutoRepairCostCalculator />
    </>
  );
}