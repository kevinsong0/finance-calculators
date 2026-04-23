'use client'

import { useState } from 'react'
import RothConversionTimingOptimizerCalculator from '@/components/RothConversionTimingOptimizerCalculator'

export default function RothConversionTimingOptimizerCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'When is the best time to do a Roth conversion?',
      answer: 'Best timing depends on: (1) Known tax bracket - convert early if expecting lower bracket this year, (2) Market dips - converting when account value is lower means less tax, (3) Income variability - convert in low-income years, (4) Before Medicare - conversions increase MAGI affecting IRMAA surcharges after age 63.',
    },
    {
      question: 'Should I convert early or late in the year?',
      answer: 'Early conversion gives more time for potential recovery if values drop. Late conversion lets you know full year income for bracket certainty. Consider splitting: convert some early (potential dip opportunity), some late (bracket certainty).',
    },
    {
      question: 'How does Roth conversion affect Medicare IRMAA?',
      answer: 'Roth conversion adds to MAGI which determines Medicare Part B/D IRMAA surcharges 2 years later. Large conversions at age 63-65 can trigger higher Medicare premiums. Consider smaller conversions spread over multiple years to stay below IRMAA thresholds.',
    },
    {
      question: 'Can I undo a Roth conversion?',
      answer: 'No. Since 2018, recharacterization of Roth conversions is no longer allowed. Once converted, it stays Roth. This makes timing decisions irreversible - plan conversions carefully before executing.',
    },
    {
      question: 'How much should I convert each year?',
      answer: 'Convert enough to: (1) Fill current tax bracket without pushing into higher bracket, (2) Stay below Medicare IRMAA thresholds if applicable, (3) Consider future Required Minimum Distributions - convert enough to reduce future RMD impact. Strategic multi-year ladders work best.',
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
        <RothConversionTimingOptimizerCalculator />
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