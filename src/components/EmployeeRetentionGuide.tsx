'use client'

export default function EmployeeRetentionGuide() {
  const drivers = [
    { driver: 'Compensation', desc: 'Pay, benefits fairness', action: 'Market-rate pay, transparency' },
    { driver: 'Career Growth', desc: 'Development opportunities', action: 'Training, promotions, paths' },
    { driver: 'Management', desc: 'Relationship with manager', action: 'Regular feedback, support' },
    { driver: 'Culture', desc: 'Values, environment fit', action: 'Clear values, inclusive culture' },
    { driver: 'Work-Life Balance', desc: 'Flexibility, workload', action: 'Reasonable hours, remote options' },
    { driver: 'Recognition', desc: 'Appreciation, visibility', action: 'Acknowledge contributions' },
  ];

  const strategies = [
    'Competitive compensation',
    'Clear career paths',
    'Strong management',
    'Positive culture',
    'Work flexibility',
    'Regular recognition',
    'Open communication',
    'Exit interviews analysis',
  ];

  const warningSigns = [
    'Decreased engagement',
    'Fewer contributions',
    'More time off',
    'Avoiding team events',
    'Negative attitude',
    'Complaining more',
    'Job searching signals',
    'Quiet quitting',
  ];

  const interventions = [
    '1:1 conversation',
    'Address concerns directly',
    'Adjust compensation if needed',
    'Provide growth opportunities',
    'Change team/role if needed',
    'Improve manager relationship',
    'Offer flexibility',
    'Show appreciation',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Retention Guide</h1>
      <p className="text-zinc-600">Retention drivers, strategies, warning signs, and interventions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Retention Drivers</h3>
        <div className="space-y-1 text-xs">
          {drivers.map((d) => (
            <div key={d.driver} className="bg-white rounded p-2">
              <strong>{d.driver}</strong>
              <div className="text-zinc-500 mt-1">{d.desc}</div>
              <div className="text-green-600 mt-1">Action: {d.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Retention Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {strategies.map((s) => (
            <div key={s} className="bg-white rounded p-2">{s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Warning Signs</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {warningSigns.map((w) => (
            <div key={w} className="bg-white rounded p-2 text-red-600">⚠️ {w}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Interventions</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {interventions.map((i) => (
            <div key={i} className="bg-white rounded p-2">{i}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Retention Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Competitive compensation review. 2. Career development programs. 3. Manager training. 4. Culture assessment. 5. Flexibility policies. 6. Recognition programs. 7. Regular feedback systems. 8. Monitor engagement metrics. 9. Conduct stay interviews. 10. Analyze exit data. 11. Address warning signs early. 12. Build belonging. Retention = proactive investment. Don&apos;t wait until they leave. Address drivers systematically."
        </div>
      </div>
    </main>
  );
}