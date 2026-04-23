import HomeOfficeDeductionMethodsCalculator from '@/components/HomeOfficeDeductionMethodsCalculator'

export const metadata = {
  title: 'Home Office Deduction Methods Calculator | Regular vs Simplified',
  description: 'Compare regular and simplified home office deduction methods. Calculate which method gives you the larger deduction.',
  openGraph: {
    title: 'Home Office Deduction Methods Calculator',
    description: 'Compare regular vs simplified home office deduction methods.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is the simplified home office deduction?',
    answer: 'The simplified method allows a deduction of $5 per square foot of office space, up to a maximum of 300 square feet ($1,500 maximum deduction). It requires no complex calculations, no Form 8829, and has no depreciation recapture risk when you sell your home.',
  },
  {
    question: 'What is the regular home office deduction method?',
    answer: 'The regular method allocates actual home expenses (mortgage interest, property taxes, utilities, insurance, repairs, depreciation) based on the business percentage of your home. You calculate the percentage by dividing office square feet by total home square feet. Requires Form 8829.',
  },
  {
    question: 'Which method should I use?',
    answer: 'If your actual allocated expenses exceed $1,500, the regular method gives a larger deduction. However, consider the complexity of Form 8829 and potential depreciation recapture when selling your home. For smaller offices or simpler tax situations, the simplified method may be preferable.',
  },
  {
    question: 'What are the home office requirements?',
    answer: 'The space must be used exclusively and regularly as your principal place of business, or for meeting clients/customers. Exclusive use means no personal activities in that space. The deduction is limited to your net business income - it cannot create or increase a business loss.',
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
      <HomeOfficeDeductionMethodsCalculator />
    </>
  )
}