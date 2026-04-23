'use client'

import { useState } from 'react'
import StartupCostsAmortizationCalculator from '@/components/StartupCostsAmortizationCalculator'

export default function StartupCostsAmortizationCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'What are startup costs for tax purposes?',
      answer: 'Startup costs include: market research, advertising for opening, employee training before opening, salaries paid before opening, travel to secure suppliers/distributors, professional fees, and licenses/permits. These are costs incurred before your business actively begins operations.',
    },
    {
      question: 'How much can I deduct immediately?',
      answer: 'Up to $5,000 of startup costs and $5,000 of organizational costs can be deducted immediately in year 1. However, this $5,000 deduction phases out dollar-for-dollar when total costs exceed $50,000. At $55,000+ costs, the immediate deduction is zero.',
    },
    {
      question: 'What happens to costs over $5,000?',
      answer: 'Costs exceeding the immediate deduction threshold are amortized over 15 years (180 months). Amortization begins in the month your business actively starts operations, not when costs were incurred.',
    },
    {
      question: 'Do I need to make an election?',
      answer: 'Yes. You must attach a statement to your first tax return electing to amortize startup costs under Section 195. The deadline is the due date including extensions. If you fail to elect, you must amortize all costs over 15 years anyway, but lose the immediate deduction.',
    },
    {
      question: 'What if the business fails before 15 years?',
      answer: 'If the business closes before amortization completes, any remaining unamortized startup costs can be deducted as a loss on the final return. This provides some protection if the venture doesn\'t succeed.',
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
        <StartupCostsAmortizationCalculator />
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