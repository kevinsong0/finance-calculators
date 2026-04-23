import type { Metadata } from 'next';
import { Suspense } from 'react';
import CreditCardManagementGuide from '@/components/CreditCardManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I use credit cards responsibly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Responsible credit card use: Core rule: Pay full balance every month - no interest charges, rewards actually valuable, builds credit history. Payment habits: Always pay on time, set up autopay for minimum (pay full manually), never miss due date. Spending discipline: Only buy what you can pay off, track purchases, budget before spending on card, don&apos;t exceed your cash availability. Utilization: Keep balance under 30% of limit, ideally under 10%, pay before statement closes for better score. Card management: Review statements monthly, dispute errors promptly, know your APR, don&apos;t open cards you won&apos;t use. Rewards strategy: Only if paying full balance, don&apos;t spend extra for rewards, choose card matching your spending. Responsible = pay full monthly. Interest charges = rewards worthless. On-time, full payment, tracked spending, low utilization."
      }
    },
    {
      "@type": "Question",
      "name": "What credit card should I choose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit card selection: Rewards cards: If paying full balance monthly - cash back simplest (1-2% on everything), points cards if travel focus, check category bonuses match your spending. Low interest cards: If may carry balance sometimes - lower APR matters more than rewards, no annual fee preferred, compare APRs not just introductory rates. Balance transfer cards: For debt payoff - 0% intro APR period (12-18 months), transfer fee (usually 3-5%), pay off within intro period. Building credit: Secured card - deposit becomes limit, builds history, graduate to unsecured. Student card - easy approval, lower limits, learn responsible use. Factors: Annual fee - only if benefits exceed cost, APR - matters if carrying balance, rewards - match spending patterns, sign-up bonus - good if meets natural spending. Choose based on use pattern. Pay full = rewards focus. Carry balance = APR focus. Building credit = secured/student."
      }
    },
    {
      "@type": "Question",
      "name": "How does credit utilization affect my score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit utilization explained: Definition: Percentage of credit limit used, balance divided by limit, key factor in credit score (30% of FICO). Impact: Under 10% - excellent for score, under 30% - good, over 30% - hurts score, maxed out - significant damage. Timing: Utilization reported on statement date, pay before statement closes for lower reported balance, reported monthly. Strategies: Request credit limit increase (same balance = lower utilization), spread spending across multiple cards, pay down before report date, don&apos;t close old cards (reduces total limit). Myths: Utilization has no memory - current state matters, not history, previous high utilization doesn&apos;t hurt once lowered. Quick fix: Pay balance before statement closes, utilization drops instantly, score improvement within weeks. Utilization = major score factor. Keep under 30%, ideally under 10%. Pay before statement date for best report."
      }
    },
    {
      "@type": "Question",
      "name": "How do I pay off credit card debt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit card debt payoff: Assessment: List all cards with balances and rates, total debt amount, minimum payments, available extra income. Strategy choice: Avalanche - highest interest first, saves most money. Snowball - smallest balance first, psychological wins. Balance transfer - 0% intro APR card, pay off during free period. Execution: Stop using cards during payoff, pay minimums on all cards, extra payment to target card, roll payment to next card when one cleared. Timeline: Calculate payoff months with current payment, increase payment to shorten timeline, celebrate milestones. After payoff: Keep one card for rewards (paying full), close others if too many, maintain utilization discipline, don&apos;t rebuild debt. Payoff = commitment + strategy. Choose method, stop new debt, pay consistently, track progress."
      }
    },
    {
      "@type": "Question",
      "name": "Should I get a rewards credit card?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rewards card decision: When rewards make sense: Pay full balance every month - no interest charges, rewards then truly valuable, disciplined spending habits. When rewards don&apos;t make sense: Carry balance regularly - interest exceeds rewards, undisciplined spending, rewards tempt extra spending. Calculation: Rewards typically 1-5% on spending. Interest 15-25% if carrying balance. Interest cost exceeds rewards unless paying full. Card comparison: Cash back - simplest, 1-2% on everything, no complexity. Travel points - for frequent travelers, redemption rules matter, often higher potential. Category bonuses - higher % on groceries/gas/etc, match your spending pattern. Annual fee analysis: Fee vs rewards earned, only if rewards exceed fee, calculate actual value. Rewards = valuable if paying full. Interest-bearing = rewards worthless. Pay full monthly, match card to spending, avoid annual fee unless worthwhile."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Credit Card Management Guide - Types, Best Practices & Debt',
  description: 'Card types, responsible use, utilization, and debt payoff strategies.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CreditCardManagementGuide />
    </Suspense>
  );
}