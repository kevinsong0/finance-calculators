'use client'

export default function TeamBuildingGuide() {
  const stages = [
    { stage: 'Forming', desc: 'Team comes together', action: 'Define purpose, set rules' },
    { stage: 'Storming', desc: 'Conflicts emerge', action: 'Facilitate, mediate' },
    { stage: 'Norming', desc: 'Norms established', action: 'Strengthen processes' },
    { stage: 'Performing', desc: 'High performance', action: 'Support, empower' },
    { stage: 'Adjourning', desc: 'Team disbands', action: 'Celebrate, learn' },
  ];

  const activities = [
    { activity: 'Icebreakers', purpose: 'Initial connection', frequency: 'Start of formation' },
    { activity: 'Trust exercises', purpose: 'Build trust', frequency: 'Storming phase' },
    { activity: 'Problem-solving', purpose: 'Collaboration skills', frequency: 'Norming phase' },
    { activity: 'Social events', purpose: 'Relationship building', frequency: 'Ongoing' },
    { activity: 'Feedback sessions', purpose: 'Open communication', frequency: 'Regular' },
  ];

  const characteristics = [
    'Clear shared goals',
    'Open communication',
    'Mutual trust',
    'Accountability',
    'Diverse perspectives',
    'Constructive conflict',
    'Supportive environment',
    'Continuous improvement',
  ];

  const challenges = [
    { challenge: 'Communication gaps', solution: 'Regular meetings, tools' },
    { challenge: 'Trust issues', solution: 'Team activities, transparency' },
    { challenge: 'Conflict', solution: 'Mediation, clear processes' },
    { challenge: 'Uneven participation', solution: 'Role clarity, inclusion' },
    { challenge: 'Goal misalignment', solution: 'Clear purpose, regular check' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Team Building Guide</h1>
      <p className="text-zinc-600">Stages, activities, characteristics, and challenges.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Team Development Stages</h3>
        <div className="space-y-1 text-xs">
          {stages.map((s) => (
            <div key={s.stage} className="bg-white rounded p-2">
              <strong>{s.stage}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Action: {s.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Team Building Activities</h3>
        <div className="space-y-1 text-xs">
          {activities.map((a) => (
            <div key={a.activity} className="bg-white rounded p-2">
              <strong>{a.activity}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {a.purpose}</div>
              <div className="text-green-600 mt-1">When: {a.frequency}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Effective Team Characteristics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {characteristics.map((c, i) => (
            <div key={c} className="bg-white rounded p-2">{i + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Challenges & Solutions</h3>
        <div className="space-y-1 text-xs">
          {challenges.map((c) => (
            <div key={c.challenge} className="bg-white rounded p-2">
              <strong className="text-red-600">{c.challenge}</strong>
              <div className="text-green-600 mt-1">→ {c.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Team Building Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define team purpose clearly. 2. Set shared goals. 3. Establish team norms. 4. Choose appropriate activities. 5. Build trust systematically. 6. Encourage open communication. 7. Manage conflict constructively. 8. Celebrate achievements. 9. Provide regular feedback. 10. Support continuous improvement. 11. Monitor team health. 12. Adjust approach as needed. Team = purpose, trust, performance. Clear goals. Build trust. Open communication. Constructive conflict. Celebrate success. Continuous improvement. Monitor health.
        </div>
      </div>
    </main>
  );
}