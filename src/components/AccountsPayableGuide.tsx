'use client'

export default function AccountsPayableGuide() {
  const processes = [
    { step: 'Receive Invoice', desc: 'Get supplier/vendor bills', timing: 'As delivered' },
    { step: 'Verify Accuracy', desc: 'Check against purchase order', timing: 'Before approval' },
    { step: 'Approval', desc: 'Authorize payment', timing: 'Per approval workflow' },
    { step: 'Schedule Payment', desc: 'Plan payment timing', timing: 'Based on terms' },
    { step: 'Execute Payment', desc: 'Send payment to vendor', timing: 'Due date' },
    { step: 'Record Transaction', desc: 'Update accounting records', timing: 'When paid' },
  ];

  const paymentMethods = [
    { method: 'Check', pros: 'Control, documentation', cons: 'Slow, manual' },
    { method: 'ACH/Bank Transfer', pros: 'Fast, low cost', cons: 'Setup required' },
    { method: 'Wire Transfer', pros: 'Immediate, large amounts', cons: 'Higher cost' },
    { method: 'Credit Card', pros: 'Convenient, rewards', cons: 'Fees, credit limits' },
  ];

  const controls = [
    'Approval workflow',
    'Duplicate payment check',
    'Vendor verification',
    'Invoice matching (PO, receipt)',
    'Payment authorization limits',
    'Segregation of duties',
    'Regular reconciliation',
    'Audit trail maintenance',
  ];

  const metrics = [
    'Days payable outstanding (DPO)',
    'AP turnover ratio',
    'Payment accuracy rate',
    'Late payment percentage',
    'Early payment discounts taken',
    'Vendor satisfaction score',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Accounts Payable Guide</h1>
      <p className="text-zinc-600">AP process, payment methods, controls, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">AP Process Steps</h3>
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
        <h3 className="font-medium mb-2">Payment Methods</h3>
        <div className="space-y-1 text-xs">
          {paymentMethods.map((p) => (
            <div key={p.method} className="bg-white rounded p-2">
              <strong>{p.method}</strong>
              <div className="text-green-600 mt-1">Pros: {p.pros}</div>
              <div className="text-red-600 mt-1">Cons: {p.cons}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Control Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {controls.map((c) => (
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
        <h3 className="font-medium mb-2">AP Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Receive and log all invoices. 2. Verify invoice accuracy. 3. Match to purchase order. 4. Route for approval. 5. Schedule payment strategically. 6. Take early payment discounts if beneficial. 7. Execute payment on due date. 8. Record transaction properly. 9. Reconcile AP to GL monthly. 10. Maintain vendor records. 11. Review aging regularly. 12. Prevent duplicate payments. AP = money you owe others. Pay strategically for cash flow. Verify before paying. Maintain controls. Build vendor relationships."
        </div>
      </div>
    </main>
  );
}