'use client'

export default function AccountsReceivableGuide() {
  const processes = [
    { step: 'Invoice Creation', desc: 'Generate accurate invoices', timing: 'Immediately after sale' },
    { step: 'Invoice Delivery', desc: 'Send to customer promptly', timing: 'Within 24-48 hours' },
    { step: 'Payment Tracking', desc: 'Monitor payment status', timing: 'Daily review' },
    { step: 'Collections', desc: 'Follow up overdue accounts', timing: 'Based on aging' },
    { step: 'Payment Recording', desc: 'Record receipts properly', timing: 'When received' },
    { step: 'Reconciliation', desc: 'Verify balances accurate', timing: 'Monthly' },
  ];

  const agingAnalysis = [
    'Current (0-30 days)',
    '31-60 days - Monitor',
    '61-90 days - Contact',
    '91-120 days - Urgent',
    'Over 120 days - Escalate',
    'Bad debt consideration',
  ];

  const collectionTactics = [
    'Reminder emails',
    'Phone calls',
    'Payment plans',
    'Late fees/interest',
    'Collection agency',
    'Legal action',
  ];

  const metrics = [
    'Days sales outstanding (DSO)',
    'AR turnover ratio',
    'Collection effectiveness',
    'Bad debt percentage',
    'Average collection period',
    'AR aging percentage',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Accounts Receivable Guide</h1>
      <p className="text-zinc-600">AR process, aging analysis, collections, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">AR Process Steps</h3>
        <div className="space-y-1 text-xs">
          {processes.map((p) => (
            <div key={p.step} className="bg-white rounded p-2">
              <strong>{p.step}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Timing: {p.timing}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Aging Analysis</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {agingAnalysis.map((a) => (
            <div key={a} className="bg-white rounded p-2">{a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Collection Tactics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {collectionTactics.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">AR Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Invoice promptly after delivery. 2. Verify invoice accuracy. 3. Send to correct recipient. 4. Track payment status daily. 5. Review aging report weekly. 6. Contact overdue accounts. 7. Document collection efforts. 8. Offer payment plans if needed. 9. Apply late fees per policy. 10. Escalate persistent issues. 11. Write off bad debt appropriately. 12. Reconcile AR to GL monthly. AR = money owed to you. Collect faster = better cash flow. Invoice immediately. Follow up systematically. Track aging, act on overdue."
        </div>
      </div>
    </main>
  );
}