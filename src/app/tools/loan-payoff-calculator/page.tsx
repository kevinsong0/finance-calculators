import LoanPayoffCalculator from '@/components/LoanPayoffCalculator';

export default function LoanPayoffCalculatorPage() {
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
                "name": "How do extra payments affect loan payoff?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Extra payments reduce principal directly, shortening loan term and saving interest. Example: $100 extra on $15,000 3-year loan at 8.5% saves ~$400 interest, pays off 4 months early. Larger extra payments save more. Always specify extra goes to principal, not held for future payments. Most loans allow extra payments without penalty."
                }
              },
              {
                "@type": "Question",
                "name": "Should I pay off my loan early?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pay off early if: interest rate high (>7%), no better investment options, want to reduce monthly obligations, have emergency fund already. Don't if: loan has prepayment penalty, interest rate very low (<4%), extra money could earn more invested, close to loan end anyway (most interest already paid). Run numbers to compare saved interest vs investment returns."
                }
              },
              {
                "@type": "Question",
                "name": "What is the best loan payoff strategy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Best strategies: 1) Round up payments to nearest $50 or $100. 2) Make bi-weekly payments (26 half payments = 13 full payments/year). 3) Apply windfalls (bonus, tax refund) to principal. 4) Increase payment whenever income rises. 5) Avalanche method: pay highest-rate loans first. 6) Snowball method: pay smallest loans first for motivation. Choose based on your psychology."
                }
              },
              {
                "@type": "Question",
                "name": "How much interest do I save with early payoff?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Interest savings depend on rate, term, and extra payment amount. Example: $20,000 5-year car loan at 6%: $100 extra/month saves ~$700 interest, pays off 9 months early. $50 extra saves ~$350, 5 months early. Calculate using payoff calculator. Higher rate loans save more. Longer terms have more potential savings. Early years of loan save more interest per extra dollar."
                }
              },
              {
                "@type": "Question",
                "name": "Does bi-weekly payment really work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Bi-weekly payments (half payment every 2 weeks) result in 26 half payments = 13 full payments per year, vs 12 monthly payments. Extra payment goes to principal, accelerating payoff. Example: $200,000 mortgage at 6% for 30 years: bi-weekly pays off in ~25 years, saves ~$30,000 interest. Check if lender offers bi-weekly option or set up yourself (be careful with timing)."
                }
              }
            ]
          })
        }}
      />
      <LoanPayoffCalculator />
    </>
  );
}