'use client'

export default function ProcurementGuide() {
  const stages = [
    { stage: 'Need Identification', desc: 'Define requirements', output: 'Specifications' },
    { stage: 'Supplier Selection', desc: 'Research and evaluate', output: 'Qualified suppliers' },
    { stage: 'Negotiation', desc: 'Terms and pricing', output: 'Agreement terms' },
    { stage: 'Contracting', desc: 'Formal agreement', output: 'Signed contract' },
    { stage: 'Order Management', desc: 'Place and track orders', output: 'Delivered goods' },
    { stage: 'Evaluation', desc: 'Performance review', output: 'Supplier assessment' },
  ];

  const strategies = [
    { strategy: 'Single Source', use: 'Unique product, partnership', risk: 'Dependence' },
    { strategy: 'Multiple Sources', use: 'Competition, risk reduction', risk: 'Complexity' },
    { strategy: 'Centralized', use: 'Volume leverage, control', risk: 'Slow response' },
    { strategy: 'Decentralized', use: 'Speed, local needs', risk: 'Higher costs' },
  ];

  const evaluation = [
    'Quality of goods/services',
    'Delivery reliability',
    'Price competitiveness',
    'Customer service',
    'Financial stability',
    'Technical capability',
    'Compliance adherence',
    'Flexibility/responsiveness',
  ];

  const savings = [
    'Volume consolidation',
    'Competitive bidding',
    'Long-term agreements',
    'Process efficiency',
    'Specification optimization',
    'Alternative suppliers',
    'Payment term negotiation',
    'Total cost analysis',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Procurement Guide</h1>
      <p className="text-zinc-600">Procurement stages, strategies, evaluation, and savings.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Procurement Stages</h3>
        <div className="space-y-1 text-xs">
          {stages.map((s) => (
            <div key={s.stage} className="bg-white rounded p-2">
              <strong>{s.stage}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Output: {s.output}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Procurement Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Use: {s.use}</div>
              <div className="text-red-600 mt-1">Risk: {s.risk}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Supplier Evaluation Criteria</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {evaluation.map((e) => (
            <div key={e} className="bg-white rounded p-2">{e}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cost Savings Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {savings.map((s) => (
            <div key={s} className="bg-white rounded p-2">{s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Procurement Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define needs clearly. 2. Research supplier market. 3. Evaluate multiple options. 4. Negotiate terms and pricing. 5. Formalize with contract. 6. Track order status. 7. Verify delivery quality. 8. Monitor supplier performance. 9. Maintain supplier relationships. 10. Review and improve process. 11. Document lessons learned. 12. Plan for future needs. Procurement = strategic sourcing. Not just buying, but strategy. Evaluate suppliers carefully. Negotiate effectively. Manage relationships long-term."
        </div>
      </div>
    </main>
  );
}