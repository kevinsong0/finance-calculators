'use client'

export default function LeadershipDevelopmentGuide() {
  const styles = [
    { style: 'Transformational', traits: 'Inspires change, vision', best: 'Innovation-focused' },
    { style: 'Transactional', traits: 'Rewards, structure', best: 'Goal-driven teams' },
    { style: 'Servant', traits: 'Team-first, support', best: 'Collaborative culture' },
    { style: 'Coaching', traits: 'Development focus', best: 'Growth-oriented' },
  ];

  const skills = [
    { skill: 'Communication', importance: 'Foundation', development: 'Training, practice' },
    { skill: 'Decision-making', importance: 'Critical', development: 'Frameworks, experience' },
    { skill: 'Emotional intelligence', importance: 'Essential', development: 'Self-awareness work' },
    { skill: 'Strategic thinking', importance: 'High', development: 'Mentorship, study' },
    { skill: 'Team building', importance: 'Core', development: 'Experience, feedback' },
  ];

  const programs = [
    'Formal training programs',
    'Executive coaching',
    'Mentorship programs',
    'Leadership workshops',
    'Stretch assignments',
    'Cross-functional projects',
    'Feedback and assessment',
    'Continuous learning',
  ];

  const metrics = [
    'Team performance scores',
    'Employee engagement',
    'Retention under leader',
    'Goal achievement rate',
    'Feedback quality',
    'Development of others',
    'Strategic contribution',
    'Culture impact',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Leadership Development Guide</h1>
      <p className="text-zinc-600">Styles, skills, programs, and measurement.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Leadership Styles</h3>
        <div className="space-y-1 text-xs">
          {styles.map((s) => (
            <div key={s.style} className="bg-white rounded p-2">
              <strong>{s.style}</strong>
              <div className="text-zinc-500 mt-1">Traits: {s.traits}</div>
              <div className="text-green-600 mt-1">Best for: {s.best}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Core Leadership Skills</h3>
        <div className="space-y-1 text-xs">
          {skills.map((s) => (
            <div key={s.skill} className="bg-white rounded p-2">
              <strong>{s.skill}</strong>
              <div className="text-zinc-500 mt-1">Importance: {s.importance}</div>
              <div className="text-green-600 mt-1">Development: {s.development}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Development Programs</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {programs.map((p, i) => (
            <div key={p} className="bg-white rounded p-2">{i + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Success Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Leadership Development Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess current leadership capabilities. 2. Identify development needs. 3. Set development goals. 4. Choose appropriate programs. 5. Provide mentorship support. 6. Assign stretch projects. 7. Give regular feedback. 8. Measure progress. 9. Adjust approach as needed. 10. Celebrate growth. 11. Create ongoing learning. 12. Build leadership pipeline. Leadership = continuous development. Multiple styles. Core skills. Formal programs. Mentorship support. Stretch assignments. Regular feedback. Measure outcomes. Build pipeline.
        </div>
      </div>
    </main>
  );
}