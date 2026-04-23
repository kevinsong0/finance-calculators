'use client'

import StateTaxDeductionCalculator from '@/components/StateTaxDeductionCalculator'

export default function StateTaxDeductionCalculatorPage() {
  const faqs = [
    {
      question: "What is the SALT deduction?",
      answer: "SALT (State and Local Tax) deduction allows itemizers to deduct state/local income or sales taxes plus property taxes. Before TCJA: unlimited deduction. After TCJA (2018-2025): capped at $10,000 total. Includes: state income tax, local income tax, property tax (real estate). Must choose: deduct income taxes OR sales taxes (not both). High-tax state residents (CA, NY, NJ) hit $10K cap quickly, losing deduction for excess taxes paid."
    },
    {
      question: "What is the SALT $10,000 cap?",
      answer: "TCJA capped SALT deduction at $10,000 per return (not per person). Single, married filing jointly, married filing separately: all limited to $10K total. Married filing separately: $5K each. Combined state income + local income + property taxes cannot exceed $10K deduction. Excess taxes paid are not deductible. High earners in CA, NY, NJ often pay $30K-$50K+ in state taxes but can only deduct $10K. SALT cap expires 2025 unless extended."
    },
    {
      question: "What taxes qualify for SALT deduction?",
      answer: "Qualifying taxes: State income taxes, local income taxes (city taxes), property taxes on real estate, state/local sales taxes (choose income OR sales, not both). Not qualifying: Federal taxes, foreign taxes, property taxes on business/investment property (different rules), estate/inheritance taxes, gift taxes. SALT applies only to taxes on personal residence and personal income. Business property taxes deducted differently."
    },
    {
      question: "Should I deduct income tax or sales tax?",
      answer: "Choose whichever is larger. Income tax deduction: state/local income taxes paid during year (withholding + payments). Sales tax deduction: actual sales tax paid (requires receipts) OR IRS sales tax tables based on income + state. Most taxpayers deduct income taxes (usually larger). Consider sales tax if: no state income tax (TX, FL, WA), major purchases with high sales tax (car, boat). Calculate both, choose maximum."
    },
    {
      question: "Does SALT deduction beat standard deduction?",
      answer: "Compare SALT + other itemized deductions vs standard deduction. Standard deduction 2024: $14,600 single, $29,200 married. SALT limited to $10K. Need additional itemized deductions (mortgage interest, charitable contributions) to exceed standard. Most taxpayers now take standard deduction due to increased amount and SALT cap. SALT benefit only if itemizing total exceeds standard. High-tax states + mortgage interest + charitable giving may make itemizing worthwhile."
    },
    {
      question: "What is the pass-through entity tax SALT workaround?",
      answer: "Some states allow pass-through entities (S corps, partnerships) to pay state tax at entity level. Entity-level tax not subject to $10K SALT cap (business deduction, not personal). Tax credited to owner's personal state tax liability. States with PTE workaround: CA, NY, NJ, CT, others. Reduces federal tax burden while effectively circumventing SALT cap. Requires business entity structure. Consult tax advisor for eligibility."
    },
    {
      question: "Can I deduct property tax separately from income tax?",
      answer: "No. Property tax and income tax combined under $10K SALT cap. Cannot deduct property tax beyond cap even if income tax zero. Example: $15K property tax, no income tax. Deduction limited to $10K. $5K property tax wasted. Property tax part of SALT, not separate deduction. This impacts retirees in high-property-tax states (no income but high property tax)."
    },
    {
      question: "How does SALT cap affect high-tax states?",
      answer: "High-tax states severely impacted: California (13.3% top rate), New York (12.7% combined), New Jersey (10.75%), Connecticut (6.99% + local). Taxpayers paying $20K-$50K+ state income tax can only deduct $10K. Effective federal tax rate higher due to non-deductible state taxes. Taxpayers in these states subsidize federal budget more. Some states created PTE workarounds. SALT cap debate continues in Congress."
    },
    {
      question: "When does SALT cap expire?",
      answer: "SALT $10,000 cap expires December 31, 2025 along with most TCJA individual provisions. After 2025: SALT deduction returns to unlimited (pre-TCJA rules) unless Congress extends cap. Possible outcomes: cap extended, cap increased (proposals for $15K-$20K), cap removed entirely. Current proposals vary by party. High-tax state representatives pushing for cap increase or removal. Plan for potential changes after 2025."
    },
    {
      question: "How do I report SALT deduction on tax return?",
      answer: "Itemize on Schedule A. Line 5a: State and local income taxes. Line 5b: State and local sales taxes. Line 5c: Real estate taxes. Enter amounts, cap applies automatically (cannot exceed $10K total). Use Line 5e for total SALT deduction (capped). Schedule A totals flow to Form 1040 Line 12 (total itemized deductions). Compare to standard deduction. Take whichever larger. Tax software calculates automatically."
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
      <StateTaxDeductionCalculator />
    </>
  )
}