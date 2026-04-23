import EducationSavingsCalculator from '@/components/EducationSavingsCalculator'

export default function EducationSavingsCalculatorPage() {
  const faqs = [
    {
      question: 'What is a 529 college savings plan?',
      answer: 'A 529 plan is a tax-advantaged savings account designed for education expenses. Contributions grow tax-free and withdrawals are tax-free when used for qualified education expenses (tuition, books, room and board). Some states offer state tax deductions for 529 contributions.',
    },
    {
      question: 'What is the contribution limit for 529 plans?',
      answer: '529 plans have very high contribution limits, typically $200,000-$500,000 per beneficiary depending on the state. There are no annual contribution limits, though gifts exceeding $18,000 per year may require gift tax reporting. Most states set aggregate lifetime limits.',
    },
    {
      question: 'How does Coverdell ESA differ from 529?',
      answer: 'Coverdell ESA has a $2,000 annual contribution limit per child and income restrictions (phase-out at $110K single, $220K married). However, it can be used for K-12 expenses and has more investment flexibility. 529 plans have higher limits and are better for college savings.',
    },
    {
      question: 'What happens to 529 funds if not used for college?',
      answer: 'Non-qualified withdrawals face a 10% penalty on earnings plus income tax. However, you can change the beneficiary to another family member, use up to $10,000 for student loan repayment, or save the funds for future educational needs including graduate school.',
    },
    {
      question: 'Should I account for college cost inflation?',
      answer: 'Yes, college costs increase approximately 5% annually. A $100,000 target today may require $150,000-$200,000 when your child reaches college age. Factor inflation into your savings target and consider increasing contributions over time.',
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
      <EducationSavingsCalculator />
    </>
  )
}