import type { Metadata } from 'next';
import { Suspense } from 'react';
import BudgetVarianceGuide from '@/components/BudgetVarianceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is budget variance analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget variance analysis definition: Purpose: Compare actual financial results to planned budget, identify differences and their causes, improve future budgeting accuracy, enable corrective action. Variance calculation: Actual amount - Budget amount = Variance, percentage variance = (Variance / Budget) x 100. Types: Favorable variance - actual better than budget (higher revenue, lower costs), unfavorable variance - actual worse than budget (lower revenue, higher costs). Analysis steps: Identify variance, calculate amount and percentage, determine if significant, investigate root cause, propose corrective action, monitor improvement. Timing: Monthly analysis common, quarterly comprehensive review, annual variance summary. Budget variance = difference between plan and reality. Analyze causes, take action, improve forecasting. Regular review essential for financial control."
      }
    },
    {
      "@type": "Question",
      "name": "How do I determine if a variance is significant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Variance significance thresholds: Percentage thresholds: 5% variance - monitor, begin attention, 10% variance - investigate, determine cause, 15% variance - urgent action required, 20%+ variance - escalate to leadership. Absolute thresholds: Dollar amount significance varies by organization, larger budgets tolerate larger variances, critical line items warrant tighter thresholds. Context factors: Timing - early in year has more recovery time, trend - single month vs consistent pattern, controllability - was variance avoidable?, external factors - market conditions, regulations. Prioritization: Significant unfavorable first, recurring variances next, controllable variances priority, strategic line items priority. Significance = threshold + context. Not all variances equal. Focus resources on what matters most. Adjust thresholds by situation."
      }
    },
    {
      "@type": "Question",
      "name": "What causes budget variances?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget variance causes: Revenue variances: Market changes - demand shifts, competition, pricing pressure, customer behavior changes, product/service mix changes, economic conditions, seasonal variations. Expense variances: Cost increases - supplier pricing, inflation, unexpected repairs, regulatory requirements, volume changes, efficiency issues. Planning issues: Unrealistic assumptions, incomplete research, missing scenarios, poor historical analysis, external factor oversight. Execution issues: Delayed implementation, process inefficiency, resource constraints, timeline slippage. Internal factors: Staff turnover, productivity changes, quality issues, management decisions. External factors: Economic shifts, regulatory changes, market competition, supplier problems. Root cause = systematic investigation. Don&apos;t assume - investigate. Many variances have multiple causes. Correct the root, not just the symptom."
      }
    },
    {
      "@type": "Question",
      "name": "What corrective actions should I take for variances?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Variance corrective actions: Immediate actions: Cost controls - reduce discretionary spending, spending freeze for non-essential, accelerate revenue - promotions, pricing adjustments, process improvement - address efficiency issues. Budget adjustments: Revise remaining budget, update forecasts, adjust assumptions, reallocate resources. Operational changes: Improve procedures, address root cause, staff training, technology solutions. Preventive actions: Better planning next cycle, more conservative assumptions, improved monitoring, earlier detection. Communication: Inform stakeholders, explain causes and actions, set expectations, report progress. Follow-up: Track improvement, verify action effectiveness, adjust if needed, document lessons learned. Action = appropriate to cause and significance. Match response to variance type. Monitor results. Prevent recurrence through better planning."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I analyze budget variances?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget variance analysis frequency: Monthly analysis: Standard practice for most organizations, identify issues early, allow timely response, track trends. Quarterly review: Comprehensive analysis, strategic implications, forecast updates, management reporting. Annual review: Year-end variance summary, lessons learned, next budget input, performance evaluation. Real-time monitoring: Automated alerts for significant variances, dashboards for key metrics, immediate attention to critical items. Factors affecting frequency: Organization size - larger need more frequent, volatility - more change needs more monitoring, industry - some industries need tighter control, management style - some prefer closer oversight. Best practices: Monthly minimum, automate where possible, focus on significant items, document findings, act on results. Frequency = balance oversight vs effort. Monthly standard, more often for critical items. Automate routine, focus on analysis. Regular cadence creates discipline."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Budget Variance Analysis Guide - Types, Thresholds & Actions',
  description: 'Variance types, significance thresholds, root causes, and corrective actions.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BudgetVarianceGuide />
    </Suspense>
  );
}