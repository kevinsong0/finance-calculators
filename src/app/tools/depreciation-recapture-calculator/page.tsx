'use client'

import DepreciationRecaptureCalculator from '@/components/DepreciationRecaptureCalculator'

export default function DepreciationRecaptureCalculatorPage() {
  const faqs = [
    {
      question: "What is depreciation recapture?",
      answer: "Depreciation recapture occurs when you sell depreciated business property at a gain. The IRS 'recaptures' depreciation deductions you claimed, taxing that amount as ordinary income or at special rates instead of capital gains rates. This prevents double tax benefit: deducting depreciation AND getting capital gains treatment."
    },
    {
      question: "What is Section 1245 recapture?",
      answer: "Section 1245 applies to personal property: equipment, machinery, vehicles, furniture, intangible assets. ALL accumulated depreciation is recaptured as ordinary income (up to total gain). The recaptured amount is taxed at your ordinary income tax rate (10-37%). Only excess gain beyond depreciation gets capital gains treatment."
    },
    {
      question: "What is Section 1250 recapture?",
      answer: "Section 1250 applies to real property: buildings, structural components. Only EXCESS depreciation (accelerated beyond straight-line) is recaptured. Most modern depreciation uses straight-line, so no true recapture. However, 'unrecaptured Section 1250 gain' (accumulated depreciation) is taxed at special 25% rate, not 15%/20% capital gains."
    },
    {
      question: "What is unrecaptured Section 1250 gain?",
      answer: "Unrecaptured Section 1250 gain is the portion of gain attributable to straight-line depreciation on real property. It's taxed at maximum 25% rate (not ordinary income rates, but higher than 15%/20% LTCG rates). This applies to buildings held long-term and depreciated using standard MACRS straight-line."
    },
    {
      question: "How do I calculate depreciation recapture tax?",
      answer: "Calculate: 1) Accumulated depreciation claimed, 2) Adjusted basis (purchase price - depreciation), 3) Total gain (sale price - adjusted basis), 4) Recapture amount = depreciation (Section 1245) or excess depreciation (Section 1250), 5) Tax at ordinary rates (1245) or 25% (unrecaptured 1250), 6) Remaining gain taxed as capital gains."
    },
    {
      question: "Does depreciation recapture apply if I sell at a loss?",
      answer: "No. If you sell depreciated property for LESS than adjusted basis, there's no recapture. You get a loss deduction instead. Loss = adjusted basis - sale price. However, loss may be ordinary (not capital) if property used in business. No double benefit concern when there's no gain."
    },
    {
      question: "Can I avoid depreciation recapture with a 1031 exchange?",
      answer: "Yes, a Section 1031 like-kind exchange defers ALL gain including depreciation recapture. You swap property for similar property and defer recognition. However, recapture 'carries forward' to the new property - it's not eliminated. Future sale of replacement property will face accumulated recapture."
    },
    {
      question: "What tax form do I use for depreciation recapture?",
      answer: "Report depreciation recapture on Form 4797 (Sales of Business Property). Section 1245 recapture goes on Part III. Section 1250 recapture on Part III. Unrecaptured 1250 gain on Schedule D as capital gain with special 25% rate. DO NOT report solely on Schedule D - Form 4797 is required."
    },
    {
      question: "Does cost segregation increase recapture risk?",
      answer: "Yes. Cost segregation breaks building into components (5-year, 7-year, 15-year property instead of 27.5/39-year). These faster-depreciating components are Section 1245 property. More depreciation claimed = larger recapture if sold at gain. Benefit while holding, risk upon sale."
    },
    {
      question: "What if I converted rental property to personal use?",
      answer: "Depreciation recapture still applies even after conversion. If you lived in former rental before selling, depreciation claimed during rental period is still recaptured. However, you may qualify for Section 121 home sale exclusion on non-depreciation portion of gain. Recapture portion is NOT excluded."
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          })
        }}
      />
      <DepreciationRecaptureCalculator />
    </>
  )
}