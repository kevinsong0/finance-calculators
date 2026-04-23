'use client'

import { useState } from 'react'
import BusinessEntityTaxComparisonCalculator from '@/components/BusinessEntityTaxComparisonCalculator'

export default function BusinessEntityTaxComparisonCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'Which business entity type has the lowest taxes?',
      answer: 'S-Corporations often provide the lowest total tax burden for profitable businesses because distributions avoid self-employment tax. However, sole proprietorships/LLCs are simpler for small incomes, and C-Corporations can benefit large businesses that retain earnings or offer significant employee benefits.',
    },
    {
      question: 'What is the self-employment tax savings from S-Corp?',
      answer: 'S-Corp distributions (profit share beyond salary) are not subject to 15.3% self-employment tax. For example, if your business earns $200,000 and you take $100,000 salary, the $100,000 distribution saves approximately $15,300 in SE tax compared to sole proprietorship.',
    },
    {
      question: 'Why does C-Corp have double taxation?',
      answer: 'C-Corporations pay 21% corporate tax on profits, then shareholders pay dividend tax (usually 15-20%) when profits are distributed. This "double taxation" totals 36%+ tax on the same income. However, retained earnings avoid the dividend tax layer.',
    },
    {
      question: 'What is reasonable compensation for S-Corp?',
      answer: 'S-Corp owners must take a "reasonable" salary subject to FICA taxes. The IRS generally expects 40-60% of profits as salary. Too low salary triggers IRS audit and reclassification of distributions as wages with penalties.',
    },
    {
      question: 'Should I form an LLC or S-Corp?',
      answer: 'Start with LLC for liability protection and simplicity. Consider S-Corp election (Form 2553) when annual profits exceed $60,000-80,000 and SE tax savings outweigh additional payroll costs, corporate formalities, and potential audit risk.',
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
        <BusinessEntityTaxComparisonCalculator />
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