'use client'

import { useState } from 'react'
import ConstructiveOwnershipRulesCalculator from '@/components/ConstructiveOwnershipRulesCalculator'

export default function ConstructiveOwnershipRulesCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'What is constructive ownership?',
      answer: 'Constructive ownership means you are treated as owning stock or interests that are actually owned by related parties (spouse, children, parents) or controlled entities. This prevents circumventing tax rules by distributing ownership among family members.',
    },
    {
      question: 'How does family attribution work?',
      answer: 'Spouse\'s stock is attributed to each other automatically. Minor children\'s stock is attributed to parents. Parents\' stock is attributed to children. Siblings\' stock is NOT attributed to each other under Section 267 rules.',
    },
    {
      question: 'What is entity attribution?',
      answer: 'If you own more than 50% of a corporation, partnership, or trust, the entity\'s ownership in other businesses is attributed to you. This prevents indirect control through intermediary entities.',
    },
    {
      question: 'Why do constructive ownership rules matter?',
      answer: 'These rules affect: (1) Related party loss disallowance under Section 267, (2) Passive activity tests under Section 469, (3) At-risk calculations under Section 465, (4) Affiliated group status under Section 1504 for consolidated filing.',
    },
    {
      question: 'Can constructive ownership exceed 100%?',
      answer: 'Yes! Attribution can come from multiple sources. For example, you might directly own 30%, spouse 25%, children 25%, and a controlled corporation 30% = 110% constructive ownership. Multiple attribution paths can overlap.',
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
        <ConstructiveOwnershipRulesCalculator />
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