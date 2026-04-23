import DiningOutBudgetCalculator from '@/components/DiningOutBudgetCalculator';

export default function DiningOutBudgetCalculatorPage() {
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
                "name": "How much should I budget for dining out?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Financial experts recommend spending 5-10% of your income on dining out. For a $5,000 monthly income, that suggests $250-500 for restaurants, delivery, and coffee. The average American spends about $300-450 monthly on food away from home."
                }
              },
              {
                "@type": "Question",
                "name": "What costs more: dining out or delivery?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Delivery typically costs 20-30% more than dining out due to delivery fees ($3-8), service fees, and tips. A $30 restaurant meal can cost $40-45 delivered. Reducing delivery frequency is often the easiest way to cut dining costs."
                }
              },
              {
                "@type": "Question",
                "name": "How much does daily coffee cost per month?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A daily $5 coffee costs $150/month or $1,800/year. Making coffee at home costs about $0.50 per cup or $15/month. That's a potential savings of $135/month or $1,620/year by switching to home-brewed coffee."
                }
              },
              {
                "@type": "Question",
                "name": "Is cooking at home really cheaper than dining out?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, home cooking costs roughly 30% of restaurant prices. A $40 restaurant meal can be made at home for $12-15. Cooking at home saves 70% on food costs and gives you control over ingredients, portions, and nutrition."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce dining out without sacrificing enjoyment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Try reducing frequency instead of eliminating dining out. Cook at home most days, limit delivery to 1-2 times weekly, brew coffee at home, and choose less expensive restaurants. Use dining out for special occasions rather than daily convenience."
                }
              }
            ]
          })
        }}
      />
      <DiningOutBudgetCalculator />
    </>
  );
}