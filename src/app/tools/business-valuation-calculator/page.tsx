import BusinessValuationCalculator from '@/components/BusinessValuationCalculator'

export default function BusinessValuationCalculatorPage() {
  const faqs = [
    {
      question: 'What are the main business valuation methods?',
      answer: 'Three primary methods: (1) Market multiples - comparing to similar businesses sold (Revenue, EBITDA, P/E multiples). (2) DCF - projecting future cash flows and discounting to present value. (3) Asset-based - book value of assets minus liabilities, adjusted for market conditions.',
    },
    {
      question: 'What EBITDA multiple is typical for my industry?',
      answer: 'EBITDA multiples vary by industry: Tech/SaaS: 10-15x, Healthcare: 8-12x, Financial services: 12-15x, Manufacturing: 5-7x, Retail: 3-5x, Restaurants: 2-4x. Higher multiples indicate growth potential, recurring revenue, lower risk, or strategic value.',
    },
    {
      question: 'How does business age affect valuation?',
      answer: 'Businesses under 3 years typically receive 0.7x normal valuation due to uncertainty. 3-5 years: 0.85x. 5-10 years: 0.95x. Over 10 years: full valuation. Established businesses with proven track records and stable customer bases command higher values.',
    },
    {
      question: 'What factors increase business value beyond financials?',
      answer: 'Key value drivers include: recurring revenue/contracts, customer concentration (lower is better), proprietary IP/technology, experienced management team, low customer churn, strong brand reputation, scalable operations, and documented processes that reduce key-person risk.',
    },
    {
      question: 'When should I get a professional business valuation?',
      answer: 'Professional valuation is essential for: M&A transactions, partnership disputes, estate planning, divorce proceedings, SBA loan applications, buy-sell agreements. DIY estimates are useful for planning, but formal valuations by certified appraisers carry legal weight.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <BusinessValuationCalculator />
    </>
  )
}