import type { Metadata } from 'next';
import { Suspense } from 'react';
import CashFlowGuide from '@/components/CashFlowGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is cash flow management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow management definition: Purpose: Ensure sufficient cash for operations, prevent cash shortages, enable strategic decisions, maintain financial stability. Cash flow types: Operating cash flow - day-to-day business activities (primary focus), investing cash flow - asset purchases and sales, financing cash flow - debt/equity transactions, free cash flow - cash available after expenses (growth indicator). Cash flow vs profit: Profit = accounting measure, cash flow = actual money movement, profitable companies can have cash problems, timing differences between revenue and collection. Key concept: Cash in must exceed cash out for survival. Profit alone insufficient. Monitor actual cash, not just accounting numbers. Cash flow management = tracking and controlling cash movement. Ensure inflows meet outflows. Profit matters, but cash is survival."
      }
    },
    {
      "@type": "Question",
      "name": "How do I forecast cash flow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow forecasting process: Direct method: List all expected cash inflows (sales, collections, other receipts), list all expected cash outflows (expenses, payments, purchases), calculate net cash flow per period, project cumulative cash position. Time periods: Weekly for tight cash situations, monthly for normal operations, quarterly for strategic planning, annual for long-term outlook. Sources of data: Sales forecasts, collection patterns, payment schedules, historical trends, seasonal patterns, planned expenditures. Forecast accuracy: Short-term more accurate, longer-term needs assumptions, update regularly with actuals, adjust for changing conditions. Tools: Spreadsheet models, accounting software, dedicated cash flow tools, rolling forecasts. Forecasting = systematic projection. Use historical data plus assumptions. Update regularly. Plan for various scenarios."
      }
    },
    {
      "@type": "Question",
      "name": "What causes cash flow problems?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow problem causes: Revenue timing: Slow customer payments, extended payment terms, seasonal demand drops, collection issues. Expense timing: Unexpected large expenses, accelerated payment demands, supplier term changes, inventory buildup. Growth issues: Rapid growth requires more cash, hiring before revenue, equipment purchases, inventory expansion. Planning failures: No forecasting, ignored warning signs, overestimated collections, underestimated expenses. External factors: Economic downturns, customer business failures, supplier issues, regulatory changes. Common scenarios: Profitable but cash negative (timing), seasonal business without reserves, growth without financing, large one-time expenses. Causes = investigate specific situation. Often multiple factors. Address root causes, not just symptoms. Prevention through planning."
      }
    },
    {
      "@type": "Question",
      "name": "How do I improve cash flow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow improvement strategies: Accelerate inflows: Invoice promptly, offer early payment discounts, tighten payment terms, improve collection process, follow up on overdue accounts, require deposits/upfront payment. Manage outflows: Negotiate longer payment terms, prioritize payments, delay discretionary spending, schedule payments strategically, avoid early payments when possible. Reduce costs: Cut unnecessary expenses, improve efficiency, negotiate better pricing, reduce waste, optimize staffing. Manage inventory: Reduce stock levels, improve turnover, avoid excess purchases, just-in-time where feasible. Build reserves: Maintain cash buffer, emergency fund, save during strong periods, plan for seasonal dips. Financing options: Line of credit for gaps, short-term loans, invoice financing, equity investment. Improvement = systematic approach. Multiple tactics together. Focus on biggest impact areas. Balance short-term fixes with long-term solutions."
      }
    },
    {
      "@type": "Question",
      "name": "What cash flow metrics should I track?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow metrics to monitor: Cash conversion cycle: Days to convert inventory and receivables to cash, shorter = better, target varies by industry. Days sales outstanding (DSO): Average days to collect receivables, lower = faster collection, benchmark against industry. Days payable outstanding (DPO): Average days to pay suppliers, higher = better cash position (but balance relationships). Operating cash flow ratio: Operating cash / current liabilities, ability to pay short-term obligations, higher = safer. Cash runway: Cash reserves / monthly burn rate, months of operation without new revenue, startup/turnaround focus. Quick ratio: (Cash + receivables) / current liabilities, immediate liquidity, higher = safer. Metrics = monitor regularly. Set targets. Track trends. Compare to benchmarks. Improve through specific actions. Dashboard for key metrics helps."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Cash Flow Management Guide - Types, Problems & Solutions',
  description: 'Cash flow types, forecasting, problems, solutions, and key metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CashFlowGuide />
    </Suspense>
  );
}