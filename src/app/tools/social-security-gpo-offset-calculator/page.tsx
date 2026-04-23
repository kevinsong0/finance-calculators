import SocialSecurityGPOOffsetCalculator from '@/components/SocialSecurityGPOOffsetCalculator'

export default function SocialSecurityGPOOffsetCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Government Pension Offset (GPO)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GPO is a Social Security rule that reduces spousal or survivor benefits by 2/3 of your government pension from non-covered employment. It affects workers who did not pay Social Security taxes on their government job.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the GPO reduction formula work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GPO reduces your Social Security spousal or survivor benefit by 2/3 of your monthly government pension. For example, a $1,200 pension results in an $800 GPO reduction.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can GPO eliminate my Social Security benefit entirely?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, if your GPO reduction (2/3 of your pension) exceeds your spousal or survivor benefit, the benefit is eliminated entirely. Many government retirees receive $0 from Social Security.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SocialSecurityGPOOffsetCalculator />
    </>
  )
}