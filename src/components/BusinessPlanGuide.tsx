'use client'

export default function BusinessPlanGuide() {
  const components = [
    { component: 'Executive Summary', desc: 'Overview, mission, key points', priority: 'High' },
    { component: 'Company Description', desc: 'What business does, structure', priority: 'Required' },
    { component: 'Market Analysis', desc: 'Industry, target market, competition', priority: 'Required' },
    { component: 'Products/Services', desc: 'What you offer, value proposition', priority: 'Required' },
    { component: 'Marketing Strategy', desc: 'How you reach customers', priority: 'Required' },
    { component: 'Financial Plan', desc: 'Revenue, costs, projections', priority: 'Required' },
  ];

  const financials = [
    { item: 'Revenue Projections', desc: 'Estimate income 1-3 years' },
    { item: 'Startup Costs', desc: 'Initial investment needed' },
    { item: 'Operating Expenses', desc: 'Monthly costs to run business' },
    { item: 'Cash Flow Statement', desc: 'Money in/out timing' },
    { item: 'Break-Even Analysis', desc: 'When costs = revenue' },
    { item: 'Profit & Loss Projection', desc: 'Expected profitability' },
  ];

  const tips = [
    'Research thoroughly (market, competition)',
    'Be realistic with projections',
    'Update regularly (quarterly review)',
    'Keep concise (20-30 pages)',
    'Executive summary last (summarize full plan)',
    'Tailor to audience (investors vs internal)',
  ];

  const mistakes = [
    { mistake: 'No market research', fix: 'Include data, target audience analysis' },
    { mistake: 'Overoptimistic projections', fix: 'Use conservative estimates, show assumptions' },
    { mistake: 'Ignoring competition', fix: 'Analyze competitors, differentiate' },
    { mistake: 'No implementation plan', fix: 'Include timeline, milestones, responsibilities' },
    { mistake: 'Too long/unfocused', fix: 'Keep under 30 pages, executive summary first' },
    { mistake: 'No financial details', fix: 'Include realistic budgets, break-even, funding needed' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Plan Guide</h1>
      <p className="text-zinc-600">Components, financial projections, tips, and common mistakes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Plan Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong> ({c.priority})
              <div className="text-zinc-500 mt-1">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Financial Plan Items</h3>
        <div className="space-y-1 text-xs">
          {financials.map((f) => (
            <div key={f.item} className="bg-white rounded p-2">
              <strong>{f.item}</strong>
              <div className="text-zinc-600 mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Writing Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Mistakes</h3>
        <div className="space-y-1 text-xs">
          {mistakes.map((m) => (
            <div key={m.mistake} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{m.mistake}</strong>
              <div className="text-green-600 mt-1">Fix: {m.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Business Plan Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Research market thoroughly. 2. Define target customer clearly. 3. Analyze competition. 4. Describe product/service value. 5. Plan marketing strategy. 6. Detail operations. 7. Include realistic financials. 8. Show funding requirements. 9. Set milestones. 10. Write compelling executive summary. Business plan = roadmap + pitch tool.
        </div>
      </div>
    </main>
  );
}