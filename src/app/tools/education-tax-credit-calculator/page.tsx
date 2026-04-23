import EducationTaxCreditCalculator from '@/components/EducationTaxCreditCalculator'

export const metadata = {
  title: 'Education Tax Credit Calculator 2024-2025 | AOTC & LLC Estimator',
  description: 'Calculate your American Opportunity Tax Credit (AOTC) and Lifetime Learning Credit (LLC) for 2024-2025. Compare education tax credits to maximize your savings.',
  keywords: 'education tax credit calculator, American Opportunity Tax Credit, AOTC calculator, Lifetime Learning Credit, LLC calculator, college tax credit, student tax credit, education credit comparison',
}

const faqData = [
  {
    question: 'What is the American Opportunity Tax Credit (AOTC) amount?',
    answer: 'The American Opportunity Tax Credit provides up to $2,500 per eligible student for the first four years of higher education. The credit is 100% of the first $2,000 in qualified expenses plus 25% of the next $2,000. Up to $1,000 (40%) is refundable.',
  },
  {
    question: 'What is the Lifetime Learning Credit (LLC) amount?',
    answer: 'The Lifetime Learning Credit provides up to $2,000 per tax return (not per student) for qualified education expenses. The credit is 20% of up to $10,000 in expenses. Unlike AOTC, the LLC is entirely non-refundable.',
  },
  {
    question: 'What are the income limits for education tax credits?',
    answer: 'For 2024, AOTC phases out between $80,000-$90,000 (single) and $160,000-$180,000 (MFJ). LLC phases out between $80,000-$90,000 (single) and $160,000-$180,000 (MFJ). You cannot claim both credits for the same student in the same year.',
  },
  {
    question: 'Can I claim both AOTC and Lifetime Learning Credit?',
    answer: 'You cannot claim both credits for the same student in the same tax year. However, you can claim AOTC for one student and LLC for another student in the same year. Our calculator helps you compare which credit is best for each student.',
  },
  {
    question: 'What education expenses qualify for these credits?',
    answer: 'Qualified expenses include tuition, fees, and course-related books, supplies, and equipment required for enrollment. Room and board, insurance, medical expenses, and transportation do not qualify.',
  },
]

export default function EducationTaxCreditCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((faq) => ({
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
      <EducationTaxCreditCalculator />
    </>
  )
}