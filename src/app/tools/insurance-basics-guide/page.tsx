import type { Metadata } from 'next';
import { Suspense } from 'react';
import InsuranceBasicsGuide from '@/components/InsuranceBasicsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What insurance do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Essential insurance types: Required by law: Auto insurance - mandatory for drivers, minimum liability varies by state, health insurance - required in some situations (ACA mandate effectively removed but still important). Strongly recommended: Health insurance - medical costs unpredictable, essential for financial protection, homeowners/renters - protects property and liability, most lenders require for mortgages. If you have dependents: Life insurance - provides for family if you die, amount based on income replacement needs, typically 10-15x annual income. For workers: Disability insurance - protects income if can&apos;t work, employer may provide, supplement if inadequate. Optional based on risk: Umbrella liability - extra liability coverage above auto/home limits, valuable for high assets, professional liability - for certain professions. Assessment: Legal requirements first, health always, property protection, income protection, liability based on asset level. Insurance = protection against financial catastrophe. Prioritize health, required coverages, then income/property/liability based on situation."
      }
    },
    {
      "@type": "Question",
      "name": "What is an insurance deductible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Insurance deductible explained: Definition: Amount you pay before insurance covers costs, applies per claim or per year (varies), higher deductible = lower premium. Examples: Health insurance - $500-5,000 deductible annually, auto collision - $500-1,000 deductible per incident, homeowners - $500-2,500 deductible per claim. Trade-off: High deductible + low premium = pay less monthly, but more when claim happens, good if rarely claim, savings accumulate. Low deductible + high premium = pay more monthly, less when claim happens, good if expect claims, budget predictability. Choosing deductible: Financial ability - can you pay deductible if needed?, claim frequency - how often do you expect claims?, premium savings - does lower premium offset risk?, risk tolerance - comfort with higher out-of-pocket. Savings math: $500 higher deductible might save $200/year premium, if no claim in 2.5 years = savings exceed deductible increase. Deductible = your cost before insurance pays. Higher deductible = lower premium, more risk. Choose based on ability to pay and claim likelihood."
      }
    },
    {
      "@type": "Question",
      "name": "How do insurance premiums work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Insurance premiums explained: Definition: Payment to maintain coverage, paid monthly/quarterly/annually, determines coverage period. Premium factors: Risk assessment - your likelihood of claims, coverage amount - higher coverage = higher premium, deductible level - lower deductible = higher premium, location - geographic risk factors, claims history - past claims affect future premiums, age/health (life/health), vehicle/home (property), credit score (some states). Premium vs coverage: Premium = cost for coverage, not the coverage amount itself, coverage limit = maximum payout, premium buys the protection, lower premium may mean less coverage. Premium payment: Monthly - convenient, slightly higher total cost sometimes, annual - often slight discount, pay upfront, due date - missing payment risks coverage lapse. Premium comparison: Compare same coverage levels, same deductible amounts, different insurers rates vary, bundle discounts possible. Premium = price you pay. Factors determine your rate. Compare apples to apples. Lower premium may mean less coverage or higher deductible."
      }
    },
    {
      "@type": "Question",
      "name": "What is coinsurance vs copay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Coinsurance vs copay: Copay: Fixed dollar amount per service, paid at time of service, predictable cost, examples: $20 doctor visit, $50 specialist, $100 ER. Coinsurance: Percentage of cost you pay, after deductible met, varies with service cost, examples: 20% coinsurance = you pay 20%, insurance pays 80%. Differences: Copay = fixed amount (know cost upfront), coinsurance = percentage (cost varies by service), copay often applies before deductible, coinsurance applies after deductible met, copay common for routine services, coinsurance common for major services. Example: Service costs $1,000, copay $50 (pay $50 regardless), coinsurance 20% after deductible (pay $200 if deductible met). Out-of-pocket maximum: Both copay and coinsurance count toward annual max, once max reached, insurance pays 100%, protects against catastrophic costs. Understanding = budgeting for healthcare. Copay = predictable fixed cost. Coinsurance = percentage cost after deductible. Both contribute to out-of-pocket max."
      }
    },
    {
      "@type": "Question",
      "name": "How much life insurance do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Life insurance amount calculation: Income replacement method: Annual income x years needed, typically 10-15 years of income, example: $60,000 income x 10 years = $600,000 coverage. Factors: Dependents - spouse, children, elderly parents?, years of support needed - children&apos;s age to adulthood, debt - mortgage, loans, other obligations, education - college costs for children, lifestyle - maintain current standard of living, existing assets - other income sources, savings, social security survivor benefits. Calculation approach: Income replacement + debts + education + final expenses - existing assets + emergency fund for family. Example: $60K income for 10 years = $600K, mortgage balance $200K, college $100K, final expenses $20K, total $920K coverage. Simplified guidelines: 10-15x annual income (common recommendation), adjust for specific needs, consider decreasing needs over time (kids grow up). Review periodically: Coverage needs change with life events, marriage, children, new home, job changes, update coverage as situation changes. Amount = dependents + debts + goals. 10-15x income baseline. Calculate specific needs, adjust for situation, review periodically."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Insurance Basics Guide - Types, Concepts & Selection',
  description: 'Insurance types, key concepts, deductible, copay, coinsurance explained.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <InsuranceBasicsGuide />
    </Suspense>
  );
}