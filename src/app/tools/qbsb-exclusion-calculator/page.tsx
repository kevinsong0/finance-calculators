import QSBSExclusionCalculator from '@/components/QSBSExclusionCalculator'

export const metadata = {
  title: 'QSBS Exclusion Calculator | Section 1202 Qualified Small Business Stock',
  description: 'Calculate Section 1202 QSBS gain exclusion. Up to $10M per issuer excluded for qualified small business stock held over 5 years.',
  openGraph: {
    title: 'QSBS Exclusion Calculator',
    description: 'Calculate qualified small business stock gain exclusion.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is QSBS?',
    answer: 'Qualified Small Business Stock (QSBS) is stock in a C corporation with less than $50M in gross assets at the time of issuance, acquired as original issue directly from the corporation, held for more than 5 years.',
  },
  {
    question: 'How much gain can be excluded?',
    answer: 'Up to $10M of gain per issuer can be excluded from federal tax. Alternatively, 10x your basis can be excluded if that is greater than $10M. The exclusion is 100% for stock issued after September 27, 2010.',
  },
  {
    question: 'Do states conform to QSBS exclusion?',
    answer: 'Many states do NOT conform to the Section 1202 exclusion. California and New York, for example, still tax QSBS gains at the state level even though they are excluded federally. Check your state conformity.',
  },
  {
    question: 'What happens if I sell before 5 years?',
    answer: 'If you sell QSBS before the 5-year holding period, the exclusion does not apply and the full gain is taxable. However, you can roll the gain into new QSBS within 60 days under Section 1045.',
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
      <QSBSExclusionCalculator />
    </>
  )
}