import SubscriptionCostCalculator from '@/components/SubscriptionCostCalculator';

export default function SubscriptionCostCalculatorPage() {
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
                "name": "How many subscriptions does the average household have?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The average household has 8-12 recurring subscriptions, including streaming services, music, software, gym, cloud storage, and other memberships. Many people underestimate their total subscription count and monthly spending."
                }
              },
              {
                "@type": "Question",
                "name": "How much should I budget for subscriptions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Financial experts recommend keeping subscriptions at 1-2% of income. For a $5,000 monthly income, that's $50-100/month. However, average households spend $200-300/month on subscriptions, often exceeding recommended limits."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce subscription costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Key strategies include: rotating streaming subscriptions instead of keeping multiple active, using free alternatives where possible, reviewing quarterly for unused services, sharing family plans, and negotiating annual instead of monthly billing."
                }
              },
              {
                "@type": "Question",
                "name": "What are the most common overlooked subscriptions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Often overlooked subscriptions include: cloud storage fees, app store subscriptions, news/magazine subscriptions, gaming memberships, subscription boxes, and automatic renewals for services you rarely use."
                }
              },
              {
                "@type": "Question",
                "name": "How do I track all my subscriptions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Review your bank and credit card statements monthly for recurring charges. Use subscription tracking apps, check email for renewal notifications, and create a simple spreadsheet. Many subscriptions auto-renew and go unnoticed."
                }
              }
            ]
          })
        }}
      />
      <SubscriptionCostCalculator />
    </>
  );
}