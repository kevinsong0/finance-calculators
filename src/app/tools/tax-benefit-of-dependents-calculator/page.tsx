'use client'

import TaxBenefitOfDependentsCalculator from '@/components/TaxBenefitOfDependentsCalculator'

export default function TaxBenefitOfDependentsCalculatorPage() {
  const faqs = [
    {
      question: "What tax credits are available for dependents?",
      answer: "Tax credits for dependents: Child Tax Credit ($2000 per child under 17), Additional Child Tax Credit ($1700 refundable per child), Credit for Other Dependents ($500 per qualifying relative), Child and Dependent Care Credit (20-35% of childcare expenses up to $3000-$6000), Earned Income Tax Credit (up to $9320 for 3+ children). Head of Household filing status: higher standard deduction ($21,900 vs $14,600). Total potential benefit: $10,000+ per child depending on income and expenses."
    },
    {
      question: "What is the Child Tax Credit amount?",
      answer: "Child Tax Credit: $2000 per qualifying child under 17. Phaseout begins at $200K (single) or $400K (married). Credit reduced $50 per $1000 over threshold. Fully phases out at $400K (single) or $600K (married). Additional Child Tax Credit: up to $1700 refundable per child. Refundable portion available even if no tax liability. Total: up to $2000 non-refundable + $1700 refundable = $3700 per child maximum. Must meet qualifying child requirements."
    },
    {
      question: "What is Credit for Other Dependents?",
      answer: "Credit for Other Dependents (ODC): $500 per qualifying relative. For dependents who do NOT qualify for Child Tax Credit: elderly parents, adult dependents, college students 17+, other relatives. Same phaseout rules as CTC: $200K (single), $400K (married). Non-refundable credit (limited to tax owed). Qualifying relative must: have gross income under $5050, receive more than half support from you, live with you or be related, not be qualifying child of anyone else."
    },
    {
      question: "How does Child and Dependent Care Credit work?",
      answer: "Child and Dependent Care Credit: 20-35% of childcare expenses for working parents. Maximum expenses: $3000 for one child, $6000 for two+ children. Rate based on income: 35% if income ≤$15K, 30% if $15K-$25K, 25% if $25K-$35K, 22% if $35K-$45K, 20% if >$45K. Maximum credit: $1050 (one child), $2100 (two+). Child must be under 13. Care must be for work/job seeking. Provider cannot be spouse or dependent. Credit non-refundable."
    },
    {
      question: "Who qualifies as a dependent for tax purposes?",
      answer: "Two types: Qualifying Child and Qualifying Relative. Qualifying Child: under 17, lived with you >half year, US citizen/resident, did not provide >half own support, related to you (child, sibling, stepchild, foster, descendant). Qualifying Relative: not qualifying child of anyone, gross income <$5050, you provided >half support, lived with you all year OR related, US citizen/resident. Only one taxpayer can claim each dependent. Cannot claim dependent who files joint return (except EITC only)."
    },
    {
      question: "What is Head of Household filing status?",
      answer: "Head of Household: unmarried, paid >half cost of keeping home, have qualifying dependent living with you >half year. Benefits: higher standard deduction ($21,900 vs $14,600 single), wider tax brackets (lower tax than single). Tax savings: approximately $1500-$3000 depending on income. Requirements: unmarried or considered unmarried (spouse lived apart last 6 months), qualifying person (child, parent, other relative) lived with you >half year, you paid >half household costs. Cannot use if married filing jointly."
    },
    {
      question: "How much can dependents reduce taxes?",
      answer: "Dependent tax benefits: Child Tax Credit $2000 per child, Additional CTC $1700 refundable per child, ODC $500 per qualifying relative, Child Care Credit up to $2100, EITC up to $9320 (3+ children). Example: 2 children, $100K income, $5000 childcare. Benefits: CTC $4000, ACTC $3400, CDCC $1000, EITC $0 (above limit). Total: $5400 in credits. Plus HOH if single: additional ~$1500 in tax savings from higher deduction. Total benefit: $7000+ per year with 2 children."
    },
    {
      question: "What are qualifying child requirements for CTC?",
      answer: "Qualifying Child requirements for Child Tax Credit: Age: under 17 at end of year. Relationship: child, stepchild, foster child, sibling, stepsibling, or descendant. Residence: lived with you more than half the year. Support: did not provide more than half of own support. Citizenship: US citizen, US national, or resident alien. Joint return: not filing joint return (or filing only to claim refund). Dependency: claimed as dependent on your return. Only one taxpayer can claim each child."
    },
    {
      question: "Can adult dependents be claimed for tax benefits?",
      answer: "Yes. Adult dependents qualify for Credit for Other Dependents ($500). Requirements: gross income <$5050 (2024), you provided >half support, lived with you all year OR related (parent, sibling, in-law), not qualifying child of anyone. Adult children 17+ who don't meet CTC age limit qualify for ODC. Elderly parents with low income qualify for ODC. Adult dependents do NOT qualify for Child Tax Credit, Child Care Credit, or EITC. Non-refundable credit: limited to your tax liability."
    },
    {
      question: "What documents prove dependent status?",
      answer: "Proof of dependent status: Birth certificates (relationship, age). School records (residence, age). Medical records (residence). Social Security numbers (required for CTC/ODC). Custody agreements (for divorced parents). Form 8332: Release of Claim to Exemption (for noncustodial parent). Childcare provider records (name, address, SSN/TIN, amount paid). College enrollment records (for students). Support documentation (bank records showing payments). IRS may request documentation in audit."
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
      <TaxBenefitOfDependentsCalculator />
    </>
  )
}