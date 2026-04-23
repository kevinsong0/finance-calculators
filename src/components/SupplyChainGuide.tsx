'use client'

export default function SupplyChainGuide() {
  const components = [
    { component: 'Planning', desc: 'Demand forecasting, strategy', focus: 'Coordination' },
    { component: 'Sourcing', desc: 'Supplier selection, negotiation', focus: 'Cost/quality' },
    { component: 'Production', desc: 'Manufacturing, assembly', focus: 'Efficiency' },
    { component: 'Logistics', desc: 'Transportation, warehousing', focus: 'Delivery' },
    { component: 'Returns', desc: 'Reverse logistics, disposal', focus: 'Customer service' },
  ];

  const risks = [
    { risk: 'Supplier disruption', mitigation: 'Multiple suppliers, contracts' },
    { risk: 'Transport delays', mitigation: 'Buffer inventory, routes' },
    { risk: 'Quality issues', mitigation: 'Inspection, standards' },
    { risk: 'Demand volatility', mitigation: 'Forecasting, flexibility' },
    { risk: 'Cost increases', mitigation: 'Long-term contracts, hedging' },
    { risk: 'Information gaps', mitigation: 'Systems, visibility' },
  ];

  const optimization = [
    'Demand forecasting accuracy',
    'Supplier relationship management',
    'Lead time reduction',
    'Inventory optimization',
    'Transportation efficiency',
    'Information sharing',
    'Process standardization',
    'Continuous improvement',
  ];

  const metrics = [
    'Order fulfillment rate',
    'On-time delivery',
    'Inventory days',
    'Supply chain cost ratio',
    'Supplier lead time',
    'Perfect order rate',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Supply Chain Guide</h1>
      <p className="text-zinc-600">Components, risks, optimization, and key metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Supply Chain Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">Focus: {c.focus}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Supply Chain Risks</h3>
        <div className="space-y-1 text-xs">
          {risks.map((r) => (
            <div key={r.risk} className="bg-white rounded p-2">
              <strong className="text-red-600">{r.risk}</strong>
              <div className="text-green-600 mt-1">→ {r.mitigation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Optimization Areas</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {optimization.map((o) => (
            <div key={o} className="bg-white rounded p-2">{o}</div>
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
        <h3 className="font-medium mb-2">Supply Chain Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Map entire supply chain. 2. Identify critical suppliers. 3. Assess risks at each stage. 4. Develop mitigation strategies. 5. Establish performance metrics. 6. Implement tracking systems. 7. Build supplier relationships. 8. Plan for disruptions. 9. Optimize inventory levels. 10. Improve forecast accuracy. 11. Reduce lead times. 12. Standardize processes. Supply chain = end-to-end flow. Planning, sourcing, making, delivering. Visibility essential. Risk management critical. Optimize continuously."
        </div>
      </div>
    </main>
  );
}