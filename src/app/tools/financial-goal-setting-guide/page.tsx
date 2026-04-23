import type { Metadata } from 'next';
import { Suspense } from 'react';
import FinancialGoalSettingGuide from '@/components/FinancialGoalSettingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I set financial goals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial goal setting process: Step 1: Identify values - what matters most (security, freedom, experiences, family support). Step 2: Brainstorm goals - all desired outcomes without filtering initially. Step 3: Categorize timeframe - short-term (under 1 year), medium-term (1-5 years), long-term (5+ years). Step 4: Apply SMART criteria - Specific (exact goal), Measurable (exact amount), Achievable (based on income), Relevant (aligns with values), Time-bound (deadline). Step 5: Calculate monthly amount - goal amount divided by months to deadline. Step 6: Check feasibility - compare to available income, adjust if needed. Step 7: Prioritize - emergency fund first, then debt, then savings goals. Step 8: Create action plan - automate savings, track progress. Goals = direction. No goals = wandering. Specific amounts, realistic timelines, prioritized order."
      }
    },
    {
      "@type": "Question",
      "name": "What is SMART for financial goals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SMART financial goals: Specific: Exact definition, not vague. Example: &apos;Save $10,000&apos; not &apos;Save more&apos;. Measurable: Exact amount and progress tracking. Example: &apos;$10,000 emergency fund&apos; with $833 monthly tracking. Achievable: Based on actual income and expenses. Example: If $500/month available, adjust timeline accordingly. Relevant: Aligns with your values and life situation. Example: Emergency fund if job unstable, retirement if long-term security matters. Time-bound: Specific deadline set. Example: &apos;By December 2026&apos; not &apos;someday&apos;. Example SMART goal: &apos;Save $10,000 emergency fund by December 2026, saving $833/month from my $3,000 monthly surplus, to provide security for my family&apos;. SMART = achievable goals. Vague goals = no progress. Specific, measurable, realistic, deadline-driven."
      }
    },
    {
      "@type": "Question",
      "name": "What order should I prioritize financial goals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial goal priority order: Priority 1: Emergency fund - 3-6 months expenses, foundation for all other goals, prevents debt spiral from unexpected. Priority 2: High-interest debt payoff - credit cards, personal loans above 7% interest, saves more than investing elsewhere. Priority 3: Retirement contributions - at least to match or 10-15% income, tax advantages, long-term security. Priority 4: Medium-term savings - home down payment, car replacement, education, specific large purchases. Priority 5: Long-term wealth building - additional investments, real estate, business, beyond retirement. Priority 6: Lifestyle discretionary goals - travel, hobbies, experiences, wants beyond needs. Reasoning: Emergency fund prevents crisis. High-interest debt costs more than investments earn. Retirement has tax advantages. Medium-term needs predictable. Long-term wealth builds after foundation. Lifestyle last after security. Priority order = efficient progress. Wrong order = setbacks from crisis or debt interest."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate savings needed for a goal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Goal savings calculation: Formula: Goal amount / Months to deadline = Monthly savings needed. Example: $10,000 goal in 12 months = $833/month. Adjustments: If monthly amount exceeds available income, extend timeline or reduce goal. If timeline is fixed, adjust goal amount downward. Interest consideration: For long-term goals, investment returns reduce monthly need. Example: $50,000 in 10 years at 5% return needs ~$320/month not $417/month. Use compound interest calculator for long-term goals. Reality check: Compare calculated monthly amount to actual income minus expenses. If impossible, adjust goal or timeline. Automation: Set automatic transfer of calculated amount. Account separation: Dedicated account per goal for tracking. Calculate = plan. Guessing = no plan. Formula first, then reality check, then automation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I stay motivated toward financial goals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Goal motivation strategies: Visual reminders: Goal tracker visible, progress chart, goal photo (house, vacation destination), desktop tracker. Milestone celebrations: Break goal into milestones, celebrate progress points ($5K of $10K achieved), acknowledge wins. Connect to values: Remember why goal matters (security, freedom, family), write purpose statement, review when motivation drops. Accountability: Share goals with partner/friend, regular progress check-ins, public commitment. Automation: Remove willpower requirement, auto-transfer savings, make progress automatic. Flexibility: Allow timeline adjustment if needed, don&apos;t abandon after setback, adjust not quit. Progress focus: Focus on growth not gap, celebrate progress made, track percentage complete. Motivation = habits + meaning. Willpower alone fails. Automate, visualize, connect to values, celebrate progress."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Financial Goal Setting Guide - SMART Framework & Priorities',
  description: 'Goal types, SMART framework, priority hierarchy, and goal tracking.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FinancialGoalSettingGuide />
    </Suspense>
  );
}