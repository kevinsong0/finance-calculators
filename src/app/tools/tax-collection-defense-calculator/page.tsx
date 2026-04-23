import TaxCollectionDefenseCalculator from '@/components/TaxCollectionDefenseCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Collection Defense Calculator | IRS Collection Strategies',
  description: 'Calculate defense strategies against IRS collection action. Evaluate CDP appeals, payment plans, CNC status, and Offer in Compromise options.',
  openGraph: {
    title: 'Tax Collection Defense Calculator',
    description: 'Calculate defense strategies against IRS collection.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What is the first step when facing IRS collection?',
    answer: 'Respond to all IRS notices promptly. If you receive a levy notice, file a Collection Due Process (CDP) appeal within 30 days. Contact the IRS to discuss payment options or request Currently Not Collectible status if you cannot pay.',
  },
  {
    question: 'What is Currently Not Collectible (CNC) status?',
    answer: 'CNC status indicates the IRS has determined you cannot pay your tax debt without causing economic hardship. Collection action is suspended, but the debt remains and the 10-year statute continues. Interest and penalties accrue.',
  },
  {
    question: 'When should I consider an Offer in Compromise?',
    answer: 'An OIC is appropriate when you cannot pay the full tax debt within the 10-year collection statute, or when there is doubt about the tax liability. The IRS accepts OICs based on doubt as to collectibility, doubt as to liability, or effective tax administration.',
  },
  {
    question: 'What assets can the IRS levy?',
    answer: 'The IRS can levy bank accounts, wages, Social Security benefits (limited to 15%), retirement accounts (rarely), and real or personal property. Some assets are exempt: minimal personal effects, certain unemployment benefits, and certain annuity payments.',
  },
]

export default function TaxCollectionDefenseCalculatorPage() {
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
      <TaxCollectionDefenseCalculator />
    </>
  )
}