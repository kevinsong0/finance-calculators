'use client'

import { useState } from 'react'
import Section179DeductionCalculator from '@/components/Section179DeductionCalculator'

export default function Section179DeductionCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'What is the Section 179 deduction limit for 2024?',
      answer: 'For 2024, the maximum Section 179 deduction is $1,220,000. The phase-out begins when total asset purchases exceed $3,050,000, reducing the deduction dollar-for-dollar above this threshold.',
    },
    {
      question: 'Can I use Section 179 for vehicles?',
      answer: 'Yes, but vehicles have specific limits. Passenger cars are limited to $11,200 for Section 179 in 2024. Trucks, vans, and SUVs have a $12,200 limit. Bonus depreciation can add additional first-year depreciation beyond these limits.',
    },
    {
      question: 'What happens if I have no business income?',
      answer: 'Section 179 deduction is limited to your business income. If you have insufficient income, the unused deduction carries forward to future tax years. You cannot create a loss with Section 179.',
    },
    {
      question: 'Do I need 100% business use for Section 179?',
      answer: 'Yes, Section 179 generally requires 100% business use. If you have mixed personal/business use, you may need to use regular depreciation instead. Listed property (vehicles, computers) has strict use requirements.',
    },
    {
      question: 'How does Section 179 interact with bonus depreciation?',
      answer: 'Apply Section 179 first (up to your limits), then apply bonus depreciation to remaining cost. For 2024, bonus depreciation is 60%. This combination allows significant first-year expensing for qualifying assets.',
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
        <Section179DeductionCalculator />
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