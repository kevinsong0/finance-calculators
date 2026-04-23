import type { Metadata } from 'next';
import { Suspense } from 'react';
import HealthInsuranceGuide from '@/components/HealthInsuranceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between HMO and PPO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HMO vs PPO health plans: HMO (Health Maintenance Organization): Lower premiums, require primary care physician, need referrals for specialists, smaller network, no out-of-network coverage, focus on preventive care, less flexibility but lower cost. PPO (Preferred Provider Organization): Higher premiums, no primary care requirement, no referrals needed, larger network, out-of-network coverage available (higher cost), more flexibility, higher monthly cost but more freedom. Choose HMO: Lower cost matters, don&apos;t mind referrals, stay in network, want predictable costs. Choose PPO: Flexibility matters, want specialist access, might use out-of-network, willing to pay more for freedom. Trade-off: cost vs flexibility. HMO = lower cost, less choice. PPO = higher cost, more choice."
      }
    },
    {
      "@type": "Question",
      "name": "What is a health insurance deductible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Health insurance deductible: Amount you pay before insurance covers costs. Example: $1,000 deductible = you pay first $1,000 of covered services, then insurance pays per plan terms. How it works: Preventive care often free (no deductible), other services apply to deductible, after deductible: copays or coinsurance, once met: insurance pays larger share. Trade-off: Higher deductible = lower monthly premium, but more risk if care needed. Lower deductible = higher premium, but less out-of-pocket when care needed. Consider: Health needs (chronic conditions = lower deductible better), Budget (can you afford deductible if needed?), HSA eligibility (high deductible plans qualify). Deductible = major cost factor. Balance premium vs deductible based on expected usage."
      }
    },
    {
      "@type": "Question",
      "name": "What are ACA subsidies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ACA (Obamacare) subsidies: Premium tax credits reduce monthly premium. Eligibility: Income 100-400% of federal poverty level, no other affordable coverage available, US citizen/legal resident, purchase through marketplace. Amount: Based on income, household size, plan cost in area, second-lowest silver plan benchmark. Example: $40k income single person = may pay ~$100-300/month vs full $400-600. Apply: Through healthcare.gov marketplace, estimate income for year, reconcile on tax return if income differs. Other subsidies: Medicaid expansion (below 100% FPL in some states), CHIP for children. Subsidies = significant savings for eligible. Check eligibility even if you think you won&apos;t qualify. Use marketplace calculator."
      }
    },
    {
      "@type": "Question",
      "name": "What does out-of-pocket maximum mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Out-of-pocket maximum (OOP max): Maximum amount you pay for covered services in a year. After reaching: Insurance pays 100% of covered services. What counts toward OOP max: Deductible, copays, coinsurance. What doesn&apos;t count: Premiums, services not covered, out-of-network costs (in some plans), balance billing. Example: $5,000 OOP max = worst case you pay $5,000 for covered care (plus premiums). Considerations: Higher OOP max = lower premium but more risk, Lower OOP max = higher premium but capped risk, Important for: chronic conditions, families, risk-averse individuals. Note: Some plans have separate OOP max for in-network vs out-of-network. OOP max = your worst-case expense. Important for financial planning. Choose based on risk tolerance."
      }
    },
    {
      "@type": "Question",
      "name": "When can I enroll in health insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Health insurance enrollment periods: Open Enrollment (Nov 1 - Jan 15): Annual period to enroll/change ACA marketplace plans, employer plans have their own open enrollment (often fall). Special Enrollment Period: Qualifying life events allow enrollment outside open enrollment - marriage, birth/adoption, loss of other coverage, moving to new area, change in income. Employer plans: New job = enrollment, open enrollment annually, qualifying events similar. Medicare: Initial enrollment (3 months before to 3 months after turning 65), general enrollment (Jan-Mar if missed initial), special enrollment for qualifying events. Medicaid: Any time if eligible. Tips: Don&apos;t miss open enrollment, document qualifying events for special enrollment, know your employer&apos;s enrollment period. Miss enrollment = wait until next year (or qualify for special enrollment). Plan ahead."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Health Insurance Guide - Types, Terms & Selection',
  description: 'Health insurance types, key terms, plan comparison, and selection tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HealthInsuranceGuide />
    </Suspense>
  );
}