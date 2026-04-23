'use client'

import { useState } from 'react'
import InstallmentSaleTaxCalculator from '@/components/InstallmentSaleTaxCalculator'

export default function InstallmentSaleTaxCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'What is an installment sale for tax purposes?',
      answer: 'An installment sale is when you receive at least one payment after the tax year of sale. Instead of recognizing all gain immediately, you report gain proportionally as you receive payments using the gross profit ratio method.',
    },
    {
      question: 'How is the gross profit ratio calculated?',
      answer: 'Gross Profit Ratio = (Total Gain / Contract Price). Each payment\'s principal portion is multiplied by this ratio to determine the capital gain recognized. The ratio stays fixed for the entire installment period.',
    },
    {
      question: 'Can depreciation recapture be spread over installments?',
      answer: 'No. Depreciation recapture (Section 1245 for equipment, Section 1250 for real estate) must be recognized entirely in year 1. It cannot be deferred through the installment method. Only the remaining gain can be spread.',
    },
    {
      question: 'What assets qualify for installment sales?',
      answer: 'Most capital assets qualify: real estate, business interests, investment property. Exceptions: inventory (always ordinary income), marketable securities (publicly traded stocks/bonds), dealers\' property.',
    },
    {
      question: 'Is interest on installment payments taxable?',
      answer: 'Yes, interest on deferred payments is taxable as ordinary income in the year received. You must charge adequate interest (per AFR rules) or the IRS may impute interest and recharacterize principal as interest.',
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
        <InstallmentSaleTaxCalculator />
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