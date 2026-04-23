import KiddieTaxUnearnedIncomeCalculator from '@/components/KiddieTaxUnearnedIncomeCalculator'

export const metadata = {
  title: 'Kiddie Tax Unearned Income Calculator | Child Investment Tax',
  description: 'Calculate tax on child\'s unearned income at parent\'s tax rate. Understand kiddie tax thresholds and filing requirements.',
  openGraph: {
    title: 'Kiddie Tax Unearned Income Calculator',
    description: 'Calculate kiddie tax on child\'s investment income.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is the kiddie tax?',
    answer: 'The kiddie tax is a special tax rule that applies to children\'s unearned income (investments, dividends, interest) above certain thresholds. Instead of being taxed at the child\'s lower rate, the excess income is taxed at the parent\'s higher marginal rate.',
  },
  {
    question: 'What are the kiddie tax thresholds for 2024?',
    answer: 'For 2024, the first $1,250 of unearned income is tax-free (offset by standard deduction). The next $1,250 is taxed at the child\'s rate (10%). Any unearned income above $2,500 is taxed at the parent\'s marginal rate.',
  },
  {
    question: 'Who is subject to kiddie tax?',
    answer: 'Kiddie tax applies to children under age 19, or under age 24 if a full-time student. The child must have unearned income exceeding the threshold ($2,500 for 2024). It does not apply to earned income from wages.',
  },
  {
    question: 'How can I avoid or minimize kiddie tax?',
    answer: 'Strategies include investing in tax-free municipal bonds, using tax-deferred accounts like 529 plans or Roth IRAs, delaying capital gains realization until the child is 19 (or 24 if student), or investing in growth stocks that don\'t generate dividends.',
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
      <KiddieTaxUnearnedIncomeCalculator />
    </>
  )
}