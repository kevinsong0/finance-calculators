import UtilityCostOptimizerCalculator from '@/components/UtilityCostOptimizerCalculator';

export default function UtilityCostOptimizerCalculatorPage() {
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
                "name": "How much can a smart thermostat save?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Smart thermostats typically save 10-15% on heating and cooling costs, with potential savings of $100-200 annually. The investment cost of $150-250 usually pays back within 1-2 years."
                }
              },
              {
                "@type": "Question",
                "name": "What is the ROI on LED lighting conversion?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "LED lights reduce lighting energy costs by 75% compared to incandescent bulbs. With an investment of $50-100, most households see ROI within 6-12 months depending on usage levels."
                }
              },
              {
                "@type": "Question",
                "name": "How do I compare my utility usage to benchmarks?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Benchmarks vary by climate zone, home size, and number of residents. Cold climates average 400+ kWh per resident monthly, hot climates 500+ kWh for AC, and mixed climates around 350 kWh per resident."
                }
              },
              {
                "@type": "Question",
                "name": "When should I consider solar panels?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Solar panels become cost-effective when electric bills exceed $150/month and usage is over 1000 kWh monthly. Partial systems can offset 70% of electric costs with ROI typically in 7-10 years."
                }
              }
            ]
          })
        }}
      />
      <UtilityCostOptimizerCalculator />
    </>
  );
}