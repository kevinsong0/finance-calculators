'use client'

import HSAContributionCalculator from '@/components/HSAContributionCalculator'

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "HSA Contribution Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Calculate HSA contribution limits and maximize triple tax benefits.",
  "featureList": ["HSA contribution limits", "Triple tax advantage", "Eligibility requirements", "Catch-up contributions"]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finance.128345827.xyz" },
    { "@type": "ListItem", "position": 2, "name": "Tax Hub", "item": "https://finance.128345827.xyz/tools/tax-hub" },
    { "@type": "ListItem", "position": 3, "name": "HSA Calculator", "item": "https://finance.128345827.xyz/tools/hsa-contribution-calculator" }
  ]
};

export default function HSAContributionCalculatorPage() {
  const faqs = [
    { question: 'What are the 2024 HSA contribution limits?', answer: 'Self-only: $4,150. Family: $8,300. Catch-up (55+): $1,000 additional. Total limit includes employer contributions. Employer + your contributions must not exceed limit. Example: employer $1K, self-only, age 55: you can contribute $3,150 (total $4,150). Family coverage, age 55: max $9,300. Maximize HSA: contribute limit each year for triple tax benefit.' },
    { question: 'What is the triple tax advantage of HSA?', answer: 'Triple tax advantage: 1) Contributions tax-free (reduces AGI). 2) Growth tax-free (invest HSA funds). 3) Withdrawals tax-free for qualified medical expenses. Best retirement account: tax-free at all three stages. FICA savings: 7.65% on contributions (pre-tax payroll). State tax: most states also tax-free (CA, NJ not). Can use for medical anytime, non-medical after 65 (penalty-free, taxed like Traditional IRA). Keep medical receipts for future reimbursement.' },
    { question: 'Can I invest my HSA funds?', answer: 'Yes. Invest HSA like retirement account once balance exceeds minimum. Most HSA providers offer investment options. Strategy: pay medical out-of-pocket, invest HSA for growth, reimburse later with saved receipts. Receipts can be reimbursed years later (no time limit). Example: $5K medical today, pay cash, invest HSA $5K, reimburse in 20 years with growth. HSA becomes additional retirement account for medical or non-medical after 65.' },
    { question: 'What medical expenses qualify for HSA?', answer: 'Qualified medical: doctor visits, prescriptions, dental, vision, hospital, medical equipment, mental health, preventive care. Not qualified: cosmetic, gym memberships, vitamins (unless prescribed), non-medical items. Insurance premiums: not qualified except long-term care, COBRA, Medicare premiums (after 65). Keep receipts: can reimburse years later. Use HSA debit card for qualified expenses. Check IRS Publication 502 for full list. Save receipts indefinitely for future reimbursement.' },
    { question: 'What is HSA eligibility requirements?', answer: 'Required: High-Deductible Health Plan (HDHP). 2024 HDHP: deductible min $1,600 self/$3,200 family, out-of-pocket max $8,000 self/$16,000 family. No other health coverage (except preventive care, dental, vision). Not enrolled in Medicare. Not covered by general-purpose FSA. Eligibility check: verify HDHP, no other coverage, not on Medicare. Can contribute until Medicare enrollment (age 65+). Last contribution: year Medicare starts (pro-rated by months before Medicare).' },
  ]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity: faqs.map(faq => ({'@type':'Question',name: faq.question,acceptedAnswer:{'@type':'Answer',text: faq.answer}}))})}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HSAContributionCalculator />
    </>
  )
}
