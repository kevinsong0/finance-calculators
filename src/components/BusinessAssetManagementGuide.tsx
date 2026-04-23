'use client'

export default function BusinessAssetManagementGuide() {
  const types = [
    { type: 'Fixed assets', category: 'Long-term assets', focus: 'Capital management' },
    { type: 'Current assets', category: 'Short-term assets', focus: 'Working capital' },
    { type: 'Intangible assets', category: 'Non-physical assets', focus: 'Value protection' },
    { type: 'Financial assets', category: 'Investment assets', focus: 'Portfolio management' },
  ];

  const processes = [
    'Asset acquisition',
    'Asset tracking',
    'Asset valuation',
    'Asset maintenance',
    'Asset utilization',
    'Asset depreciation',
    'Asset disposal',
    'Asset replacement',
    'Asset optimization',
    'Asset audit',
  ];

  const strategies = [
    { strategy: 'Lifecycle management', approach: 'Full asset lifecycle', benefit: 'Maximized value' },
    { strategy: 'Utilization optimization', approach: 'Improve usage rates', benefit: 'Higher efficiency' },
    { strategy: 'Maintenance planning', approach: 'Preventive maintenance', benefit: 'Reduced downtime' },
    { strategy: 'Disposal optimization', approach: 'Value recovery', benefit: 'Asset monetization' },
  ];

  const metrics = [
    'Asset turnover ratio',
    'Return on assets',
    'Asset utilization rate',
    'Maintenance cost ratio',
    'Asset age distribution',
    'Depreciation rate',
    'Asset value growth',
    'Disposal value recovery',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Asset Management Guide</h1>
      <p className="text-zinc-600">Types, processes, strategies, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Asset Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Category: {t.category}</div>
              <div className="text-green-600 mt-1">Focus: {t.focus}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Processes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {processes.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Approach: {s.approach}</div>
              <div className="text-green-600 mt-1">Benefit: {s.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Success Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Asset Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Acquire assets strategically. 2. Track assets accurately. 3. Value assets appropriately. 4. Maintain assets proactively. 5. Utilize assets efficiently. 6. Calculate depreciation correctly. 7. Dispose assets timely. 8. Replace assets optimally. 9. Optimize asset portfolio. 10. Audit assets regularly. Asset management = resource optimization. Assets acquired. Assets tracked. Assets valued. Assets maintained. Assets utilized. Depreciation calculated. Assets disposed. Assets replaced. Portfolio optimized. Audits completed.
        </div>
      </div>
    </main>
  );
}
