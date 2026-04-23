'use client'

import { useState } from 'react'
import RealEstateProfessionalStatusCalculator from '@/components/RealEstateProfessionalStatusCalculator'

export default function RealEstateProfessionalStatusCalculatorPage() {
  const [showFAQ, setShowFAQ] = useState(false)

  const faqItems = [
    {
      question: 'What are the requirements for Real Estate Professional Status?',
      answer: 'Two tests must both be met: (1) More than 750 hours of personal services in real estate activities, and (2) More than 50% of your total personal services hours in real estate activities. Total personal services includes all trades or businesses you participate in.',
    },
    {
      question: 'What counts toward the 750-hour requirement?',
      answer: 'Qualifying activities include: property acquisition/disposition, management, repairs, tenant relations, leasing, development, and brokerage. Investment-only activities like research or financial management don\'t count. You must materially participate, not just oversee.',
    },
    {
      question: 'How does REPS benefit rental property owners?',
      answer: 'Without REPS, rental losses are passive and limited to passive income. With REPS, rental activities become non-passive if you materially participate. This allows rental losses to offset W-2 income, business income, or any other active income without limitation.',
    },
    {
      question: 'Do spouse hours count toward REPS?',
      answer: 'Yes, if filing jointly. Spouse hours count toward both the 750-hour test and the 50% test. This can help couples qualify even if one spouse works full-time elsewhere. Filing separately requires each spouse to qualify independently.',
    },
    {
      question: 'Why does IRS audit REPS claims frequently?',
      answer: 'REPS is a high-risk area because taxpayers often claim status without adequate documentation. Time logs are critical. IRS challenges whether hours were truly in real estate activities versus investment activities. Keep detailed records of all activities.',
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
        <RealEstateProfessionalStatusCalculator />
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