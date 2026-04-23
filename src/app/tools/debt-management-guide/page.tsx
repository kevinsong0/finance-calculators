import type { Metadata } from 'next';
import { Suspense } from 'react';
import DebtManagementGuide from '@/components/DebtManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best debt payoff strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best debt payoff strategy depends on personality: Snowball method - pay smallest debt first. Pros: psychological wins, motivation, quick progress. Mathematically: pays more interest. Avalanche method - pay highest interest first. Pros: mathematically optimal, saves most money. Requires: patience, discipline. Choose: Snowball if motivation challenges, need wins. Avalanche if disciplined, want to save money. Both work. Key: stick to chosen method, track progress. Mix: avalanche mathematically, but celebrate each payoff like snowball. The best strategy = one you follow consistently."
      }
    },
    {
      "@type": "Question",
      "name": "Should I consolidate my debt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debt consolidation considerations: Good option when: High-interest debts can be consolidated at lower rate, credit score qualifies for better rates, single payment simplifies management, disciplined enough to not add new debt. Not good when: Rate savings minimal, origination fees high, risk of adding new debt after consolidation, low credit score (may not qualify). Options: Personal loan, balance transfer card (0% intro), home equity loan (careful - risk home). Calculate: Compare total costs including fees. Consolidation = tool, not solution. Behavior change + consolidation = effective."
      }
    },
    {
      "@type": "Question",
      "name": "How do I negotiate lower interest rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Negotiate interest rates: Credit cards: Call issuer, explain situation, ask for rate reduction, mention loyalty/payment history, threaten to close account (use carefully). Results vary - some reduce, some refuse. Success factors: Good payment history, long customer relationship, improved credit score. Alternative: Apply for balance transfer to lower-rate card. Other debts: Refinance auto loans, mortgages when rates drop. Student loans: Federal loans can&apos;t negotiate rates, but consider income-based plans. Negotiate: be polite, persistent, have alternatives ready. Higher rate = more profit for lender, they may reduce to keep customer."
      }
    },
    {
      "@type": "Question",
      "name": "How much debt is too much?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Too much debt indicators: Debt-to-income ratio >40% (danger zone). Credit utilization >30% (credit score impact). Struggling to make minimum payments. Taking new debt to pay existing. No emergency fund. Stress about finances. Can&apos;t afford necessities. General guidelines: DTI <20% healthy, <36% manageable, >40% problematic. Credit utilization: keep below 30% each card, below 10% ideal. Red flags: Missed payments, debt increasing, borrowing to pay bills. Too much = relative to income, goals, stress level. When stressed = too much regardless of numbers."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I can't pay my debts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Can&apos;t pay debt options: Communicate early - contact creditors before missing payments, explain situation, ask for options (hardship programs, modified terms). Prioritize essentials - housing, food, utilities before unsecured debt. Minimum payments - make if possible, prevents late fees. Seek help - credit counseling (nonprofit), debt management plan, bankruptcy attorney for serious situations. Consequences of missing: Late fees, interest accumulation, credit score damage, collection calls, potential lawsuits, wage garnishment (varies by debt type). Avoid ignoring. Communicate. Get professional help. Bankruptcy = serious option for unmanageable debt. Better to address early."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Debt Management Guide - Strategies & Best Practices',
  description: 'Debt types, payoff strategies, consolidation, and management tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DebtManagementGuide />
    </Suspense>
  );
}