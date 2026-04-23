'use client'

import { useState } from 'react'
import TaxLossCarrybackCalculator from '@/components/TaxLossCarrybackCalculator'

export default function TaxLossCarrybackCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'Can I carry back a net operating loss?',
      answer: 'Under current rules (TCJA 2017), most businesses cannot carry back NOLs. However, farming businesses can still carry back NOLs 2 years. The CARES Act temporarily allowed 5-year carryback for 2018-2020 NOLs, but this provision has expired.',
    },
    {
      question: 'What is the 80% limit on NOL carryforward?',
      answer: 'NOL carryforwards can offset only up to 80% of taxable income in each year. For example, if you have $100,000 taxable income and a $100,000 NOL, you can only offset $80,000, leaving $20,000 taxable income. The remaining NOL carries forward.',
    },
    {
      question: 'How long can I carry forward an NOL?',
      answer: 'Under TCJA 2017, NOLs can be carried forward indefinitely (no expiration). Before TCJA, NOLs expired after 20 years. The unlimited carryforward applies to NOLs arising in tax years beginning after 2017.',
    },
    {
      question: 'How do I claim a carryback refund quickly?',
      answer: 'File Form 1045 (individuals) or Form 1139 (corporations) within 12 months after the end of the loss year for a quick refund. Alternatively, file amended returns (Form 1040-X or 1120-X) but this takes longer to process.',
    },
    {
      question: 'Should I elect to carry forward instead of carry back?',
      answer: 'Carryback provides immediate refund (time value of money advantage). Carryforward delays tax benefit to future years. Generally, elect carryback if allowed and prior years had significant income. Consider carryforward if expecting higher future tax rates.',
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
        <TaxLossCarrybackCalculator />
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