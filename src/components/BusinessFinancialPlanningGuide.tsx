'use client'

export default function BusinessFinancialPlanningGuide() {
  const components = [
    { component: 'Revenue planning', elements: 'Sales forecasts, pricing', outcome: 'Income projection' },
    { component: 'Expense planning', elements: 'Cost budgets, allocations', outcome: 'Spending control' },
    { component: 'Capital planning', elements: 'Investments, funding', outcome: 'Growth resources' },
    { component: 'Cash planning', elements: 'Liquidity, reserves', outcome: 'Financial stability' },
  ];

  const process = [
    'Set financial goals',
    'Analyze current position',
    'Project future performance',
    'Develop financial strategies',
    'Create financial budgets',
    'Allocate financial resources',
    'Implement financial plans',
    'Monitor financial progress',
    'Adjust financial plans',
    'Review financial outcomes',
  ];

  const tools = [
    { tool: 'Budget models', application: 'Spending planning', benefit: 'Cost control' },
    { tool: 'Forecast models', application: 'Revenue projection', benefit: 'Planning accuracy' },
    { tool: 'Scenario analysis', application: 'Alternative outcomes', benefit: 'Risk awareness' },
    { tool: 'Variance analysis', application: 'Actual vs planned', benefit: 'Performance insight' },
  ];

  const metrics = [
    'Revenue growth rate',
    'Expense ratio',
    'Profit margin',
    'Cash position',
    'Return on investment',
    'Financial leverage',
    'Working capital',
    'Financial efficiency',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Financial Planning Guide</h1>
      <p className="text-zinc-600">Components, process, tools, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">Elements: {c.elements}</div>
              <div className="text-green-600 mt-1">Outcome: {c.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Tools</h3>
        <div className="space-y-1 text-xs">
          {tools.map((t) => (
            <div key={t.tool} className="bg-white rounded p-2">
              <strong>{t.tool}</strong>
              <div className="text-zinc-500 mt-1">Application: {t.application}</div>
              <div className="text-green-600 mt-1">Benefit: {t.benefit}</div>
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
        <h3 className="font-medium mb-2">Financial Planning Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set financial goals clearly. 2. Analyze current position thoroughly. 3. Project future performance accurately. 4. Develop financial strategies strategically. 5. Create financial budgets realistically. 6. Allocate financial resources wisely. 7. Implement financial plans effectively. 8. Monitor financial progress continuously. 9. Adjust financial plans flexibly. 10. Review financial outcomes honestly. Financial planning = business success. Goals set. Position analyzed. Performance projected. Strategies developed. Budgets created. Resources allocated. Plans implemented. Progress monitored. Plans adjusted. Outcomes reviewed.
        </div>
      </div>
    </main>
  );
}