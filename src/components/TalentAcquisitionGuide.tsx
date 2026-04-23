'use client'

export default function TalentAcquisitionGuide() {
  const stages = [
    { stage: 'Job Analysis', desc: 'Define role requirements', output: 'Job description' },
    { stage: 'Sourcing', desc: 'Find candidates', output: 'Candidate pool' },
    { stage: 'Screening', desc: 'Filter candidates', output: 'Qualified candidates' },
    { stage: 'Interviewing', desc: 'Assess candidates', output: 'Top candidates' },
    { stage: 'Selection', desc: 'Choose best fit', output: 'Selected candidate' },
    { stage: 'Offer', desc: 'Make offer', output: 'Acceptance or rejection' },
  ];

  const sourcing = [
    { source: 'Job Boards', reach: 'Wide audience', cost: 'Medium' },
    { source: 'LinkedIn', reach: 'Professional network', cost: 'Medium-high' },
    { source: 'Referrals', reach: 'Quality candidates', cost: 'Low' },
    { source: 'Recruiters', reach: 'Specialized talent', cost: 'High' },
    { source: 'Company Website', reach: 'Interested candidates', cost: 'Low' },
    { source: 'Social Media', reach: 'Younger audience', cost: 'Low' },
  ];

  const interviewTypes = [
    'Phone screening',
    'Technical assessment',
    'Behavioral interview',
    'Panel interview',
    'Cultural fit interview',
    'Reference check',
  ];

  const evaluation = [
    'Skills match',
    'Experience relevance',
    'Cultural fit',
    'Communication ability',
    'Problem-solving skills',
    'Growth potential',
    'Team collaboration',
    'References quality',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Talent Acquisition Guide</h1>
      <p className="text-zinc-600">Recruitment stages, sourcing, interviewing, and evaluation.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Recruitment Stages</h3>
        <div className="space-y-1 text-xs">
          {stages.map((s) => (
            <div key={s.stage} className="bg-white rounded p-2">
              <strong>{s.stage}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Output: {s.output}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Sourcing Channels</h3>
        <div className="space-y-1 text-xs">
          {sourcing.map((s) => (
            <div key={s.source} className="bg-white rounded p-2">
              <strong>{s.source}</strong>
              <div className="text-zinc-500 mt-1">Reach: {s.reach}</div>
              <div className="text-green-600 mt-1">Cost: {s.cost}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Interview Types</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {interviewTypes.map((i) => (
            <div key={i} className="bg-white rounded p-2">{i}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Evaluation Criteria</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {evaluation.map((e) => (
            <div key={e} className="bg-white rounded p-2">{e}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Talent Acquisition Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define role clearly before sourcing. 2. Write compelling job description. 3. Choose appropriate sourcing channels. 4. Screen efficiently. 5. Structure interviews consistently. 6. Use multiple evaluation methods. 7. Evaluate fairly and objectively. 8. Check references thoroughly. 9. Make competitive offers. 10. Communicate throughout process. 11. Track metrics (time-to-fill, cost). 12. Improve process continuously. Talent acquisition = strategic hiring. Define role well. Source from multiple channels. Evaluate fairly. Move efficiently. Candidate experience matters."
        </div>
      </div>
    </main>
  );
}