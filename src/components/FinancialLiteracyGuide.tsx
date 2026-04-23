'use client'

export default function FinancialLiteracyGuide() {
  const concepts = [
    { concept: 'Compound Interest', desc: 'Interest earned on interest, exponential growth' },
    { concept: 'Inflation', desc: 'Decrease in purchasing power over time' },
    { concept: 'Diversification', desc: 'Spread investments to reduce risk' },
    { concept: 'Asset Allocation', desc: 'Balance of stocks, bonds, cash' },
    { concept: 'Emergency Fund', desc: '3-6 months expenses saved' },
    { concept: 'Credit Score', desc: 'Measure of creditworthiness (300-850)' },
  ];

  const budgetingRules = [
    { rule: '50/30/20', desc: '50% needs, 30% wants, 20% savings' },
    { rule: '70/20/10', desc: '70% spending, 20% savings, 10% giving/investing' },
    { rule: 'Zero-Based', desc: 'Every dollar assigned a purpose' },
    { rule: 'Pay Yourself First', desc: 'Save before spending' },
  ];

  const investmentTypes = [
    { type: 'Stocks', desc: 'Ownership in companies, high risk/return' },
    { type: 'Bonds', desc: 'Loans to entities, lower risk, fixed returns' },
    { type: 'Index Funds', desc: 'Diversified, low-cost, market performance' },
    { type: 'ETFs', desc: 'Tradeable index funds, flexible' },
    { type: 'Real Estate', desc: 'Property investment, tangible asset' },
    { type: 'Retirement (401k, IRA)', desc: 'Tax-advantaged retirement savings' },
  ];

  const debtManagement = [
    { strategy: 'Snowball Method', desc: 'Pay smallest debts first for motivation' },
    { strategy: 'Avalanche Method', desc: 'Pay highest rate debts first, saves money' },
    { strategy: 'Balance Transfer', desc: 'Move debt to lower rate card' },
    { strategy: 'Consolidation', desc: 'Combine debts into single loan' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Financial Literacy Guide</h1>
      <p className="text-zinc-600">Core concepts, budgeting rules, investment types, and debt management.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Core Financial Concepts</h3>
        <div className="space-y-1 text-xs">
          {concepts.map((c) => (
            <div key={c.concept} className="bg-white rounded p-2">
              <strong>{c.concept}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Budgeting Methods</h3>
        <div className="space-y-1 text-xs">
          {budgetingRules.map((b) => (
            <div key={b.rule} className="bg-white rounded p-2">
              <strong>{b.rule}</strong>
              <div className="text-zinc-600 mt-1">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Investment Types</h3>
        <div className="space-y-1 text-xs">
          {investmentTypes.map((i) => (
            <div key={i.type} className="bg-white rounded p-2">
              <strong>{i.type}</strong>
              <div className="text-zinc-500 mt-1">{i.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Debt Management Strategies</h3>
        <div className="space-y-1 text-xs">
          {debtManagement.map((d) => (
            <div key={d.strategy} className="bg-white rounded p-2">
              <strong>{d.strategy}</strong>
              <div className="text-zinc-600 mt-1">{d.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Financial Literacy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Track spending (know where money goes). 2. Build emergency fund (3-6 months). 3. Pay off high-interest debt. 4. Understand credit score factors. 5. Start retirement savings early. 6. Diversify investments. 7. Live below means. 8. Avoid lifestyle inflation. 9. Invest in yourself (education, skills). 10. Review finances regularly. Financial literacy = lifelong learning, start now.
        </div>
      </div>
    </main>
  );
}