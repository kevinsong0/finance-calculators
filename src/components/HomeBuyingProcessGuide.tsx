'use client'

export default function HomeBuyingProcessGuide() {
  const steps = [
    { step: 'Financial Preparation', desc: 'Budget, credit, savings', action: 'Check score, save down payment' },
    { step: 'Pre-Approval', desc: 'Mortgage approval letter', action: 'Compare lenders, get letter' },
    { step: 'Home Search', desc: 'Find right property', action: 'Define criteria, work with agent' },
    { step: 'Make Offer', desc: 'Negotiate purchase', action: 'Contingencies, price negotiation' },
    { step: 'Inspection', desc: 'Professional review', action: 'Inspect, negotiate repairs' },
    { step: 'Final Approval', desc: 'Underwriting complete', action: 'Submit docs, clear conditions' },
    { step: 'Closing', desc: 'Finalize purchase', action: 'Sign docs, transfer funds' },
    { step: 'Move-In', desc: 'Settle into home', action: 'Utilities, setup, enjoy' },
  ];

  const costs = [
    { cost: 'Down Payment', typical: '3-20% of price', tip: 'Higher = lower rate' },
    { cost: 'Closing Costs', typical: '2-5% of price', tip: 'Negotiate some costs' },
    { cost: 'Inspection', typical: '$300-500', tip: 'Always inspect' },
    { cost: 'Appraisal', typical: '$300-500', tip: 'Required by lender' },
    { cost: 'Moving', typical: '$1,000-5,000', tip: 'Budget for move' },
    { cost: 'First Payments', typical: 'Mortgage + utilities', tip: 'Have buffer saved' },
  ];

  const timeline = [
    'Preparation: 2-6 months',
    'Pre-approval: 1-2 weeks',
    'Home search: 1-3 months',
    'Offer to closing: 30-60 days',
    'Total: 4-9 months typical',
  ];

  const checklist = [
    'Check credit score',
    'Calculate budget',
    'Save down payment',
    'Get pre-approval',
    'Find real estate agent',
    'Start home search',
    'Make offer with contingencies',
    'Schedule inspection',
    'Review appraisal',
    'Clear underwriting',
    'Prepare closing funds',
    'Sign and close',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Home Buying Process Guide</h1>
      <p className="text-zinc-600">Buying steps, costs, timeline, and checklist.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Buying Steps</h3>
        <div className="space-y-1 text-xs">
          {steps.map((s) => (
            <div key={s.step} className="bg-white rounded p-2">
              <strong>{s.step}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Action: {s.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Costs to Expect</h3>
        <div className="space-y-1 text-xs">
          {costs.map((c) => (
            <div key={c.cost} className="bg-white rounded p-2">
              <strong>{c.cost}</strong>
              <div className="text-red-600 mt-1">{c.typical}</div>
              <div className="text-zinc-500 mt-1">{c.tip}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Timeline</h3>
        <div className="space-y-1 text-xs">
          {timeline.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Buying Checklist</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {checklist.map((c, i) => (
            <div key={c} className="bg-white rounded p-2">{i + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Tips</h3>
        <div className="text-xs text-zinc-600">
          Credit matters: 740+ score gets best rates. Down payment: 20% avoids PMI, 10% common, 3% minimum for some. Contingencies: Inspection, appraisal, financing - protect yourself. Closing timeline: 30-45 days typical after offer accepted. Total cost: Price + 5-10% for closing + move + setup. Emergency fund: Keep savings after purchase for repairs. Home buying = biggest purchase. Prepare financially, research thoroughly, protect with contingencies. Patience beats rushing."
        </div>
      </div>
    </main>
  );
}