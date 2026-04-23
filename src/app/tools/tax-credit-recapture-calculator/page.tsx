import TaxCreditRecaptureCalculator from '@/components/TaxCreditRecaptureCalculator'

export const metadata = {
  title: 'Tax Credit Recapture Calculator | ITC, Energy, Rehabilitation Credits',
  description: 'Calculate recapture when disposing of tax credit property early. Understand holding requirements and recapture percentages.',
  openGraph: {
    title: 'Tax Credit Recapture Calculator',
    description: 'Calculate tax credit recapture on early disposition.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is tax credit recapture?',
    answer: 'Recapture occurs when you dispose of property for which you claimed a tax credit before the required holding period. The credit is added back to your taxable income at a percentage based on how early you disposed.',
  },
  {
    question: 'How does ITC recapture work?',
    answer: 'Investment Tax Credit (ITC) has a 5-year holding requirement. Disposing in year 1 triggers 100% recapture. Each year reduces recapture by 20%. After year 5, there is no recapture. Recapture is treated as ordinary income.',
  },
  {
    question: 'What credits have recapture?',
    answer: 'Investment Tax Credit (Section 48), Rehabilitation Credit, Energy Credits (solar, wind), and Work Opportunity Tax Credit all have holding requirements. Some credits like rehabilitation require full 5-year hold with no reduction schedule.',
  },
  {
    question: 'Does foreclosure trigger recapture?',
    answer: 'Yes, foreclosure and abandonment typically trigger full recapture regardless of holding period. The disposition is treated as if you intentionally disposed of the credit property early.',
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
      <TaxCreditRecaptureCalculator />
    </>
  )
}