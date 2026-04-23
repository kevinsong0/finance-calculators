'use client'

export default function InterviewPreparationGuide() {
  const phases = [
    { phase: 'Resume Review', desc: 'Tailor to job, highlight relevant experience', tips: 'Match keywords, quantify achievements' },
    { phase: 'Research Company', desc: 'Understand products, culture, recent news', tips: 'Website, LinkedIn, Glassdoor, news' },
    { phase: 'Practice Questions', desc: 'Behavioral, technical, situational', tips: 'STAR method, mock interviews' },
    { phase: 'Prepare Questions', desc: 'Ask about role, team, challenges', tips: 'Show genuine interest' },
    { phase: 'Mock Interview', desc: 'Practice with friend or AI', tips: 'Record, review, improve' },
    { phase: 'Follow-Up', desc: 'Thank you note, reiterate interest', tips: 'Within 24 hours, reference discussion' },
  ];

  const questionTypes = [
    { type: 'Behavioral', examples: 'Tell me about a challenge, leadership example, conflict resolution' },
    { type: 'Technical', examples: 'Coding problems, system design, domain knowledge' },
    { type: 'Situational', examples: 'What would you do if..., hypothetical scenarios' },
    { type: 'Cultural', examples: 'Why this company, work style, values alignment' },
    { type: 'Experience', examples: 'Walk through resume, explain projects, discuss skills' },
  ];

  const starMethod = [
    { part: 'S - Situation', desc: 'Set the scene, context' },
    { part: 'T - Task', desc: 'Your responsibility, challenge' },
    { part: 'A - Action', desc: 'What you did, steps taken' },
    { part: 'R - Result', desc: 'Outcome, impact, lessons' },
  ];

  const tips = [
    'Arrive early (10-15 minutes)',
    'Bring copies of resume',
    'Dress appropriately for culture',
    'Listen carefully, ask clarifying questions',
    'Be honest about weaknesses',
    'Show enthusiasm for role',
    'Have specific examples ready',
    'Research interviewers (LinkedIn)',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Interview Preparation Guide</h1>
      <p className="text-zinc-600">Interview phases, question types, STAR method, and tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Interview Phases</h3>
        <div className="space-y-1 text-xs">
          {phases.map((p) => (
            <div key={p.phase} className="bg-white rounded p-2">
              <strong>{p.phase}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Tips: {p.tips}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Question Types</h3>
        <div className="space-y-1 text-xs">
          {questionTypes.map((q) => (
            <div key={q.type} className="bg-white rounded p-2">
              <strong>{q.type}</strong>
              <div className="text-zinc-600 mt-1">{q.examples}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">STAR Method</h3>
        <div className="space-y-1 text-xs">
          {starMethod.map((s) => (
            <div key={s.part} className="bg-blue-50 rounded p-2">
              <strong className="text-blue-600">{s.part}</strong>
              <div className="text-zinc-600 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Interview Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Preparation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Update resume for specific job. 2. Research company thoroughly. 3. Practice common questions. 4. Prepare STAR stories. 5. Have technical examples ready. 6. Prepare questions to ask. 7. Plan outfit and logistics. 8. Mock interview with feedback. 9. Review job description. 10. Relax and be confident. Preparation = confidence = better interview.
        </div>
      </div>
    </main>
  );
}