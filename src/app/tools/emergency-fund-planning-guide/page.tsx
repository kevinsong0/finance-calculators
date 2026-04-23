import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmergencyFundGuide from '@/components/EmergencyFundGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much emergency fund do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Emergency fund sizing: Basic recommendation: 3-6 months of essential expenses. Variable factors: Job stability - stable job = 3 months, uncertain market = 6+ months. Income source - dual income = 3 months, single income = 6 months. Income type - steady salary = 3 months, freelance/variable = 6-9 months. Health factors - stable health = 3 months, medical risks = 6+ months. Industry - stable industry = 3 months, volatile industry = 6+ months. Calculate: Monthly essential expenses (housing, food, utilities, transportation, minimum debt payments, insurance). Example: $3,000/month expenses x 3 months = $9,000 target. Example: $3,000/month x 6 months = $18,000 target. Size based on your risk factors. Not one-size-fits-all. Assess situation, calculate expenses, set realistic target."
      }
    },
    {
      "@type": "Question",
      "name": "How do I build an emergency fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Emergency fund building process: Step 1: Calculate monthly essential expenses - only needs (housing, food, utilities, minimum debt, insurance), exclude discretionary. Step 2: Set target based on risk factors - 3-6 months (or more) of calculated expenses. Step 3: Determine monthly savings amount - divide target by reasonable timeline (12-24 months typical). Step 4: Open separate account - high-yield savings, not connected to daily spending, different bank if tempted. Step 5: Automate transfers - set auto-transfer monthly, remove willpower requirement. Step 6: Start with mini-fund - $1,000 first milestone, provides immediate buffer. Step 7: Build to 1 month - then 3 months, then full target. Step 8: Track progress - visual progress chart, milestone celebrations. Build = consistent savings. Lump sum unlikely. Automate, separate account, track progress."
      }
    },
    {
      "@type": "Question",
      "name": "Where should I keep my emergency fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Emergency fund location: Requirements: Liquid (accessible 1-2 days), safe (no market risk), earning interest if possible. Best options: High-yield savings account - 4-5% APY typical, FDIC insured, instant access. Money market account - slightly higher rate, limited withdrawals, FDIC insured. Considerations: Separate from daily spending - different bank if you&apos;re tempted to raid it. Not investment accounts - stock market could drop when you need funds. Not checking account - too easy to spend accidentally. Not physical cash - inflation erodes, no interest, security risk. Account features: No fees, decent interest rate, easy transfer to checking, FDIC/NCUA insured. Location choice = accessibility + separation + safety. Investment = risk when needed. High-yield savings = optimal balance. Separate bank if discipline needed."
      }
    },
    {
      "@type": "Question",
      "name": "When should I use my emergency fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Emergency fund appropriate uses: Job loss: Living expenses during unemployment, job search costs. Medical: Unexpected medical bills, emergency dental, prescription costs not covered. Essential repairs: Car repair needed for work, home repair for safety/habitability. Family emergency: Urgent travel for family crisis, funeral attendance. Insurance gaps: Deductibles, coverage limits, denied claims for essential care. Not for: Vacations (planned saving instead), planned purchases (budget for these), investment opportunities (use separate funds), non-essential repairs (budget), lifestyle upgrades, discretionary spending. Test: Is it unexpected? Is it essential? Is it urgent? If yes to all three = emergency fund appropriate. If planned or non-essential = budget instead. True emergencies only. Replenish after use. Discipline = fund available when truly needed."
      }
    },
    {
      "@type": "Question",
      "name": "Should I pay off debt or build emergency fund first?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debt vs emergency fund priority: Recommended order: Step 1: $1,000 mini emergency fund - immediate buffer before aggressive debt payoff, prevents borrowing for small emergencies. Step 2: High-interest debt payoff - above 7% interest, Avalanche method, saves more than fund earns. Step 3: Full emergency fund - 3-6 months expenses, foundation complete. Step 4: Lower-interest debt - below 7% interest, continue payoff. Why this order: No buffer = new debt for emergencies, setback to payoff progress. High interest costs more than fund earns (20% debt vs 5% savings). Full fund after high debt cleared. Exceptions: Very unstable job = larger fund first ($5,000+). Moderate interest debt = could split between fund and debt. Medical risks = larger fund priority. Priority = mini fund then high-interest debt then full fund. Protect from setbacks while maximizing payoff efficiency. Start with $1,000 buffer."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Emergency Fund Planning Guide - Sizing, Building & Usage',
  description: 'Fund sizing by situation, savings milestones, appropriate uses, and account selection.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmergencyFundGuide />
    </Suspense>
  );
}