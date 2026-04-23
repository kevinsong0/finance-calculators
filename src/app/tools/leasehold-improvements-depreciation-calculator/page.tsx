'use client'

import { useState } from 'react'
import LeaseholdImprovementsDepreciationCalculator from '@/components/LeaseholdImprovementsDepreciationCalculator'

export default function LeaseholdImprovementsDepreciationCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'What is the depreciation period for leasehold improvements?',
      answer: 'Qualified Leasehold Improvements (QLI) depreciate over 15 years using MACRS, not 39 years like regular buildings. This accelerated depreciation applies to interior improvements in nonresidential buildings under certain lease arrangements.',
    },
    {
      question: 'What qualifies as a leasehold improvement?',
      answer: 'Interior improvements to nonresidential buildings: walls, floors, lighting, HVAC, plumbing. Must be made by lessee or lessor of the space. Excludes structural components, elevators, escalators, and internal common areas. The lease must have at least 39 years remaining.',
    },
    {
      question: 'Can leasehold improvements get bonus depreciation?',
      answer: 'Yes! QLI qualifies for bonus depreciation. For 2024, bonus depreciation is 60%. This means 60% of the improvement cost can be deducted immediately, with the remaining 40% depreciated over 15 years.',
    },
    {
      question: 'What if the lease term is shorter than recovery period?',
      answer: 'If remaining lease term is shorter than the recovery period, you may need to amortize over the lease term instead. However, QLI treatment (15-year) generally applies regardless of lease term for qualified property.',
    },
    {
      question: 'What about restaurant and retail improvements?',
      answer: 'Qualified Restaurant Property (any improvement to restaurant building) and Qualified Retail Improvements (interior of retail building open to public) also get 15-year depreciation. Restaurants have broader qualification criteria than regular QLI.',
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
        <LeaseholdImprovementsDepreciationCalculator />
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