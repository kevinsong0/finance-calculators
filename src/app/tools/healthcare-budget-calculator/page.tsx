import HealthcareBudgetCalculator from '@/components/HealthcareBudgetCalculator';

export default function HealthcareBudgetCalculatorPage() {
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
                "name": "How much should I budget for healthcare?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Healthcare should be 3-6% of income. This includes premiums, out-of-pocket costs, dental, and vision. Average family spends $500-1,000/month total. Account for your health status and expected utilization when budgeting."
                }
              },
              {
                "@type": "Question",
                "name": "What is an HSA and how does it save money?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Health Savings Account (HSA) is available with High Deductible Health Plans. 2026 limits are $4,150 individual, $8,300 family. Contributions are pre-tax, grow tax-free, and withdrawals for medical expenses are tax-free. Triple tax benefit saves approximately 30%."
                }
              },
              {
                "@type": "Question",
                "name": "Should I choose a high deductible health plan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "HDHPs work well for healthy individuals who pair them with HSA. Lower premiums but higher out-of-pocket when care is needed. If you have chronic conditions or expect significant medical needs, a lower deductible plan may be better despite higher premiums."
                }
              },
              {
                "@type": "Question",
                "name": "What healthcare costs are often overlooked?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Overlooked costs include: dental procedures (not covered by most plans), vision and eyewear, prescription copays, specialist copays, emergency room costs, mental health services, and reaching your deductible mid-year. Budget a deductible reserve."
                }
              },
              {
                "@type": "Question",
                "name": "How do I prepare for unexpected medical expenses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Build a medical emergency fund equal to your deductible plus $1,000-2,000. Maximize HSA contributions - funds roll over year to year. Understand your plan's out-of-pocket maximum. Consider supplemental insurance for critical illness or accidents."
                }
              }
            ]
          })
        }}
      />
      <HealthcareBudgetCalculator />
    </>
  );
}