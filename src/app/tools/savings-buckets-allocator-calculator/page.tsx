import SavingsBucketsAllocatorCalculator from '@/components/SavingsBucketsAllocatorCalculator';

export default function SavingsBucketsAllocatorCalculatorPage() {
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
                "name": "How should I prioritize multiple savings goals?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Prioritize emergency fund first (critical), then retirement (high priority for long-term security), followed by medium-term goals, and finally short-term discretionary goals. Adjust based on personal circumstances."
                }
              },
              {
                "@type": "Question",
                "name": "What percentage should go to each savings bucket?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Consider: 20% to retirement, 10% to emergency fund until complete, 5-10% to medium-term goals, 2-5% to short-term goals. Adjust percentages based on goal urgency and timeline."
                }
              },
              {
                "@type": "Question",
                "name": "Should retirement savings be a separate bucket?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, retirement should be treated separately due to tax advantages and long timeline. Use dedicated accounts like 401(k) or IRA. This bucket calculator helps visualize alongside other savings goals."
                }
              },
              {
                "@type": "Question",
                "name": "How often should I review my savings allocation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Review allocation quarterly or when major life events occur (job change, marriage, home purchase). Adjust priorities as goals are completed or new goals emerge."
                }
              }
            ]
          })
        }}
      />
      <SavingsBucketsAllocatorCalculator />
    </>
  );
}