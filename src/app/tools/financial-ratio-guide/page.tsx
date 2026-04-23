import type { Metadata } from 'next';
import { Suspense } from 'react';
import FinancialRatioGuide from '@/components/FinancialRatioGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are financial ratios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial ratios definition: Purpose: Assess financial health, compare to benchmarks, track trends over time, support decisions, communicate to stakeholders. Categories: Liquidity ratios - ability to pay short-term obligations, profitability ratios - earning performance, efficiency ratios - asset utilization, leverage ratios - debt levels and risk. Calculation: Ratio = one financial measure divided by another, use balance sheet and income statement data, consistent calculation method, compare to same period. Uses: Internal management, investor analysis, lender evaluation, benchmark comparison, trend monitoring. Interpretation: Ratio alone less meaningful, compare to industry, track trends, consider context, use multiple ratios together. Financial ratios = health indicators. Calculate consistently. Compare to benchmarks. Track trends. Use for decisions. Context matters."
      }
    },
    {
      "@type": "Question",
      "name": "What are key liquidity ratios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Liquidity ratios: Current Ratio: Formula = Current Assets / Current Liabilities, measures short-term solvency, target > 1.5 (varies by industry), too low = liquidity risk, too high = inefficient asset use. Quick Ratio (Acid Test): Formula = (Cash + Marketable Securities + AR) / Current Liabilities, excludes inventory, stricter measure, target > 1.0, inventory may be hard to liquidate quickly. Cash Ratio: Formula = Cash / Current Liabilities, most conservative, only cash considered, target > 0.5, rarely used alone. Interpretation: Higher = better liquidity, but not always optimal, industry benchmarks essential, track trends, sudden changes investigate. Liquidity = ability to pay now. Current ratio most common. Quick ratio stricter. Cash ratio conservative. Balance liquidity with efficiency."
      }
    },
    {
      "@type": "Question",
      "name": "What are key profitability ratios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Profitability ratios: Gross Margin: Formula = (Revenue - COGS) / Revenue, measures production/service efficiency, varies widely by industry, higher = better pricing or efficiency, track for trends. Net Margin: Formula = Net Income / Revenue, measures overall profitability, includes all expenses, target > 5-10% typical, varies by industry. Return on Assets (ROA): Formula = Net Income / Total Assets, measures asset utilization efficiency, how well assets generate profit, target > 5% typical. Return on Equity (ROE): Formula = Net Income / Shareholder Equity, measures return to owners, critical for investors, target > 10% typical, higher = better. Profitability = earning ability. Margins show efficiency. Returns show effectiveness. Industry benchmarks essential. Track trends, act on declines."
      }
    },
    {
      "@type": "Question",
      "name": "What are key efficiency ratios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Efficiency ratios (activity ratios): Inventory Turnover: Formula = COGS / Average Inventory, measures inventory management, higher = faster sales, too high = stockout risk, industry benchmarks apply. Accounts Receivable Turnover: Formula = Revenue / Average AR, measures collection efficiency, higher = faster collection, relates to DSO calculation. Accounts Payable Turnover: Formula = Purchases / Average AP, measures payment timing, relates to DPO calculation, balance with vendor relationships. Asset Turnover: Formula = Revenue / Total Assets, measures overall asset efficiency, higher = better utilization, varies by industry (capital-intensive lower). Efficiency = asset utilization. Higher ratios generally better. But balance with risk. Track trends. Industry benchmarks vary. Optimize operations based on ratios."
      }
    },
    {
      "@type": "Question",
      "name": "What are key leverage ratios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leverage ratios (debt ratios): Debt Ratio: Formula = Total Debt / Total Assets, measures debt financing proportion, target < 0.5 typical, higher = more debt reliance, risk indicator. Debt to Equity Ratio: Formula = Total Debt / Shareholder Equity, measures debt vs ownership, target < 1.0 typical, higher = more leverage, riskier for creditors. Interest Coverage Ratio: Formula = EBIT / Interest Expense, measures ability to pay interest, target > 3 typical, lower = interest payment risk, critical for lenders. Interpretation: Higher leverage = higher risk, but also potential higher returns, industry norms vary, consider business cycle, balance debt with equity. Leverage = debt risk. Lower ratios safer. But some debt normal. Match to industry. Monitor interest coverage. Debt strategy should be intentional."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Financial Ratio Guide - Liquidity, Profitability & Leverage',
  description: 'Financial ratio formulas, interpretation, and benchmarks.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FinancialRatioGuide />
    </Suspense>
  );
}