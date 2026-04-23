import PersonalLoanCalculator from '@/components/PersonalLoanCalculator';

export default function PersonalLoanCalculatorPage() {
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
                "name": "What is a good interest rate for a personal loan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Personal loan rates vary by credit score. Excellent credit (720+): 6-10%. Good (680-719): 8-15%. Fair (640-679): 12-20%. Poor (under 640): 18-36%. Compare multiple lenders for best rates. Online lenders often offer competitive rates. Credit unions may offer lower rates for members. Pre-qualification doesn't affect credit score."
                }
              },
              {
                "@type": "Question",
                "name": "How do I calculate personal loan monthly payments?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Monthly payment = P × (r × (1+r)^n) / ((1+r)^n - 1), where P is principal, r is monthly rate (annual rate/12), n is term in months. For example: $10,000 at 8.5% for 36 months = ~$315/month. Use online calculators for quick estimates. Factor in origination fees which increase effective rate. Total cost = principal + fees + total interest."
                }
              },
              {
                "@type": "Question",
                "name": "Should I get a personal loan or use a credit card?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Personal loans typically have lower rates (6-36%) vs credit cards (15-25%+). Personal loans have fixed terms and payments. Credit cards offer flexibility but variable rates. For large expenses over $5,000, personal loans usually cost less. For smaller amounts or if you need flexibility, credit cards may work. Consider 0% APR credit card offers for short-term financing."
                }
              },
              {
                "@type": "Question",
                "name": "What fees should I watch for with personal loans?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Origination fees: 0-8% of loan amount (deducted from proceeds). Late payment fees: $15-40. Prepayment penalties: rare but check terms. Application/processing fees: some lenders charge. Compare APR not just interest rate - APR includes fees. Some lenders offer no-fee loans. Negotiate fees or choose lenders with lower costs."
                }
              },
              {
                "@type": "Question",
                "name": "How does loan term affect total cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Shorter term = higher monthly payment but less total interest. Longer term = lower payment but more total interest. Example: $10,000 at 8.5% - 24 months: $456/mo, $864 interest; 60 months: $204/mo, $2,240 interest. Choose term based on budget vs total cost preference. Early payoff saves interest if no prepayment penalty."
                }
              }
            ]
          })
        }}
      />
      <PersonalLoanCalculator />
    </>
  );
}