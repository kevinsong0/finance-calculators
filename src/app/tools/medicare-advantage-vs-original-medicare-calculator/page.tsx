import MedicareAdvantageVsOriginalMedicareCalculator from '@/components/MedicareAdvantageVsOriginalMedicareCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between Original Medicare and Medicare Advantage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Original Medicare (Parts A and B) is government-run, lets you see any Medicare-approved doctor nationwide, and requires separate Part D and Medigap plans. Medicare Advantage (Part C) is private insurance that bundles A, B, and usually D, uses provider networks, and has a maximum out-of-pocket limit.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which is better if I travel frequently?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Original Medicare is better for frequent travelers because you can see any Medicare-approved provider nationwide. Medicare Advantage plans typically only cover emergencies when you\'re outside your network area.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Medicare Advantage have a maximum out-of-pocket limit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Medicare Advantage plans have a maximum out-of-pocket (MOOP) limit, typically around $4,500-8,000 per year. Original Medicare has no cap unless you buy Medigap, which can limit your exposure but adds premium costs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I switch between Original Medicare and Medicare Advantage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can switch during Medicare Open Enrollment (October 15 - December 7) each year. Changes take effect January 1. You can also switch during the Medicare Advantage Open Enrollment Period (January 1 - March 31).',
        },
      },
      {
        '@type': 'Question',
        name: 'Which option includes prescription drug coverage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most Medicare Advantage plans include Part D prescription drug coverage. With Original Medicare, you must enroll in a separate Part D plan, which costs extra. Medigap plans do not include drug coverage.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MedicareAdvantageVsOriginalMedicareCalculator />
    </>
  )
}