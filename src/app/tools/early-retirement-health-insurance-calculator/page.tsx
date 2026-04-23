import EarlyRetirementHealthInsuranceCalculator from '@/components/EarlyRetirementHealthInsuranceCalculator'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What health insurance options exist for early retirees before Medicare?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Early retirees (ages 55-64) have several options: ACA marketplace plans with income-based subsidies, COBRA continuation (max 18 months), health share plans (faith-based alternatives), spouse employer coverage, part-time work benefits, or private market plans. ACA subsidies can significantly reduce premiums if you manage your income strategically."
      }
    },
    {
      "@type": "Question",
      "name": "How do ACA subsidies work for early retirees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ACA premium subsidies are based on household income relative to federal poverty level. Subsidies can reduce premiums to 2-9.5% of income depending on your income tier. For 2026, subsidies phase out around 400% of FPL (~$60,000 for single, ~$80,000 for couple). Managing portfolio withdrawals to keep MAGI below subsidy cliffs is crucial."
      }
    },
    {
      "@type": "Question",
      "name": "How much does health insurance cost for early retirees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Costs vary by state, health status, and coverage type. Without subsidies: $450-$900/month for individual, $900-$1800 for couple. With subsidies: can be $0-$200/month depending on income. COBRA costs ~102% of employer premium (~$600-$1200/month). Health share plans cost ~$200-$400/month but are not traditional insurance."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best strategy for managing ACA subsidy eligibility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use Roth conversions before age 60 to avoid counting as income later. Draw from savings/non-taxable sources first. Delay Social Security to age 70. Keep taxable withdrawals under subsidy cliff threshold (~$60K individual, ~$80K couple for 2026). Use HSA funds tax-free for premiums. Manage capital gains harvesting carefully."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use HSA funds for health insurance premiums before Medicare?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, HSA funds can be used tax-free for ACA premiums, COBRA, and long-term care insurance premiums. However, you cannot contribute to HSA while on Medicare (age 65+). Use accumulated HSA funds strategically during the gap years to reduce out-of-pocket premium costs."
      }
    }
  ]
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EarlyRetirementHealthInsuranceCalculator />
    </>
  )
}