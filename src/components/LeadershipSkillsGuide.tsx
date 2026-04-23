'use client'

export default function LeadershipSkillsGuide() {
  const styles = [
    { style: 'Transformational', desc: 'Inspire and motivate change', when: 'Change, growth, innovation needed' },
    { style: 'Servant', desc: 'Focus on team needs first', when: 'Team development, trust building' },
    { style: 'Democratic', desc: 'Involve team in decisions', when: 'Diverse perspectives, buy-in needed' },
    { style: 'Autocratic', desc: 'Leader makes decisions alone', when: 'Crisis, urgent, clear expertise' },
    { style: 'Coaching', desc: 'Develop team capabilities', when: 'Long-term growth, skill building' },
    { style: 'Situational', desc: 'Adapt style to context', when: 'Various situations, flexible' },
  ];

  const skills = [
    { skill: 'Communication', desc: 'Clear, listen, adapt message' },
    { skill: 'Emotional Intelligence', desc: 'Understand emotions, motivate' },
    { skill: 'Decision Making', desc: 'Analyze, choose, implement' },
    { skill: 'Delegation', desc: 'Assign effectively, trust' },
    { skill: 'Problem Solving', desc: 'Identify, analyze, solve' },
    { skill: 'Vision', desc: 'Set direction, inspire' },
  ];

  const habits = [
    'Listen more than talk',
    'Give regular feedback',
    'Celebrate team success',
    'Take responsibility for failures',
    'Invest in team development',
    'Lead by example',
    'Stay calm under pressure',
    'Communicate vision clearly',
  ];

  const developmentTips = [
    { tip: 'Seek feedback', action: 'Ask team, peers for input regularly' },
    { tip: 'Read leadership books', action: 'Learn from experts, case studies' },
    { tip: 'Practice regularly', action: 'Apply skills in daily situations' },
    { tip: 'Reflect on experiences', action: 'Review decisions, outcomes, lessons' },
    { tip: 'Find mentor', action: 'Learn from experienced leader' },
    { tip: 'Take courses', action: 'Formal training, workshops' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Leadership Skills Guide</h1>
      <p className="text-zinc-600">Leadership styles, key skills, habits, and development tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Leadership Styles</h3>
        <div className="space-y-1 text-xs">
          {styles.map((s) => (
            <div key={s.style} className="bg-white rounded p-2">
              <strong>{s.style}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">When: {s.when}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Leadership Skills</h3>
        <div className="space-y-1 text-xs">
          {skills.map((s) => (
            <div key={s.skill} className="bg-white rounded p-2">
              <strong>{s.skill}</strong>
              <div className="text-zinc-600 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Leadership Habits</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {habits.map((h) => (
            <div key={h} className="bg-white rounded p-2">{h}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Development Tips</h3>
        <div className="space-y-1 text-xs">
          {developmentTips.map((d) => (
            <div key={d.tip} className="bg-green-50 rounded p-2">
              <strong className="text-green-600">{d.tip}</strong>
              <div className="text-zinc-600 mt-1">{d.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Leadership Development Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify current strengths/weaknesses. 2. Choose style to develop. 3. Seek feedback regularly. 4. Practice skills daily. 5. Learn from mentors. 6. Read leadership resources. 7. Reflect on experiences. 8. Measure progress. 9. Adjust approach based on results. 10. Stay committed to growth. Leadership = practice + reflection + iteration.
        </div>
      </div>
    </main>
  );
}