import PayrollTaxCalculator from '@/components/PayrollTaxCalculator'

export const metadata = {
  title: 'Payroll Tax Calculator for Employers 2024 | SS, Medicare, FUTA, SUTA',
  description: 'Calculate employer payroll taxes including Social Security, Medicare, FUTA, SUTA, and employee benefit costs. Estimate total employer cost per employee and payroll tax obligations.',
  keywords: 'payroll tax calculator, employer payroll taxes, FUTA calculator, SUTA tax, Social Security employer tax, Medicare tax, payroll cost per employee',
}

const faqData = [
  {
    question: 'What payroll taxes do employers pay?',
    answer: 'Employers pay: Social Security (6.2% on wages up to $168,600), Medicare (1.45% on all wages), FUTA (0.6% on first $7,000 per employee), SUTA (state unemployment, varies by state), and employer-provided benefits. Total employer cost typically adds 15-20% to wages.',
  },
  {
    question: 'What is the Social Security wage base limit for 2024?',
    answer: 'The Social Security wage base limit for 2024 is $168,600 per employee. Employers and employees each pay 6.2% up to this limit. Wages above $168,600 are not subject to Social Security tax (but still subject to Medicare).',
  },
  {
    question: 'What is FUTA and how is it calculated?',
    answer: 'FUTA (Federal Unemployment Tax Act) is 0.6% on the first $7,000 of wages per employee, after receiving SUTA credit. Most employers pay $42 per employee ($7,000 × 0.6%). Employers in credit reduction states may pay higher rates.',
  },
  {
    question: 'How does SUTA tax work?',
    answer: 'SUTA (State Unemployment Tax) rates vary by state and employer history. New employers pay a fixed rate. Experienced employers rates adjust based on layoff history. Tax applies to first $7,000-$68,500 of wages depending on state. Rates typically 2-5%.',
  },
  {
    question: 'What is the additional Medicare tax?',
    answer: 'Additional Medicare tax is 0.9% paid by employees on wages exceeding $200,000 (Single) or $250,000 (MFJ). Employers do not pay this additional tax. Employers must withhold it once employee wages exceed the threshold.',
  },
]

export default function PayrollTaxCalculatorPage() {
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
      <PayrollTaxCalculator />
    </>
  )
}