'use client'

import { useState } from 'react'
import ForeignTaxCreditLimitCalculator from '@/components/ForeignTaxCreditLimitCalculator'

export default function ForeignTaxCreditLimitCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'What is the foreign tax credit limit?',
      answer: 'The FTC limit equals (Foreign Source Taxable Income / Worldwide Taxable Income) × US Tax. This ratio limits your credit to ensure you don\'t claim more credit than the US tax attributable to foreign income. If foreign tax exceeds this limit, excess carries forward.',
    },
    {
      question: 'Why must I separate foreign income into baskets?',
      answer: 'Form 1116 requires separate calculations for "general category" (active business income) and "passive category" (interest, dividends). Each basket has its own credit limit calculation. This prevents mixing high-tax passive income with low-tax active income.',
    },
    {
      question: 'Should I claim foreign tax credit or deduction?',
      answer: 'Credit is usually better because it directly reduces US tax dollar-for-dollar. Deduction only reduces taxable income (saving approximately 24-37 cents per dollar of foreign tax). Credit benefit equals the full foreign tax amount up to the limit.',
    },
    {
      question: 'How long can I carry over excess foreign tax credit?',
      answer: 'Excess FTC can be carried back 1 year and carried forward 10 years. The carryover expires after 10 years - unused credits are lost. Track carryover amounts and expiration dates carefully to maximize utilization.',
    },
    {
      question: 'What if foreign tax rate is higher than US rate?',
      answer: 'If foreign tax exceeds the FTC limit (because foreign rate exceeds US rate on that income), you cannot claim full credit. Excess carries forward. Alternatively, you can elect to deduct foreign taxes instead of claiming credit (Form 1116 election).',
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
        <ForeignTaxCreditLimitCalculator />
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