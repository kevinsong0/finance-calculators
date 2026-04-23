'use client'

export default function InsuranceBasicsGuide() {
  const types = [
    { type: 'Health Insurance', purpose: 'Medical costs', mandatory: 'Essential coverage' },
    { type: 'Auto Insurance', purpose: 'Vehicle liability', mandatory: 'Required by law' },
    { type: 'Homeowners/Renters', purpose: 'Property protection', mandatory: 'Recommended' },
    { type: 'Life Insurance', purpose: 'Family protection', mandatory: 'If dependents' },
    { type: 'Disability', purpose: 'Income protection', mandatory: 'Working age' },
    { type: 'Liability', purpose: 'Legal protection', mandatory: 'Risk situations' },
  ];

  const concepts = [
    'Premium: Payment for coverage',
    'Deductible: Amount you pay first',
    'Copay: Fixed cost per service',
    'Coinsurance: Percentage you pay',
    'Out-of-pocket max: Annual limit',
    'Coverage limit: Policy max payout',
    'Exclusion: Not covered items',
    'Waiting period: Time before active',
  ];

  const selectionFactors = [
    'Coverage needs',
    'Risk tolerance',
    'Budget constraints',
    'Family situation',
    'Asset protection',
    'Legal requirements',
    'Health factors',
    'Geographic location',
  ];

  const tips = [
    'Compare multiple quotes',
    'Understand policy terms',
    'Check coverage limits',
    'Review exclusions',
    'Consider deductible level',
    'Bundle for discounts',
    'Annual review needed',
    'Read before signing',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Insurance Basics Guide</h1>
      <p className="text-zinc-600">Insurance types, concepts, selection factors, and tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Insurance Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.purpose}</div>
              <div className="text-green-600 mt-1">{t.mandatory}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Concepts</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {concepts.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Selection Factors</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {selectionFactors.map((f) => (
            <div key={f} className="bg-white rounded p-2">{f}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Insurance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify required coverages (health, auto minimums). 2. Assess risks and assets needing protection. 3. Determine coverage amounts needed. 4. Compare quotes from multiple providers. 5. Understand deductible/premium trade-offs. 6. Check coverage limits and exclusions. 7. Consider bundling policies. 8. Review annually for changes. 9. Document policies and contacts. 10. Understand claims process. Insurance = risk transfer. Understand what&apos;s covered, what&apos;s not. Compare, read, understand before buying. Adequate coverage for your risk level."
        </div>
      </div>
    </main>
  );
}