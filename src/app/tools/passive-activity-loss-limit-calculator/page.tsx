'use client'

import { useState } from 'react'
import PassiveActivityLossLimitCalculator from '@/components/PassiveActivityLossLimitCalculator'

export default function PassiveActivityLossLimitCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'What is a passive activity for tax purposes?',
      answer: 'Passive activities include: (1) Rental activities (unless you qualify as Real Estate Professional), and (2) Businesses where you don\'t materially participate. Material participation generally requires 500+ hours per year or meeting other specific tests.',
    },
    {
      question: 'How are passive losses limited?',
      answer: 'Passive losses can only offset passive income. Excess passive losses are suspended and carried forward. Suspended losses are released when you dispose of the entire activity in a taxable transaction or generate more passive income.',
    },
    {
      question: 'What is the $25,000 rental loss allowance?',
      answer: 'Taxpayers with active participation in rental real estate and AGI below $100,000 can deduct up to $25,000 of rental losses against non-passive income. This allowance phases out between $100,000-$150,000 AGI, disappearing entirely at $150,000+.',
    },
    {
      question: 'How does REPS change passive activity rules?',
      answer: 'If you qualify as a Real Estate Professional, your rental activities are not automatically passive. With material participation, rental losses become non-passive and can offset any income type. This is the primary benefit of REPS status.',
    },
    {
      question: 'Can I combine multiple rental properties?',
      answer: 'Yes, through aggregation election. If you make this election on Form 8582, you can treat multiple rental real estate activities as one activity. This helps meet material participation tests across combined properties and allows more loss deductions.',
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
        <PassiveActivityLossLimitCalculator />
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