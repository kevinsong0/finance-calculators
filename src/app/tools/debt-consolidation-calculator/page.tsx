import DebtConsolidationCalculator from '@/components/DebtConsolidationCalculator';

export default function DebtConsolidationCalculatorPage() {
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
                "name": "Is debt consolidation a good idea?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Debt consolidation can be beneficial if you qualify for a lower rate than current debts. Good for: multiple high-interest debts, simplified single payment, fixed repayment timeline. Risk: extending term may increase total cost, may tempt new debt. Calculate total cost before vs after consolidation. Ensure new rate is truly lower. Don't consolidate federal student loans (lose benefits)."
                }
              },
              {
                "@type": "Question",
                "name": "How does debt consolidation affect my credit?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Initial impact: new loan application causes small temporary dip. Positive effects: paying off multiple accounts, lower utilization on cards. Negative if you close old accounts. Long-term: on-time payments improve credit. Don't rack up new debt on paid-off cards. Keep old accounts open if possible. Overall usually neutral to positive if you stay disciplined."
                }
              },
              {
                "@type": "Question",
                "name": "What debts should I consolidate?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Best candidates: high-interest credit cards (15-25%+), store cards, personal loans with high rates. Medical debt may have 0% interest - not worth consolidating. Federal student loans: keep for income-driven plans and forgiveness options. Car loans: often secured at lower rates. Only consolidate debts with higher rates than consolidation loan rate."
                }
              },
              {
                "@type": "Question",
                "name": "What is the debt-to-income ratio for consolidation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Lenders prefer DTI under 36% (under 43% for some). DTI = total monthly debt payments / gross monthly income. Example: $2,000 debt payments, $5,000 income = 40% DTI. High DTI may mean higher rates or denial. Consolidation can lower DTI by reducing monthly payments. Some lenders allow up to 50% DTI. Improve DTI before applying for better rates."
                }
              },
              {
                "@type": "Question",
                "name": "Debt consolidation vs debt settlement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Consolidation: new loan pays off all debts, you repay full amount at lower rate. Good for credit, structured repayment. Settlement: negotiate to pay less than owed, typically 40-60%. Damages credit, fees high, risk of lawsuits. Consolidation is safer for credit. Settlement only for severe hardship when consolidation impossible. Consider credit counseling for guidance."
                }
              }
            ]
          })
        }}
      />
      <DebtConsolidationCalculator />
    </>
  );
}