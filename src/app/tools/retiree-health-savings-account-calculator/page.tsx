import RetireeHealthSavingsAccountCalculator from '@/components/RetireeHealthSavingsAccountCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I contribute to HSA after enrolling in Medicare?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, you cannot contribute to an HSA after enrolling in Medicare Part A or Part B. However, you can still use existing HSA funds tax-free for qualified medical expenses, including Medicare premiums.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the HSA catch-up contribution amount?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you are age 55 or older, you can contribute an additional $1,000 per year as a catch-up contribution. This is added to the standard limit ($4,150 for self-only, $8,300 for family coverage in 2024).',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use HSA funds for Medicare premiums?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, HSA funds can be used tax-free for Medicare Part B, Part D, and Medicare Supplement (Medigap) premiums. However, they cannot be used for Medigap Plan F premiums in most cases.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens to my HSA after age 65?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After age 65, you can withdraw HSA funds for non-medical expenses penalty-free (but still subject to income tax). For medical expenses, withdrawals remain tax-free. This makes HSA a potential additional retirement account.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the triple tax advantage of HSA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HSA offers three tax benefits: (1) Contributions are tax-deductible or pre-tax, (2) Investment growth is tax-free, and (3) Withdrawals for qualified medical expenses are tax-free. This triple advantage makes HSA more valuable than traditional retirement accounts for healthcare costs.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RetireeHealthSavingsAccountCalculator />
    </>
  )
}