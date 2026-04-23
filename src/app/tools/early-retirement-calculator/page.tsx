import EarlyRetirementCalculator from '@/components/EarlyRetirementCalculator';

export default function EarlyRetirementCalculatorPage() {
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
                "name": "What is the FIRE movement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "FIRE = Financial Independence, Retire Early. Goal: accumulate enough savings to live off passive income, enabling early retirement. Typically target 25x annual expenses. Extreme savers (50%+ rate) can retire in 10-15 years. Moderate savers (25%) take 30+ years. Movement includes Lean FIRE (minimal expenses) and Fat FIRE (comfortable lifestyle). Focus on high savings rate, low expenses, investment growth."
                }
              },
              {
                "@type": "Question",
                "name": "What is the FIRE number calculation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "FIRE number = 25x annual expenses. Based on 4% withdrawal rule. Example: $40K annual expenses = $1M FIRE number. Adjust for inflation: multiply by inflation factor for target year. Example: $40K today, 20 years to retirement at 3% inflation = $40K × 1.81 = $72.5K year-1 expenses. FIRE number = $72.5K × 25 = $1.8M."
                }
              },
              {
                "@type": "Question",
                "name": "How does savings rate affect FIRE timeline?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Savings rate directly determines timeline. 10% savings rate: ~51 years to FIRE. 25%: ~32 years. 50%: ~17 years. 75%: ~7 years. Assumes 5% real returns. Higher savings rate = shorter timeline AND lower FIRE number (fewer expenses). Mathematical relationship shows dramatic impact. Increasing from 25% to 50% cuts timeline by half."
                }
              },
              {
                "@type": "Question",
                "name": "What withdrawal rate should early retirees use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Early retirees need lower withdrawal rates due to longer retirement. 4% rule assumes 30-year retirement. For 40+ years: 3-3.5% safer. Consider sequence-of-returns risk (early market drops). Flexible withdrawal strategies: reduce in bad years, increase in good. Guardrails approach adjusts based on portfolio performance. Start conservative, adjust as needed."
                }
              },
              {
                "@type": "Question",
                "name": "How do I handle healthcare before Medicare?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Healthcare major cost for early retirees (before 65/Medicare). Options: ACA marketplace plans, COBRA (18 months), health share programs. ACA subsidies available based on income (manage withdrawals to qualify). Budget $10-20K annually per couple. Consider part-time work for benefits. Long-term: plan for Medicare at 65. Healthcare costs rise faster than general inflation."
                }
              }
            ]
          })
        }}
      />
      <EarlyRetirementCalculator />
    </>
  );
}