'use client'

export default function BusinessTeamDynamicsGuide() {
  const stages = [
    { stage: 'Forming', characteristics: 'Orientation and testing', needs: 'Structure and clarity' },
    { stage: 'Storming', characteristics: 'Conflict and resistance', needs: 'Conflict resolution' },
    { stage: 'Norming', characteristics: 'Agreement and cooperation', needs: 'Norm establishment' },
    { stage: 'Performing', characteristics: 'High productivity', needs: 'Challenge and support' },
    { stage: 'Adjourning', characteristics: 'Task completion', needs: 'Recognition and closure' },
  ];

  const factors = [
    'Team composition',
    'Communication patterns',
    'Leadership style',
    'Decision-making process',
    'Conflict management',
    'Goal alignment',
    'Role clarity',
    'Trust levels',
  ];

  const dysfunctions = [
    { dysfunction: 'Absence of trust', symptom: 'Vulnerability avoidance', solution: 'Open dialogue' },
    { dysfunction: 'Fear of conflict', symptom: 'Artificial harmony', solution: 'Constructive debate' },
    { dysfunction: 'Lack of commitment', symptom: 'Ambiguity acceptance', solution: 'Clear decisions' },
    { dysfunction: 'Avoidance of accountability', symptom: 'Low standards', solution: 'Peer pressure' },
    { dysfunction: 'Inattention to results', symptom: 'Individual focus', solution: 'Team goals' },
  ];

  const improvements = [
    'Build trust through openness',
    'Encourage healthy conflict',
    'Drive commitment through clarity',
    'Establish accountability systems',
    'Focus on collective results',
    'Improve communication flow',
    'Clarify roles and responsibilities',
    'Strengthen goal alignment',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Team Dynamics Guide</h1>
      <p className="text-zinc-600">Stages, factors, dysfunctions, and improvements.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Team Stages</h3>
        <div className="space-y-1 text-xs">
          {stages.map((s) => (
            <div key={s.stage} className="bg-white rounded p-2">
              <strong>{s.stage}</strong>
              <div className="text-zinc-500 mt-1">Characteristics: {s.characteristics}</div>
              <div className="text-green-600 mt-1">Needs: {s.needs}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Dynamic Factors</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {factors.map((f, idx) => (
            <div key={f} className="bg-white rounded p-2">{idx + 1}. {f}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Team Dysfunctions</h3>
        <div className="space-y-1 text-xs">
          {dysfunctions.map((d) => (
            <div key={d.dysfunction} className="bg-white rounded p-2">
              <strong>{d.dysfunction}</strong>
              <div className="text-zinc-500 mt-1">Symptom: {d.symptom}</div>
              <div className="text-green-600 mt-1">Solution: {d.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {improvements.map((i, idx) => (
            <div key={i} className="bg-white rounded p-2">{idx + 1}. {i}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Team Dynamics Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Build trust through openness consistently. 2. Encourage healthy conflict constructively. 3. Drive commitment through clear decisions. 4. Establish strong accountability systems. 5. Focus on collective team results. 6. Improve communication flow regularly. 7. Clarify roles and responsibilities clearly. 8. Strengthen goal alignment effectively. Team dynamics = performance foundation. Trust built. Conflict encouraged. Commitment driven. Accountability established. Results focused. Communication improved. Roles clarified. Goals aligned.
        </div>
      </div>
    </main>
  );
}