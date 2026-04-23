import InvestmentFeeImpactCalculator from '@/components/InvestmentFeeImpactCalculator'

export default function InvestmentFeeImpactCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <InvestmentFeeImpactCalculator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do investment fees affect returns?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Investment fees directly reduce your net returns. A 1% annual fee on a portfolio earning 7% reduces your return to 6%. Over 30 years, this 1% fee can cost over $100,000 on a $100,000 investment due to compounding."
                }
              },
              {
                "@type": "Question",
                "name": "What is a typical expense ratio for mutual funds?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Index fund/ETF expense ratios: typically 0.03-0.20% (Vanguard, Fidelity, Schwab). Active mutual funds: 0.5-2.0% average. Target-date funds: 0.1-0.75%. Always compare expense ratios before investing."
                }
              },
              {
                "@type": "Question",
                "name": "Are financial advisor fees worth it?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Traditional advisors charge 1% AUM fee, which compounds significantly. Consider flat-fee advisors ($1,000-5,000/year) or robo-advisors (0.25-0.50%). Value depends on services: tax planning, behavioral coaching, estate planning."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce investment fees?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use index funds/ETFs instead of active funds. Choose low-cost providers (Vanguard, Fidelity, Schwab). Negotiate advisor fees or switch to flat-fee. Check 401(k) expense ratios, consider IRA rollover. Avoid high-fee variable annuities."
                }
              },
              {
                "@type": "Question",
                "name": "What is the impact of a 1% fee over 30 years?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "On a $100,000 investment earning 7% annually: with 0% fees = $761,225 final value. With 1% fees = $574,350. That 1% fee costs $186,875 (24% of final value). Fees compound negatively."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}