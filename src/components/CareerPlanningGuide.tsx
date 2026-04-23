'use client'

export default function CareerPlanningGuide() {
  const phases = [
    { phase: 'Entry (0-2 years)', focus: 'Learn basics, build skills', action: 'Take on varied tasks, ask questions' },
    { phase: 'Development (2-5 years)', focus: 'Deepen expertise, grow impact', action: 'Own projects, develop specialty' },
    { phase: 'Mid-Career (5-10 years)', focus: 'Lead, mentor, expand influence', action: 'Manage teams, cross-functional work' },
    { phase: 'Senior (10+ years)', focus: 'Strategic impact, thought leadership', action: 'Shape direction, mentor leaders' },
  ];

  const skills = [
    { skill: 'Technical', desc: 'Core job competency', develop: 'Courses, projects, practice' },
    { skill: 'Communication', desc: 'Writing, presenting, listening', develop: 'Public speaking, writing practice' },
    { skill: 'Leadership', desc: 'Influence, decision-making', develop: 'Lead projects, mentor others' },
    { skill: 'Network', desc: 'Relationships, connections', develop: 'Events, coffee chats, LinkedIn' },
    { skill: 'Business', desc: 'Understanding company, market', develop: 'Cross-functional exposure' },
  ];

  const tips = [
    'Set clear goals',
    'Seek feedback regularly',
    'Build network early',
    'Learn continuously',
    'Take on challenges',
    'Document achievements',
    'Negotiate compensation',
    'Plan transitions',
  ];

  const decisions = [
    { decision: 'Specialize vs Generalize', factors: 'Industry trends, personal interest, job market' },
    { decision: 'Stay vs Move company', factors: 'Growth opportunity, culture, compensation' },
    { decision: 'Management vs Individual contributor', factors: 'Leadership interest, technical depth, skills' },
    { decision: 'Industry switch', factors: 'Skills transferability, network, market opportunity' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Career Planning Guide</h1>
      <p className="text-zinc-600">Career phases, skills development, decisions, and planning tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Career Phases</h3>
        <div className="space-y-1 text-xs">
          {phases.map((p) => (
            <div key={p.phase} className="bg-white rounded p-2">
              <strong>{p.phase}</strong>
              <div className="text-zinc-500 mt-1">Focus: {p.focus}</div>
              <div className="text-green-600 mt-1">Action: {p.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Skills</h3>
        <div className="space-y-1 text-xs">
          {skills.map((s) => (
            <div key={s.skill} className="bg-white rounded p-2">
              <strong>{s.skill}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Develop: {s.develop}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Career Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Decisions</h3>
        <div className="space-y-1 text-xs">
          {decisions.map((d) => (
            <div key={d.decision} className="bg-white rounded p-2">
              <strong>{d.decision}</strong>
              <div className="text-zinc-500 mt-1">Factors: {d.factors}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Career Planning Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define career goals (short, medium, long). 2. Assess current skills. 3. Identify skill gaps. 4. Create development plan. 5. Build network actively. 6. Seek mentorship. 7. Track achievements. 8. Update resume regularly. 9. Research market trends. 10. Prepare for transitions. 11. Negotiate promotions. 12. Reassess annually. Career = intentional journey. Plan, execute, adapt.
        </div>
      </div>
    </main>
  );
}