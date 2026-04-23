import type { Metadata } from 'next';
import { Suspense } from 'react';
import SavingsStrategyGuide from '@/components/SavingsStrategyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I start saving money?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Starting to save: First steps: Calculate current spending, identify savings opportunity, set initial goal (even small - $50/month). Account setup: Open separate savings account (not connected to daily spending), choose high-yield savings (4-5% APY), different bank if discipline needed. Automation: Set auto-transfer on payday (before spending), even small amount ($25-50) builds habit, increase over time. Initial targets: Mini emergency fund ($1,000) first, then consistent monthly savings, emergency fund (3 months), then specific goals. Psychology: Pay yourself first (save before spending), automate removes willpower, separate account prevents raiding, start small to build habit. Start = momentum. Waiting = never starting. Open account, set auto-transfer, begin even with small amount. Habit before amount."
      }
    },
    {
      "@type": "Question",
      "name": "What savings strategy is most effective?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective savings strategies: Pay yourself first: Save on payday before any spending, automation removes willpower, most effective psychologically. Why effective: removes decision, prevents spending savings, builds habit automatically. 50/30/20 rule: Structured budgeting, 20% to savings built-in, clear framework. Why effective: explicit savings target, integrated with budget, balanced approach. Automation + separation: Auto-transfer to separate account, different bank, hard to access. Why effective: removes temptation, makes saving automatic, prevents raiding. Most effective combination: Pay yourself first (save on payday), automate transfer, separate high-yield account, increase with raises. Strategy = habit + system. Willpower alone fails. Automate, separate, pay yourself first."
      }
    },
    {
      "@type": "Question",
      "name": "Where should I keep my savings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Savings account selection: Emergency fund: High-yield savings account (4-5% APY), FDIC insured, accessible in 1-2 days, separate from checking. Short-term goals (1-2 years): High-yield savings or CDs, predictable timeline, guaranteed return, no market risk. Medium-term goals (2-5 years): CDs for fixed timeline, Treasury bills/I bonds for safety, possibly conservative investments if timeline longer. Long-term savings (5+ years): Investment accounts for growth, retirement accounts (tax advantages), index funds for diversification. Account requirements: FDIC/NCUA insured (up to $250K), decent interest rate (4%+ today), no or low fees, easy access when needed (for emergency fund). Avoid: Regular savings at big banks (0.01-0.5% APY), checking account savings (too accessible), risky investments for emergency fund. Right account = matching timeline. Emergency = accessible + insured. Long-term = growth focus. High-yield savings for near-term, investments for long-term."
      }
    },
    {
      "@type": "Question",
      "name": "How much should I save each month?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monthly savings amount: General guideline: 20% of income (from 50/30/20 rule). Minimum: Start with what&apos;s possible ($25-100/month if tight), build habit first, increase over time. Targets by situation: Building emergency fund - higher rate (20-30%), debt payoff mode - lower savings (mini fund + debt), retirement focus - 15-20% minimum, stable finances - 20%+ ideal. Income-based: $30K income - $500/month (20%), $50K income - $833/month (20%), $75K income - $1,250/month (20%). Reality check: Start with affordable amount, build habit, increase with raises, don&apos;t set impossible target. Increase strategies: Start small, add $50/month each quarter, save all raises/bonuses, challenge savings for extra. Amount = sustainable habit. Too ambitious = failure. Start possible, increase over time. 20% target, build toward it."
      }
    },
    {
      "@type": "Question",
      "name": "How do I increase my savings rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Increasing savings rate: With raises: Save entire raise amount, lifestyle unchanged, savings rate increases automatically, most sustainable approach. Windfall strategy: Save bonuses, tax refunds, gifts, unexpected income, don&apos;t adjust lifestyle. Gradual increases: Add $50/month each quarter, small increments sustainable, reach target over time. Expense reduction: Review subscriptions, negotiate bills, find cheaper alternatives, redirect savings to fund. Challenge savings: 52-week challenge (save week number amount), no-spend days, meal prep savings, redirect to savings. Income increase: Side income to savings, overtime earnings saved, passive income streams. Tracking: Monitor savings rate monthly, celebrate milestones, visualize progress, stay motivated. Increase = sustainable approach. Windfalls = opportunity. Raises = automatic increase. Don&apos;t inflate lifestyle, direct extra to savings."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Savings Strategy Guide - Methods, Accounts & Automation',
  description: 'Saving strategies, account types, automation tips, and increasing savings rate.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SavingsStrategyGuide />
    </Suspense>
  );
}