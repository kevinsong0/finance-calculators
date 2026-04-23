import EmergencyFundSizeCalculator from '@/components/EmergencyFundSizeCalculator';

export default function EmergencyFundSizeCalculatorPage() {
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
                "name": "How big should my emergency fund be?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Standard recommendation is 3-6 months of essential expenses. Adjust upward for self-employment (9-12 months), unstable job (6-9 months), single income source (6+ months), or health concerns."
                }
              },
              {
                "@type": "Question",
                "name": "What counts as essential expenses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Essential expenses include housing, utilities, food, transportation, insurance premiums, and minimum debt payments. Exclude discretionary spending like entertainment, dining out, and non-essential shopping."
                }
              },
              {
                "@type": "Question",
                "name": "Where should I keep my emergency fund?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Keep funds in a high-yield savings account or money market account for accessibility and interest. Avoid investing emergency funds in stocks due to volatility risk when you need immediate access."
                }
              },
              {
                "@type": "Question",
                "name": "Should I build emergency fund or pay off debt first?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Build a mini emergency fund of $1,000-2,000 first, then focus on debt payoff, then complete full emergency fund. This provides basic protection while prioritizing debt elimination."
                }
              }
            ]
          })
        }}
      />
      <EmergencyFundSizeCalculator />
    </>
  );
}