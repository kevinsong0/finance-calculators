import LikeKindExchangeCalculator from '@/components/LikeKindExchangeCalculator'

export const metadata = {
  title: 'Like-Kind Exchange Calculator | Section 1031 Tax Deferred Exchange',
  description: 'Calculate Section 1031 like-kind exchange for tax deferral. Evaluate boot, gain deferral, timeline compliance, and replacement property qualification.',
  openGraph: {
    title: 'Like-Kind Exchange Calculator',
    description: 'Calculate 1031 exchange tax deferral and qualification.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is a like-kind exchange?',
    answer: 'A Section 1031 like-kind exchange allows you to swap investment or business property for similar property without recognizing capital gains tax. The tax is deferred until you sell the replacement property outside an exchange.',
  },
  {
    question: 'What property qualifies after 2018?',
    answer: 'The Tax Cuts and Jobs Act of 2017 limited 1031 exchanges to real property only. Personal property (equipment, vehicles, artwork) no longer qualifies. All types of real estate can still qualify if held for business or investment.',
  },
  {
    question: 'What are the timeline deadlines?',
    answer: 'For delayed exchanges, you must identify replacement properties within 45 days and close within 180 days of selling the relinquished property. The 180-day deadline also cannot exceed your tax return filing deadline plus extensions.',
  },
  {
    question: 'What is boot in an exchange?',
    answer: 'Boot is any non-like-kind property you receive in the exchange. This includes cash, personal property, or relief from debt (if replacement property has less debt than relinquished). Boot triggers recognized taxable gain.',
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
      <LikeKindExchangeCalculator />
    </>
  )
}