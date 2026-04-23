'use client'

import { useState } from 'react'
import IntangibleAssetsAmortizationCalculator from '@/components/IntangibleAssetsAmortizationCalculator'

export default function IntangibleAssetsAmortizationCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'How long does Section 197 intangible amortization take?',
      answer: 'Section 197 intangibles (goodwill, patents acquired with business, trademarks, customer lists) must be amortized over 15 years using straight-line method. This is mandatory - you cannot choose a different period or method.',
    },
    {
      question: 'When does amortization begin?',
      answer: 'Amortization begins in the month the intangible is acquired, or at the beginning of the following month. For tax purposes, you can choose either starting point, but must be consistent.',
    },
    {
      question: 'Can separately acquired patents be amortized differently?',
      answer: 'Yes. Patents acquired separately (not with a business) can be amortized over their useful life, not necessarily 15 years. However, if acquired as part of a business purchase, they become Section 197 intangibles with 15-year amortization.',
    },
    {
      question: 'What about off-the-shelf software?',
      answer: 'Off-the-shelf computer software is amortized over 3 years (not Section 197). Software developed internally is capitalized and amortized. Software acquired with a business falls under Section 197 (15 years).',
    },
    {
      question: 'Can impairment losses be deducted immediately?',
      answer: 'Yes. If an intangible asset becomes impaired (fair value less than carrying value), the impairment loss can be deducted immediately for tax purposes. This creates a permanent book-tax difference.',
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
        <IntangibleAssetsAmortizationCalculator />
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