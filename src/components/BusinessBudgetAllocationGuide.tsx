'use client'

export default function BusinessBudgetAllocationGuide() {
  const methods = [
    { method: 'Percentage allocation', description: 'Allocate by percentage ratios', benefit: 'Flexibility' },
    { method: 'Incremental budgeting', description: 'Adjust previous budgets', benefit: 'Simplicity' },
    { method: 'Zero-based budgeting', description: 'Start from scratch each period', benefit: 'Efficiency' },
    { method: 'Activity-based budgeting', description: 'Fund by activities', benefit: 'Alignment' },
  ];

  const categories = [
    'Operating expenses',
    'Capital expenditures',
    'Personnel costs',
    'Marketing spend',
    'Research investment',
    'Administrative costs',
    'Contingency reserves',
    'Growth initiatives',
  ];

  const principles = [
    { principle: 'Strategic alignment', application: 'Match business goals', outcome: 'Purpose-driven' },
    { principle: 'Resource optimization', application: 'Maximize efficiency', outcome: 'Value creation' },
    { principle: 'Flexibility balance', application: 'Fixed vs variable', outcome: 'Adaptability' },
    { principle: 'Accountability', application: 'Clear ownership', outcome: 'Responsibility' },
  ];

  const steps = [
    'Assess strategic priorities',
    'Determine total budget',
    'Identify allocation needs',
    'Evaluate allocation options',
    'Set allocation proportions',
    'Distribute budget amounts',
    'Monitor allocation usage',
    'Adjust allocations dynamically',
    'Review allocation outcomes',
    'Optimize allocation process',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Budget Allocation Guide</h1>
      <p className="text-zinc-600">Methods, categories, principles, and steps.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Allocation Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Description: {m.description}</div>
              <div className="text-green-600 mt-1">Benefit: {m.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Budget Categories</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {categories.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Allocation Principles</h3>
        <div className="space-y-1 text-xs">
          {principles.map((p) => (
            <div key={p.principle} className="bg-white rounded p-2">
              <strong>{p.principle}</strong>
              <div className="text-zinc-500 mt-1">Application: {p.application}</div>
              <div className="text-green-600 mt-1">Outcome: {p.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Allocation Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Budget Allocation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess strategic priorities thoroughly. 2. Determine total budget accurately. 3. Identify allocation needs systematically. 4. Evaluate allocation options comprehensively. 5. Set allocation proportions strategically. 6. Distribute budget amounts fairly. 7. Monitor allocation usage continuously. 8. Adjust allocations dynamically. 9. Review allocation outcomes honestly. 10. Optimize allocation process continuously. Budget allocation = strategic resource distribution. Priorities assessed. Budget determined. Needs identified. Options evaluated. Proportions set. Amounts distributed. Usage monitored. Adjustments made. Outcomes reviewed. Process optimized.
        </div>
      </div>
    </main>
  );
}