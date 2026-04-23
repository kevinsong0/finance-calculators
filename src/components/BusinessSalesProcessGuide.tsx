'use client'

export default function BusinessSalesProcessGuide() {
  const stages = [
    { stage: 'Prospecting', activity: 'Finding leads', outcome: 'Qualified prospects' },
    { stage: 'Qualification', activity: 'Assessing fit', outcome: 'Valid opportunities' },
    { stage: 'Presentation', activity: 'Showing value', outcome: 'Interested buyers' },
    { stage: 'Negotiation', activity: 'Discussing terms', outcome: 'Agreement terms' },
    { stage: 'Closing', activity: 'Finalizing deal', outcome: 'Completed sales' },
    { stage: 'Follow-up', activity: 'Post-sale service', outcome: 'Satisfied customers' },
  ];

  const techniques = [
    'Consultative selling',
    'Solution selling',
    'Value-based selling',
    'Relationship selling',
    'SPIN selling',
    'Challenger selling',
    'Account-based selling',
    'Social selling',
  ];

  const skills = [
    { skill: 'Communication', application: 'Clear messaging', improvement: 'Practice, feedback' },
    { skill: 'Listening', application: 'Understanding needs', improvement: 'Active listening training' },
    { skill: 'Negotiation', application: 'Deal making', improvement: 'Negotiation courses' },
    { skill: 'Product knowledge', application: 'Value articulation', improvement: 'Continuous learning' },
  ];

  const metrics = [
    'Sales volume',
    'Conversion rate',
    'Average deal size',
    'Sales cycle length',
    'Pipeline value',
    'Win rate',
    'Customer acquisition cost',
    'Revenue per salesperson',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Sales Process Guide</h1>
      <p className="text-zinc-600">Stages, techniques, skills, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Sales Stages</h3>
        <div className="space-y-1 text-xs">
          {stages.map((s) => (
            <div key={s.stage} className="bg-white rounded p-2">
              <strong>{s.stage}</strong>
              <div className="text-zinc-500 mt-1">Activity: {s.activity}</div>
              <div className="text-green-600 mt-1">Outcome: {s.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Sales Techniques</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {techniques.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Sales Skills</h3>
        <div className="space-y-1 text-xs">
          {skills.map((s) => (
            <div key={s.skill} className="bg-white rounded p-2">
              <strong>{s.skill}</strong>
              <div className="text-zinc-500 mt-1">Application: {s.application}</div>
              <div className="text-green-600 mt-1">Improvement: {s.improvement}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Sales Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Sales Process Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Prospect for qualified leads. 2. Qualify opportunities thoroughly. 3. Present compelling value. 4. Negotiate favorable terms. 5. Close deals efficiently. 6. Follow up for satisfaction. 7. Develop sales skills continuously. 8. Track sales metrics actively. 9. Optimize process regularly. 10. Build customer relationships. Sales process = revenue engine. Leads prospected. Opportunities qualified. Value presented. Terms negotiated. Deals closed. Follow-up done. Skills developed. Metrics tracked. Process optimized. Relationships built.
        </div>
      </div>
    </main>
  );
}