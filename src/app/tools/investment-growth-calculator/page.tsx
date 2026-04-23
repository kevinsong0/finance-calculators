import InvestmentGrowthCalculator from '@/components/InvestmentGrowthCalculator';

export default function InvestmentGrowthCalculatorPage() {
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
                "name": "How does compound interest grow investments?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Compound interest earns interest on interest, accelerating growth. Example: $10,000 at 8% grows to $21,589 in 10 years with no contributions. Adding $500/month makes it $106,000. Longer time compounds more dramatically. Rule of 72: divide 72 by rate to estimate doubling time. At 8%, money doubles in ~9 years. Starting early is crucial - time is the biggest factor."
                }
              },
              {
                "@type": "Question",
                "name": "What return rate should I expect?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Historical averages: Stock market (S&P 500): 10% nominal, 7% after inflation. Bonds: 5-6%. High-yield savings: 4-5%. CDs: 4-6%. Real estate: 7-10%. Conservative portfolio (60/40 stocks/bonds): 6-8%. Aggressive (all stocks): 8-12%. Past returns don't guarantee future. Diversify. Reduce risk near retirement. Use conservative estimates for planning."
                }
              },
              {
                "@type": "Question",
                "name": "How much should I contribute monthly?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Aim for: 10-15% of income for retirement. Emergency fund: 3-6 months expenses ($500-1000/month). Other goals: calculate required amount. Example: $50,000 goal in 5 years at 8% requires ~$680/month (starting from $0). Increase contributions with raises. Automate for consistency. Start small, build up. Employer 401k match: contribute enough to maximize it first."
                }
              },
              {
                "@type": "Question",
                "name": "How does inflation affect my investments?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Inflation (~3% historically) erodes purchasing power. Your 'real return' = nominal return minus inflation. Example: 8% investment with 3% inflation = 5% real return. $100,000 in 20 years at 8% = $466,000, but only $258,000 in today's dollars. Plan using real returns. Some investments (stocks, real estate) may outpace inflation. Bonds, savings accounts may not. Protect against inflation with growth investments."
                }
              },
              {
                "@type": "Question",
                "name": "Should I invest or pay off debt first?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pay off debt first if: rate > expected investment return (e.g., credit card 20% > stock 8%), reduces stress, improves cash flow. Invest first if: employer match (free 50-100% return), rate low (<5%), building emergency fund. Hybrid approach: pay minimums + invest enough for match + extra to highest-rate debt. Run calculations to compare. Guaranteed debt payoff vs uncertain investment returns."
                }
              }
            ]
          })
        }}
      />
      <InvestmentGrowthCalculator />
    </>
  );
}