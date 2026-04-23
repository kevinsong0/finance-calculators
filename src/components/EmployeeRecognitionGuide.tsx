'use client'

export default function EmployeeRecognitionGuide() {
  const types = [
    { type: 'Formal', desc: 'Structured programs', examples: 'Awards, bonuses, promotions' },
    { type: 'Informal', desc: 'Day-to-day appreciation', examples: 'Thanks, praise, mentions' },
    { type: 'Public', desc: 'Visible recognition', examples: 'Announcements, events' },
    { type: 'Private', desc: 'Personal acknowledgment', examples: '1-on-1, notes, emails' },
    { type: 'Team', desc: 'Group achievements', examples: 'Team awards, celebrations' },
    { type: 'Individual', desc: 'Personal contribution', examples: 'Personal praise, rewards' },
  ];

  const benefits = [
    { benefit: 'Engagement', impact: 'Higher commitment', evidence: 'Studies show increase' },
    { benefit: 'Retention', impact: 'Lower turnover', evidence: 'Cost savings' },
    { benefit: 'Performance', impact: 'Better results', evidence: 'Motivation boost' },
    { benefit: 'Culture', impact: 'Positive environment', evidence: 'Behavior modeling' },
    { benefit: 'Morale', impact: 'Improved atmosphere', evidence: 'Happiness increase' },
  ];

  const programs = [
    'Employee of month/quarter',
    'Performance bonuses',
    'Peer recognition systems',
    'Milestone celebrations',
    'Public acknowledgment',
    'Thank you notes',
    'Team celebrations',
    'Achievement awards',
    'Spot bonuses',
    'Career advancement',
  ];

  const bestPractices = [
    'Timely recognition',
    'Specific acknowledgment',
    'Match to preference',
    'Consistent approach',
    'Inclusive criteria',
    'Meaningful rewards',
    'Visible communication',
    'Regular frequency',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Recognition Guide</h1>
      <p className="text-zinc-600">Types, benefits, programs, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Recognition Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Examples: {t.examples}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits of Recognition</h3>
        <div className="space-y-1 text-xs">
          {benefits.map((b) => (
            <div key={b.benefit} className="bg-white rounded p-2">
              <strong>{b.benefit}</strong>
              <div className="text-zinc-500 mt-1">Impact: {b.impact}</div>
              <div className="text-green-600 mt-1">Evidence: {b.evidence}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Recognition Programs</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {programs.map((p, i) => (
            <div key={p} className="bg-white rounded p-2">{i + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p, i) => (
            <div key={p} className="bg-white rounded p-2">{i + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Recognition Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define recognition criteria clearly. 2. Create multiple recognition types. 3. Train managers on recognition. 4. Make recognition timely. 5. Be specific in acknowledgment. 6. Match to employee preference. 7. Include peer recognition. 8. Celebrate team achievements. 9. Track recognition frequency. 10. Survey employee satisfaction. 11. Adjust programs as needed. 12. Link to performance goals. Recognition = timely, specific, meaningful. Multiple types. Clear criteria. Manager training. Employee preference. Track frequency. Link to goals. Culture of appreciation.
        </div>
      </div>
    </main>
  );
}