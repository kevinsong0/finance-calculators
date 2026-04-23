'use client'

import { useState } from 'react'
import RelatedPartyTransactionTaxCalculator from '@/components/RelatedPartyTransactionTaxCalculator'

export default function RelatedPartyTransactionTaxCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'Who counts as a related party for tax purposes?',
      answer: 'Related parties include: (1) Family members: spouse, parents, children, siblings, grandparents, grandchildren, (2) Controlled entities: corporations/partnerships where you own more than 50%, (3) Grantor trusts and their beneficiaries, (4) More than 50% owned entities with common ownership.',
    },
    {
      question: 'Why are losses on sales to related parties disallowed?',
      answer: 'Section 267 disallows losses on sales to related parties to prevent taxpayers from selling assets at artificial losses to family members while retaining economic benefit. The loss is permanently disallowed, not deferred - you lose the tax benefit entirely.',
    },
    {
      question: 'What if the related party later sells at a gain?',
      answer: 'Under Section 267(d), if you sold at a loss to a related party who later sells to an unrelated buyer at a gain, the related party\'s gain is reduced by your previously disallowed loss. This prevents double taxation but doesn\'t give you the benefit.',
    },
    {
      question: 'Are gifts to related parties taxed?',
      answer: 'No gain or loss is recognized on gifts. The recipient takes your carryover basis. Gift tax may apply if value exceeds annual exclusion ($18,000 per recipient in 2024) or lifetime exemption ($13.61 million in 2024).',
    },
    {
      question: 'How are below-market loans to family taxed?',
      answer: 'If you lend to family at below-market rates, the IRS imputes interest at the Applicable Federal Rate (AFR). You have imputed interest income; the borrower may have imputed interest expense if the loan is for business/investment. Gift element exists if below AFR.',
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
        <RelatedPartyTransactionTaxCalculator />
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