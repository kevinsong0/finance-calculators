'use client'

import { useState } from 'react'
import RollovervsDirectRothConversionCalculator from '@/components/RollovervsDirectRothConversionCalculator'

export default function RollovervsDirectRothConversionCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'What is the difference between rollover and direct Roth conversion?',
      answer: 'Rollover path: 401k → Traditional IRA → Roth IRA (two steps). Direct path: In-plan Roth conversion within 401k (single step). Both result in Roth funds but differ in investment options, control, and process complexity.',
    },
    {
      question: 'Which path has better investment options?',
      answer: 'IRA typically offers broader investment options including individual stocks, ETFs, and thousands of mutual funds. 401k plans usually offer limited menu of 10-30 funds. If 401k options are limited, rollover to IRA may be preferable.',
    },
    {
      question: 'What is the five-year rule for Roth conversions?',
      answer: 'Roth IRA: 5-year clock starts from first Roth IRA contribution for tax-free withdrawals. Roth 401k: Each conversion has its own 5-year clock for penalty-free withdrawal of converted amounts. Both require age 59½ for tax-free earnings.',
    },
    {
      question: 'Can after-tax 401k contributions be converted tax-free?',
      answer: 'Yes. After-tax contributions (mega backdoor Roth) can be converted to Roth tax-free. In rollover path, after-tax goes directly to Roth IRA. In direct path, it converts to Roth 401k. The earnings on after-tax are taxable.',
    },
    {
      question: 'When should I choose rollover vs direct conversion?',
      answer: 'Choose rollover if: leaving job soon, plan doesn\'t allow in-plan Roth, need broader investments. Choose direct if: staying with employer, plan allows, 401k options adequate, want simplicity. Tax impact is the same either way.',
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
        <RollovervsDirectRothConversionCalculator />
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