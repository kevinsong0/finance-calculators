import type { Metadata } from 'next';
import { Suspense } from 'react';
import BudgetManagementGuide from '@/components/BudgetManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create a budget?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget creation steps: Step 1: Calculate income - all sources including salary, side income, investments, irregular income averaged. Step 2: List fixed expenses - housing, utilities, insurance, loan payments, subscriptions. Step 3: Estimate variable expenses - food, transportation, entertainment, personal, healthcare. Step 4: Include irregular expenses - annual costs divided monthly (car maintenance, gifts, holidays). Step 5: Set savings target - emergency fund, retirement, goals. Step 6: Allocate remaining income - discretionary spending, additional savings. Step 7: Track and adjust - use app or spreadsheet, review weekly, adjust monthly. Budget = spending plan. Income minus expenses = available amount. Start simple, refine over time. Track everything at first to understand spending patterns."
      }
    },
    {
      "@type": "Question",
      "name": "What is the 50/30/20 budget rule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "50/30/20 budget rule: 50% for Needs: Essential expenses - housing (rent/mortgage), utilities, food, transportation, insurance, minimum debt payments, healthcare. 30% for Wants: Discretionary spending - entertainment, dining out, hobbies, subscriptions, travel, shopping beyond essentials. 20% for Savings: Financial goals - emergency fund, retirement contributions, extra debt payments, investments, specific savings goals. Benefits: Simple structure, balanced approach, savings built-in, flexible within categories. Adjustments: High housing costs may need 60/20/20, aggressive savers may use 50/20/30, low income may need different ratios. Implementation: Calculate after-tax income, multiply by percentages, allocate to categories, track spending, adjust as needed. 50/30/20 = framework. Customize based on situation. Start here, refine over time. Not rigid rule - guidance for balance."
      }
    },
    {
      "@type": "Question",
      "name": "How do I stick to a budget?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget adherence strategies: Tracking: Record every expense, use budgeting app, daily review, weekly summary, monthly comparison. Automation: Auto-transfer savings, auto-pay fixed bills, separate spending accounts, reduce decision fatigue. Flexibility: Build buffer for unexpected, allow discretionary within limits, adjust categories as needed, don&apos;t make too tight. Psychology: Set realistic goals, celebrate progress, focus on why (goals), make it habit, involve partner if applicable. Review rhythm: Weekly expense check, monthly budget review, quarterly goal progress, annual planning refresh. When slipping: Identify cause, adjust budget if needed, find alternatives, recommit to goals, don&apos;t abandon entirely. Stick to budget = habits + flexibility. Too rigid = failure. Track consistently, allow reasonable flexibility, focus on progress not perfection."
      }
    },
    {
      "@type": "Question",
      "name": "What budgeting mistakes should I avoid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budgeting mistakes: Not tracking expenses: Guessing spending amounts, budget based on assumptions, reality different from plan. Solution: Track all spending for 1-2 months before budgeting. Ignoring irregular expenses: Annual costs forgotten (car repair, holidays, gifts), budget appears balanced but breaks periodically. Solution: Divide annual costs monthly, include buffer category. Too rigid: No flexibility for life&apos;s variation, every deviation feels like failure, abandon budget after one slip. Solution: Build buffer, allow flexibility, focus on patterns not perfection. Lifestyle inflation: Increase spending with income increase, savings rate stays same, no progress toward goals. Solution: Maintain spending as income grows, increase savings first. No emergency fund: Unexpected expense breaks budget, debt spiral starts, stress increases. Solution: Build emergency fund before other goals. Avoid mistakes = budget success. Track, include all costs, build flexibility, maintain savings rate."
      }
    },
    {
      "@type": "Question",
      "name": "What budget method is best for me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget method selection: 50/30/20 Rule: Best for beginners, simple structure, balanced approach. Good when income stable, categories flexible, starting budgeting journey. Zero-Based Budgeting: Best for detailed planners, every dollar assigned, maximum control. Good when irregular income, tight finances, need precision, planning-focused. Envelope Method: Best for overspenders, cash categories, tangible limits. Good when impulse spending issue, visual control helps, variable expenses challenge. Pay Yourself First: Best for savings priority, automatic savings, spending adjusts to remaining. Good when savings motivation strong, automation preferred, flexible spending okay. Line-Item Budget: Best for expense tracking, detailed categories, maximum visibility. Good when understanding spending patterns, multiple expense types, analysis-focused. Choose based on personality, financial situation, goals. Start simple, refine over time. Method matters less than consistency. Any method works if tracked consistently."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Budget Management Guide - Methods, Categories & Best Practices',
  description: 'Budgeting methods, expense categories, tracking tips, and budget creation.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BudgetManagementGuide />
    </Suspense>
  );
}