import TaxAttributionRulesCalculator from '@/components/TaxAttributionRulesCalculator'

export const metadata = {
  title: 'Tax Attribution Rules Calculator | Section 267, 318',
  description: 'Calculate constructive ownership under tax attribution rules. Determine related party status for loss disallowance and transaction restrictions.',
  openGraph: {
    title: 'Tax Attribution Rules Calculator',
    description: 'Calculate constructive ownership and related party status.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What are tax attribution rules?',
    answer: 'Attribution rules (Sections 267 and 318) determine constructive ownership by attributing stock owned by family members, partnerships, corporations, and trusts to you. This determines if you are a related party.',
  },
  {
    question: 'Who is considered a family member for attribution?',
    answer: 'For tax attribution, family includes your spouse, children, grandchildren, parents, and grandparents. Siblings are NOT included in attribution rules.',
  },
  {
    question: 'What happens if I sell to a related party?',
    answer: 'Losses on sales to related parties are disallowed under Section 267. The buyer\'s basis becomes their purchase price. The loss is deferred until they sell to an unrelated party.',
  },
  {
    question: 'What is the 50% threshold?',
    answer: 'If you have 50% or more constructive ownership (direct + attributed), you are a related party. Transactions with the entity or other owners may trigger loss disallowance or other restrictions.',
  },
]

export default function Page() {
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
      <TaxAttributionRulesCalculator />
    </>
  )
}