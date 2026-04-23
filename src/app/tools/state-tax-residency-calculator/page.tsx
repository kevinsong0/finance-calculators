'use client'

import { useState } from 'react'
import StateTaxResidencyCalculator from '@/components/StateTaxResidencyCalculator'

export default function StateTaxResidencyCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'What is domicile for state tax purposes?',
      answer: 'Domicile is your permanent home - the place you intend to return to after temporary absences. It requires both physical presence and intent to remain. Key indicators include home ownership, voter registration, bank accounts, and family location.',
    },
    {
      question: 'What is the 183-day rule for statutory residency?',
      answer: 'Many states (especially NY) consider you a statutory resident if you spend more than 183 days in the state AND maintain a permanent place of abode there. This can trigger full-year tax residency even if your domicile is elsewhere.',
    },
    {
      question: 'How is income allocated for multi-state taxation?',
      answer: 'Full-year residents are taxed on all income worldwide. Part-year residents allocate income by residency period. Nonresidents are only taxed on income sourced to that state (wages earned there, rental income from property there).',
    },
    {
      question: 'Can I be taxed by two states on the same income?',
      answer: 'Yes, this creates double taxation risk. States like CA, NY, CT, NJ tax residents on worldwide income. Most states offer credits for taxes paid to other states, reducing but not eliminating double taxation.',
    },
    {
      question: 'Which states have no income tax?',
      answer: 'Texas (TX), Florida (FL), Washington (WA), Nevada (NV), South Dakota (SD), Alaska (AK), and Wyoming (WY) have no state income tax. Moving domicile to these states can eliminate state income tax entirely.',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <StateTaxResidencyCalculator />
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <button onClick={() => setShowFAQ(!showFAQ)} className="w-full text-left flex justify-between items-center">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <span className="text-2xl">{showFAQ ? '−' : '+'}</span>
          </button>
          {showFAQ && (
            <div className="mt-4 space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-medium text-lg mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}