'use client'

export default function HealthInsuranceGuide() {
  const types = [
    { type: 'Employer-Sponsored', desc: 'Through employer', pros: 'Group rates, employer pays part' },
    { type: 'Individual Market', desc: 'Buy directly', pros: 'Choice, portable' },
    { type: 'ACA/Obamacare', desc: 'Government marketplace', pros: 'Subsidies, standardized' },
    { type: 'Medicare', desc: '65+ or disability', pros: 'Government coverage' },
    { type: 'Medicaid', desc: 'Low income', pros: 'Free or low cost' },
  ];

  const terms = [
    { term: 'Premium', desc: 'Monthly payment for coverage' },
    { term: 'Deductible', desc: 'Amount paid before insurance' },
    { term: 'Copay', desc: 'Fixed amount per service' },
    { term: 'Coinsurance', desc: 'Percentage you pay after deductible' },
    { term: 'Out-of-pocket Max', desc: 'Maximum you pay in year' },
    { term: 'Network', desc: 'Covered doctors, hospitals' },
  ];

  const considerations = [
    'Monthly premium affordability',
    'Deductible level',
    'Network coverage',
    'Prescription coverage',
    'Specialist access',
    'Pre-existing conditions',
    'Annual maximums',
    'Emergency coverage',
  ];

  const tips = [
    'Compare multiple plans',
    'Check network carefully',
    'Understand all costs',
    'Consider health needs',
    'Factor in subsidies',
    'Read fine print',
    'Plan for changes',
    'Review annually',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Health Insurance Guide</h1>
      <p className="text-zinc-600">Insurance types, key terms, considerations, and tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Insurance Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Pros: {t.pros}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Terms</h3>
        <div className="space-y-1 text-xs">
          {terms.map((t) => (
            <div key={t.term} className="bg-white rounded p-2">
              <strong>{t.term}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Considerations</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {considerations.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Selection Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Health Insurance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess health needs (medications, doctors, conditions). 2. Determine budget (premium + potential costs). 3. Compare plan types (HMO, PPO, etc). 4. Check network (your doctors covered?). 5. Review drug coverage. 6. Calculate total potential costs. 7. Check subsidies eligibility. 8. Understand enrollment periods. 9. Review annually during open enrollment. 10. Keep documentation organized. Health insurance = major expense + important coverage. Research thoroughly. Compare options.
        </div>
      </div>
    </main>
  );
}