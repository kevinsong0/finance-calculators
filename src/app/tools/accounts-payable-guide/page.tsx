import type { Metadata } from 'next';
import { Suspense } from 'react';
import AccountsPayableGuide from '@/components/AccountsPayableGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is accounts payable management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Accounts payable management definition: Purpose: Track money owed to suppliers, ensure accurate payments, maintain vendor relationships, optimize cash flow. AP process: Receive invoice - get supplier bills, verify accuracy - check against purchase order, approval - authorize payment, schedule payment - plan timing, execute payment - send funds, record transaction - update records. Importance: AP = money owed to others, affects cash flow, impacts vendor relationships, requires accuracy and controls. Key goals: Pay accurately, pay on time (but strategically), maintain controls, build vendor trust. AP management = organized payment process. Verify before paying. Pay strategically. Maintain controls. Vendor relationships matter."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prevent duplicate payments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Duplicate payment prevention: Before payment: Check invoice number - verify not already paid, search by vendor name and amount, review payment history, check invoice date range. Systems: Unique invoice numbering, duplicate detection software, payment approval workflow, vendor statement reconciliation. Controls: Segregation of duties - different people approve and pay, approval thresholds - require review for large amounts, invoice matching - match to PO and receipt, payment limits - cap automatic payments. After payment: Vendor statement review - compare to your records, reconciliation - verify AP balance accuracy, audit - spot check payments. Detection: Regular reviews, vendor communication, bank reconciliation, internal audits. Prevention = systematic checks. Verify before paying. Use matching process. Multiple controls together. Audit periodically."
      }
    },
    {
      "@type": "Question",
      "name": "Should I take early payment discounts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Early payment discount decisions: Common terms: 2/10 Net 30 - 2% discount if paid in 10 days, otherwise full amount in 30 days. Calculation: Discount = 2% savings for paying 20 days early, Annualized = 2% / (20/365) = 36.5% equivalent annual return. Decision factors: Cash availability - can you pay early?, investment alternatives - better returns elsewhere?, vendor relationship - importance of relationship?, frequency - ongoing or one-time?, total discount value - worth the effort? When to take: High equivalent rate (above 20%), sufficient cash available, ongoing relationship, reliable vendor, simple to implement. When to skip: Cash constrained, better investment alternatives, one-time purchase, complex implementation. Discount = evaluate cost-benefit. Calculate equivalent return. Consider cash position. Decision per vendor/situation. Track savings from discounts taken."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate days payable outstanding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Days payable outstanding calculation: Formula: DPO = (Average Accounts Payable / COGS) x Number of days. Alternative: DPO = Accounts Payable / (Annual COGS / 365). Average AP: (Beginning AP + Ending AP) / 2, or use ending AP for simplicity. Example: AP = $100,000, Annual COGS = $600,000, DPO = 100,000 / (600,000/365) = 100,000 / 1,644 = 61 days. Interpretation: DPO = average days to pay suppliers, higher = holding cash longer (better for cash flow), lower = paying faster, balance vendor relationships. Too high: Vendor relationship damage, supply disruption risk, credit terms loss. Too low: Cash flow inefficiency, missing discount opportunities. Target: Industry benchmark, vendor terms alignment, strategic balance. DPO = payment timing. Higher benefits cash flow but risks relationships. Balance carefully. Monitor vendor feedback."
      }
    },
    {
      "@type": "Question",
      "name": "What controls should I have in accounts payable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Accounts payable controls: Invoice verification: Match invoice to purchase order, match to receiving report, verify quantities and prices, check mathematical accuracy, verify vendor legitimacy. Approval workflow: Defined approval authority, approval thresholds by amount, documented approval chain, approval timing requirements. Payment controls: Segregation of duties (approve and pay separate), dual authorization for large amounts, payment method controls, check stock security, bank account controls. Record keeping: Complete documentation, audit trail maintained, vendor file maintenance, payment history accessible. Regular reviews: Aging analysis, vendor statement reconciliation, duplicate payment checks, unusual payment investigation. Controls = prevent errors and fraud. Multiple layers. Document everything. Regular audit. Balance control with efficiency."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Accounts Payable Guide - Process, Controls & Payments',
  description: 'AP management process, payment methods, controls, and metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AccountsPayableGuide />
    </Suspense>
  );
}