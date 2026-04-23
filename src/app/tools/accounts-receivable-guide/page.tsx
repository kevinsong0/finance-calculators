import type { Metadata } from 'next';
import { Suspense } from 'react';
import AccountsReceivableGuide from '@/components/AccountsReceivableGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is accounts receivable management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Accounts receivable management definition: Purpose: Track money owed by customers, ensure timely collection, maintain accurate records, minimize bad debt. AR process: Invoice creation - generate accurate bills, invoice delivery - send promptly to customers, payment tracking - monitor status, collections - follow up overdue, payment recording - document receipts, reconciliation - verify accuracy. Importance: AR = money owed to business, impacts cash flow, affects working capital, collection delays hurt operations. Key goals: Collect faster, reduce aging, minimize bad debt, maintain customer relationships. AR management = systematic collection. Invoice immediately. Track aging. Follow up consistently. Cash flow depends on timely collection."
      }
    },
    {
      "@type": "Question",
      "name": "How do I analyze accounts receivable aging?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AR aging analysis: Aging buckets: Current (0-30 days) - normal, most should be here, 31-60 days - monitor closely, begin contact, 61-90 days - active collection needed, 91-120 days - urgent attention, escalate, Over 120 days - serious concern, consider write-off. Aging report: Lists all outstanding invoices, groups by days outstanding, shows total per bucket, identifies problem accounts. Analysis actions: Review weekly minimum, calculate percentage per bucket, track trends over time, compare to prior periods, identify largest overdue items. Healthy signs: Most AR current, low over-90 amounts, steady collection pattern. Warning signs: Growing aging, high over-60 percentage, specific account concentration. Aging = prioritize collection. Focus on oldest first. Track trends. Act before too old."
      }
    },
    {
      "@type": "Question",
      "name": "What are effective collection strategies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AR collection strategies: Early stage (31-60 days): Reminder emails - friendly payment reminder, include invoice details, offer payment options. Phone calls - personal contact, confirm invoice received, ask for payment date. Mid stage (61-90 days): Firm emails - stronger language, payment deadline, consequences mention. Regular calls - consistent follow-up, document conversations. Payment plans - offer installments if needed, formal agreement. Late stage (91-120 days): Final notice - last warning before escalation, late fees application. Collection agency - professional collectors, fee-based. Legal action - lawsuits for significant amounts, consider cost-benefit. Prevention: Clear payment terms upfront, easy payment options, regular communication, credit checks before sale. Collection = systematic approach. Start gentle, escalate gradually. Document everything. Balance collection with relationship."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate days sales outstanding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Days sales outstanding calculation: Formula: DSO = (Average Accounts Receivable / Revenue) x Number of days. Alternative: DSO = Accounts Receivable / (Annual Revenue / 365). Average AR: (Beginning AR + Ending AR) / 2, or use ending AR for simplicity. Example: AR = $150,000, Annual Revenue = $900,000, DSO = 150,000 / (900,000/365) = 150,000 / 2,466 = 61 days. Interpretation: DSO = average days to collect payment, lower is better, industry benchmarks vary, typically 30-45 days target. Improving DSO: Faster invoicing, better collection process, payment terms adjustment, early payment incentives, credit policy changes. DSO = collection efficiency. Calculate monthly. Track trends. Compare to benchmarks. Aim to improve steadily."
      }
    },
    {
      "@type": "Question",
      "name": "When should I write off bad debt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bad debt write-off decisions: Criteria: Age - typically over 180 days minimum, collection efforts exhausted, no reasonable expectation of payment, customer bankruptcy or closure, legal action failed or not worthwhile. Documentation: Record all collection attempts, document reasons for write-off, approval required per policy, accounting treatment proper. Timing: Review quarterly for candidates, consider year-end cleanup, tax implications, financial statement accuracy. Alternatives before write-off: Collection agency attempt, legal action evaluation, payment plan final attempt, debt sale options. Accounting: Reduce AR balance, record bad debt expense, may require allowance adjustment, tax deduction possible. Prevention: Credit checks, payment terms limits, deposit requirements, stop credit for overdue accounts. Write-off = when recovery unlikely. Exhaust collection first. Document thoroughly. Proper accounting treatment. Learn for future prevention."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Accounts Receivable Guide - Process, Aging & Collections',
  description: 'AR management process, aging analysis, collection strategies, and metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AccountsReceivableGuide />
    </Suspense>
  );
}