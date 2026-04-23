import CarDownPaymentCalculator from '@/components/CarDownPaymentCalculator';

export default function CarDownPaymentCalculatorPage() {
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
                "name": "How much down payment should I make on a car?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Recommended down payment is 20% of car price. This avoids negative equity, reduces monthly payments, and may qualify for better loan terms. Minimum should be 10%. 0% down is risky and leads to higher total costs."
                }
              },
              {
                "@type": "Question",
                "name": "How does trade-in value affect down payment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trade-in value counts toward down payment, reducing the cash needed. In most states, trade-in reduces taxable amount, saving sales tax. Example: $35,000 car with $5,000 trade-in needs only $2,000 cash for 20% down."
                }
              },
              {
                "@type": "Question",
                "name": "What loan term is best for car financing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Recommended loan term is 36-48 months to minimize interest and avoid extended debt. Terms over 60 months increase total interest significantly. Longer terms may be necessary for budget constraints but consider total cost."
                }
              },
              {
                "@type": "Question",
                "name": "Should I get gap insurance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gap insurance is recommended if loan-to-value exceeds 80% or term is over 60 months. Covers difference between car value and loan balance if car is totaled or stolen. Required for leases, optional for purchases."
                }
              }
            ]
          })
        }}
      />
      <CarDownPaymentCalculator />
    </>
  );
}