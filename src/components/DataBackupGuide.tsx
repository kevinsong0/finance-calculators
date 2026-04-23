'use client'

export default function DataBackupGuide() {
  const strategies = [
    { strategy: 'Full backup', description: 'Complete data copy', frequency: 'Weekly/monthly' },
    { strategy: 'Incremental backup', description: 'Changes since last backup', frequency: 'Daily' },
    { strategy: 'Differential backup', description: 'Changes since full backup', frequency: 'Daily' },
    { strategy: 'Mirror backup', description: 'Exact replica', frequency: 'Continuous' },
  ];

  const methods = [
    'On-site backup',
    'Off-site backup',
    'Cloud backup',
    'Hybrid backup',
    'Disk-to-disk',
    'Disk-to-tape',
    'Virtual backup',
    'Snapshot backup',
  ];

  const components = [
    'Backup schedule',
    'Storage location',
    'Encryption',
    'Compression',
    'Verification',
    'Retention policy',
    'Access control',
    'Documentation',
  ];

  const bestPractices = [
    '3-2-1 rule (3 copies, 2 media, 1 offsite)',
    'Regular testing',
    'Automated scheduling',
    'Encryption protection',
    'Version retention',
    'Documentation',
    'Access controls',
    'Recovery planning',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Data Backup Guide</h1>
      <p className="text-zinc-600">Strategies, methods, components, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Backup Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Description: {s.description}</div>
              <div className="text-green-600 mt-1">Frequency: {s.frequency}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Backup Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {methods.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Backup Components</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {components.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((b, idx) => (
            <div key={b} className="bg-white rounded p-2">{idx + 1}. {b}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Data Backup Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define backup strategy. 2. Select backup methods. 3. Schedule backup jobs. 4. Configure encryption. 5. Set retention policies. 6. Implement verification. 7. Test recovery. 8. Document procedures. 9. Monitor backup status. 10. Review regularly. Good backups = data protection. Strategy defined. Methods selected. Jobs scheduled. Encryption configured. Policies set. Verification implemented. Recovery tested. Procedures documented. Status monitored. Reviews regular.
        </div>
      </div>
    </main>
  );
}
