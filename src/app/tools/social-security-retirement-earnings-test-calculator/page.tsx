import SocialSecurityRetirementEarningsTestCalculator from '@/components/SocialSecurityRetirementEarningsTestCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Social Security retirement earnings test?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The retirement earnings test limits how much you can earn while receiving Social Security benefits before your Full Retirement Age. In 2024, if you earn more than $22,280, SSA withholds $1 of benefits for every $2 you earn above the limit.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I lose withheld Social Security benefits forever?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, withheld benefits are not lost. When you reach Full Retirement Age, SSA recalculates your benefit to credit the months when benefits were withheld. This increases your monthly benefit for the rest of your life.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the earnings test apply after Full Retirement Age?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, once you reach your Full Retirement Age (66-67 depending on birth year), there is no earnings test. You can earn unlimited income without any Social Security benefit reduction.',
        },
      },
      {
        '@type': 'Question',
        name: 'What income counts toward the earnings test?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Only earned income (wages, salary, self-employment income) counts toward the earnings test. Investment income, pensions, annuities, and retirement account distributions do not count.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the earnings limit in 2024?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Before FRA: $22,280 per year (SSA withholds $1 per $2 over limit). Year of FRA: $59,460 per year (SSA withholds $1 per $3 over limit, only for months before FRA). After FRA: No limit.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SocialSecurityRetirementEarningsTestCalculator />
    </>
  )
}