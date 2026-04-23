import type { Metadata } from 'next';
import { Suspense } from 'react';
import DebtReductionGuide from '@/components/DebtReductionGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best debt payoff strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debt payoff strategies comparison: Avalanche Method: Pay highest interest first, mathematically optimal, saves most money. Example: Credit card at 20% before auto loan at 5%. Best for: Logical thinkers, maximizing savings, patient disciplined. Snowball Method: Pay smallest balance first, quick wins, psychological momentum. Example: $500 debt before $5,000 debt regardless of rates. Best for: Motivation-focused, quick wins needed, behavior change emphasis. Hybrid: Small debt first for motivation then highest interest, combines benefits. Best for: Both psychology and savings matter. Mathematically: Avalanche saves most interest. Psychologically: Snowball builds momentum. Choose based on your personality and motivation needs. Both work if applied consistently. Strategy choice matters less than commitment to payoff."
      }
    },
    {
      "@type": "Question",
      "name": "How do I create a debt payoff plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debt payoff plan creation: Step 1: List all debts - creditor, balance, interest rate, minimum payment. Step 2: Calculate totals - total debt, total monthly minimums. Step 3: Determine extra payment amount - income minus expenses minus minimums. Step 4: Choose strategy - avalanche (highest rate) or snowball (smallest balance). Step 5: Order debts - based on chosen strategy. Step 6: Calculate timeline - use debt payoff calculator for months to freedom. Step 7: Allocate payments - minimums on all, extra on target debt. Step 8: Roll payments - when debt cleared, its payment goes to next debt. Step 9: Track monthly - progress chart, debt reduction graph. Step 10: Stay consistent - avoid new debt, maintain extra payments. Plan = roadmap. No plan = wandering. List, order, calculate, execute, track."
      }
    },
    {
      "@type": "Question",
      "name": "Should I consolidate my debts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debt consolidation evaluation: Benefits: Single payment simpler, potentially lower interest rate, fixed payoff timeline, psychological relief. Risks: May extend timeline, fees may offset savings, need good credit for best rates, could borrow more after consolidation. Good candidates: Multiple high-rate debts, good credit score (670+), disciplined spending habits, lower rate available. Poor candidates: Credit score too low for good rate, history of accumulating more debt, rates won&apos;t improve significantly, fees exceed savings. Types: Personal loan consolidation (fixed rate, fixed term), balance transfer card (0% intro period, then regular rate), home equity loan (uses home, risk of foreclosure). Decision: Run math - compare total cost current vs consolidated. Consider behavior - will you avoid new debt? If yes and math positive, consolidate. If behavior risk or math negative, payoff individually. Consolidation = tool not solution. Behavior change required. Calculate costs, assess discipline."
      }
    },
    {
      "@type": "Question",
      "name": "How long will it take to pay off debt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debt payoff timeline factors: Minimum payments only: Could take decades, especially credit cards. Example: $10,000 at 18% with $200 minimum = 94 months (nearly 8 years). Extra payments: Accelerates dramatically. Example: $400/month instead of $200 = 28 months (2.3 years). Interest rate: Higher rate = longer timeline if payment same. Extra payment amount: More extra = faster payoff. Debt amount: Larger debt = longer timeline if payment same. Calculate: Use debt payoff calculator. Input: balances, rates, extra payment. Output: months to freedom, total interest saved. Reality check: Timeline should be achievable. If too long, increase extra payments or consider consolidation. Track progress: Monthly balance reduction. Timeline estimation = motivation. Unknown timeline = discouragement. Calculate, track, adjust."
      }
    },
    {
      "@type": "Question",
      "name": "How do I stay motivated during debt payoff?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debt payoff motivation strategies: Quick wins: Start with smallest debt (snowball), celebrate first payoff, build momentum. Visual tracking: Debt reduction chart, countdown to zero, percentage progress, thermometer-style graph. Celebrate milestones: Each debt cleared, 25% of total paid, halfway point, specific amounts. Connect to goals: What freedom enables (no stress, more options, house purchase), write purpose statement. Accountability: Share journey with partner/friend, regular check-ins, public commitment if comfortable. Behavior changes: Cut cards or freeze use, delete shopping apps, change spending triggers, build new habits. Avoid setbacks: Plan for unexpected expenses, don&apos;t borrow for non-essentials, emergency fund buffer. Remember progress: Review starting point, acknowledge how far you&apos;ve come, focus on growth not gap. Motivation = habits + progress focus. Willpower alone fails. Quick wins, visual tracking, celebration, goal connection."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Debt Reduction Strategy Guide - Avalanche, Snowball & Payoff Plans',
  description: 'Debt payoff strategies, prioritization methods, timeline planning, and motivation.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DebtReductionGuide />
    </Suspense>
  );
}