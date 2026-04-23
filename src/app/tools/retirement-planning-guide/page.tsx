import type { Metadata } from 'next';
import { Suspense } from 'react';
import RetirementPlanningGuide from '@/components/RetirementPlanningGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much do I need to save for retirement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retirement savings targets: General guideline: 10-12x your final annual salary. Income replacement: 70-80% of pre-retirement income annually. Milestones: Age 30 - 1x annual salary saved. Age 40 - 3x annual salary. Age 50 - 6x annual salary. Age 60 - 8-10x annual salary. Age 67 - 10-12x annual salary. Calculation: Annual needed income (70-80% of current) minus Social Security estimate equals annual shortfall. Multiply shortfall by 25 (for 4% withdrawal rule). Example: Need $40,000/year, Social Security $20,000, shortfall $20,000, target $500,000. Adjustments: Healthcare costs add significant expense, consider inflation (2-3% annually), life expectancy affects duration, lifestyle changes (travel, hobbies). Calculation tools: Use retirement calculator for personalized estimate. Start early, automate, track progress. Guidelines = starting point. Personal situation varies. Calculate, track, adjust."
      }
    },
    {
      "@type": "Question",
      "name": "What retirement accounts should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retirement account selection: Priority order: 1. 401(k) to employer match amount - free money, immediate return. 2. IRA (Traditional or Roth) - more investment options, lower fees often. 3. Back to 401(k) beyond match - higher contribution limit. 4. Additional taxable accounts if maxed. Roth vs Traditional: Roth - pay tax now, tax-free withdrawal, good if young or expect higher future taxes. Traditional - tax deduction now, taxed withdrawal, good if high current income. Account limits (2024): 401(k) - $22,500 ($30,000 if 50+). IRA - $6,500 ($7,500 if 50+). SEP IRA (self-employed) - up to $66,000. HSA triple benefit: Tax-free contribution, tax-free growth, tax-free medical withdrawal. Can use for retirement after 65. Employer match = immediate 50-100% return. Don&apos;t skip it. Match first, then optimize between Roth/Traditional based on tax situation."
      }
    },
    {
      "@type": "Question",
      "name": "When should I start saving for retirement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retirement saving timing: Best answer: As early as possible. Power of compound growth: Starting at 25 vs 35, 10 years difference = significantly more at retirement. Example: $500/month from 25 to 65 (40 years at 7%) = ~$1.2M. Same amount from 35 to 65 (30 years) = ~$566K. Half the result for starting 10 years later. Practical milestones: Start in 20s - establish habit, even small amounts. 30s - increase contributions, employer match maximized. 40s - catch-up if behind, review allocation. 50+ - catch-up contributions ($7,500+ extra), finalize plan. What if starting late: Increase contribution rate, consider delaying retirement, reduce retirement spending expectations, part-time income in retirement. Early start = less needed monthly. Late start = need higher contributions. Start now, even if small. Increase with raises. Compound growth favors early."
      }
    },
    {
      "@type": "Question",
      "name": "How should I allocate retirement investments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retirement asset allocation: Age-based rule of thumb: Percentage in stocks = 100 - age (or 110 - age for aggressive). Example: Age 30 = 70-80% stocks, 20-30% bonds. Age 50 = 50-60% stocks, 40-50% bonds. Age 65 = 35-40% stocks, 60-65% bonds. Guidelines: Long timeline (20+ years) - more stocks, growth focus. Medium timeline (10-15 years) - balanced allocation. Short timeline (5 years) - more bonds, preserve capital. Risk tolerance matters: Conservative investor - shift earlier, more bonds. Aggressive investor - more stocks longer. Index funds approach: Target-date funds - automatic allocation adjustment, simple approach. Three-fund portfolio - total stock, international, bond indexes, low fees. Rebalancing: Review annually, adjust if allocation drifted, sell high to buy low, maintain target percentages. Allocation = timeline + risk tolerance. Stocks for growth, bonds for stability. Adjust as you approach retirement."
      }
    },
    {
      "@type": "Question",
      "name": "When can I retire?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retirement timing considerations: Financial readiness: Savings target achieved (10-12x salary), sustainable withdrawal rate (4% rule typical), healthcare coverage plan, debts paid off, emergency fund maintained. Social Security timing: Full retirement age (66-67 for most), early at 62 (reduced 25-30%), delayed to 70 (increased 8% per year). Decision based on health, income needs, spouse situation. Healthcare: Medicare at 65, bridge coverage if retiring earlier, long-term care planning. Practical factors: Job satisfaction, health status, family needs, part-time options, spouse&apos;s retirement timing. Financial check: Annual expenses x 25 = minimum needed, Social Security reduces amount needed, consider healthcare costs, inflation impact on withdrawals. Early retirement: Need larger savings (longer withdrawal period), healthcare bridge coverage, Social Security reduced if claiming early. Normal retirement (65-67): Medicare available, Social Security full benefits, typical milestone savings. Delayed retirement: More savings time, higher Social Security, possibly fewer years to fund. Timing = financial + personal. Calculate readiness, consider Social Security strategy, plan healthcare coverage."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Retirement Planning Guide - Accounts, Milestones & Strategy',
  description: 'Planning steps, account types, savings milestones, and withdrawal strategy.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RetirementPlanningGuide />
    </Suspense>
  );
}