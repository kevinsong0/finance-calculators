import RetirementIncomeCalculator from '@/components/RetirementIncomeCalculator';

export default function RetirementIncomeCalculatorPage() {
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
                "name": "What is the 4% rule for retirement withdrawals?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The 4% rule suggests withdrawing 4% of your portfolio in the first year of retirement, then adjusting for inflation annually. Based on historical data, this should last 30 years. Example: $1M savings = $40K first year withdrawal. For early retirees, 3-3.5% safer. Adjust based on market conditions, health, and retirement length."
                }
              },
              {
                "@type": "Question",
                "name": "How does Social Security affect retirement income?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Social Security provides guaranteed monthly income. Average benefit: ~$1,800/month at 67. Claim early (62) reduces 25-30%. Delay (70) increases 8% per year after 67. Spousal benefits available. Coordinates with other income sources. Tax-free up to certain thresholds. Adjusts for inflation annually. Plan timing strategically."
                }
              },
              {
                "@type": "Question",
                "name": "What income replacement ratio should I target?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Target 70-80% of pre-retirement income. Lower expenses: no payroll taxes, less commuting, potentially lower housing costs. Higher expenses: healthcare, travel, hobbies. Example: $100K income → $70-80K retirement income needed. Calculate actual expenses, not percentage. Factor in Social Security and pensions. Adjust for lifestyle goals."
                }
              },
              {
                "@type": "Question",
                "name": "How do I account for inflation in retirement planning?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Inflation averages 3% historically, reducing purchasing power. $1 today = $0.74 in 10 years at 3% inflation. Plan for higher healthcare inflation (5-6%). Use real returns (nominal minus inflation) for projections. Social Security adjusts for CPI. Some investments (stocks, TIPS) may outpace inflation. Plan expenses to grow with inflation."
                }
              },
              {
                "@type": "Question",
                "name": "What withdrawal rate is safe for early retirement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For 30-year retirement: 4% traditional rule. For 40+ years: 3-3.5% safer. Early retirees face longer withdrawal periods, sequence-of-returns risk. Start conservative, adjust based on market performance. Consider flexible withdrawal strategies. Guardrails approach: reduce if portfolio drops, increase if it grows. Balance longevity risk vs. lifestyle."
                }
              }
            ]
          })
        }}
      />
      <RetirementIncomeCalculator />
    </>
  );
}