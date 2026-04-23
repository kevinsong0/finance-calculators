import TaxAttributeCarryoverCalculator from '@/components/TaxAttributeCarryoverCalculator'

export const metadata = {
  title: 'Tax Attribute Carryover Calculator | NOL, Credits, Losses',
  description: 'Track and project utilization of tax carryovers including NOLs, tax credits, capital losses, and deduction carryforwards.',
  openGraph: {
    title: 'Tax Attribute Carryover Calculator',
    description: 'Track tax carryover utilization and expiration.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What types of tax attributes can be carried forward?',
    answer: 'Common carryforward tax attributes include Net Operating Losses (NOLs), tax credits (general business credits, foreign tax credits), capital losses (3 years for individuals, indefinite for corporations), and charitable contribution deductions exceeding AGI limits (5 years).',
  },
  {
    question: 'How long can NOLs be carried forward?',
    answer: 'Pre-2018 NOLs can be carried forward for 20 years. Post-2017 NOLs under TCJA have unlimited carryforward (no expiration). However, post-2017 NOLs are limited to offsetting only 80% of taxable income, while pre-2018 NOLs can offset 100%.',
  },
  {
    question: 'What happens if a carryover expires unused?',
    answer: 'If a carryover expires before being fully utilized, the remaining amount is lost permanently. The tax benefit is forfeited. This is why it\'s important to track carryovers and plan utilization, especially when approaching expiration.',
  },
  {
    question: 'Do states have different carryover rules?',
    answer: 'Yes, state tax carryover rules often differ from federal rules. Some states don\'t allow NOL carryforwards at all, some have shorter carryforward periods, and some have different credit carryforward rules. Always check state-specific rules when planning.',
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
      <TaxAttributeCarryoverCalculator />
    </>
  )
}