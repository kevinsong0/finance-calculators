import CreditScoreSimulator from '@/components/CreditScoreSimulator';

export default function CreditScoreSimulatorPage() {
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
                "name": "What factors affect credit score most?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Payment history (35%) has the biggest impact. Credit utilization (30%) - keep under 30%, ideally under 10%. Credit age (15%) - older accounts help. Credit mix (10%) - variety of types helps. New credit (10%) - avoid too many applications. On-time payments are crucial - one late payment can drop score 50-110 points."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to improve credit score?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Minor improvements: 30-45 days after paying down debt. Moderate improvements: 6-12 months of consistent on-time payments. Major improvements: 1-2 years for late payment recovery, 7+ years for serious delinquencies. Keep old accounts open for credit age. Pay down balances quickly. Avoid new applications during improvement period."
                }
              },
              {
                "@type": "Question",
                "name": "What credit score do I need for best rates?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Excellent (800+): Best mortgage rates, premium credit cards, easy approval. Very Good (740-799): Great rates, good approval odds. Good (670-739): Acceptable rates, may need documentation. Fair (580-669): Higher rates, limited options. Poor (300-579): Very high rates or denial. Aim for 740+ for best mortgage rates."
                }
              },
              {
                "@type": "Question",
                "name": "Does checking my credit score hurt it?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Checking your own score (soft inquiry) does NOT hurt your score. Lender credit checks (hard inquiries) drop score 5-10 points temporarily. Multiple inquiries for same loan type within 14-45 days count as one (rate shopping). Hard inquiries stay on report 2 years, affect score for 1 year. Check your score regularly - it's free and harmless."
                }
              },
              {
                "@type": "Question",
                "name": "How much does utilization affect credit score?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Utilization under 10%: Best impact. Under 30%: Good impact. 30-50%: Moderate negative impact. Over 50%: Significant negative impact. Over 70%: Major score drop. Pay down cards before statement date to report lower utilization. Utilization has no memory - paying down immediately improves score within 30 days."
                }
              }
            ]
          })
        }}
      />
      <CreditScoreSimulator />
    </>
  );
}