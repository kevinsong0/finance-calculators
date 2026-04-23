'use client'

export default function EmployeeAttendanceTrackingGuide() {
  const methods = [
    { method: 'Time clocks', accuracy: 'Physical recording', benefit: 'Reliable data' },
    { method: 'Mobile apps', accuracy: 'GPS-enabled', benefit: 'Remote tracking' },
    { method: 'Badge systems', accuracy: 'Swipe cards', benefit: 'Secure access' },
    { method: 'Biometric', accuracy: 'Fingerprint, face', benefit: 'Fraud prevention' },
    { method: 'Web-based', accuracy: 'Online login', benefit: 'Flexible entry' },
    { method: 'Manual logs', accuracy: 'Paper records', benefit: 'Backup option' },
  ];

  const process = [
    'Set attendance policy',
    'Choose tracking method',
    'Configure system',
    'Train employees',
    'Collect time data',
    'Review records',
    'Address discrepancies',
    'Calculate hours',
    'Generate reports',
    'Integrate payroll',
  ];

  const metrics = [
    'Attendance rate',
    'Absence frequency',
    'Tardiness incidents',
    'Early departures',
    'Overtime hours',
    'Leave utilization',
    'Pattern analysis',
    'Cost impact',
  ];

  const issues = [
    { issue: 'Clocking errors', cause: 'System glitches', resolution: 'Regular maintenance' },
    { issue: 'Forgot to clock', cause: 'Employee oversight', resolution: 'Reminder alerts' },
    { issue: 'Buddy punching', cause: 'Fraud attempts', resolution: 'Biometric system' },
    { issue: 'Data gaps', cause: 'System downtime', resolution: 'Backup procedures' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Attendance Tracking Guide</h1>
      <p className="text-zinc-600">Methods, process, metrics, and issues.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tracking Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Accuracy: {m.accuracy}</div>
              <div className="text-green-600 mt-1">Benefit: {m.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tracking Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Issues</h3>
        <div className="space-y-1 text-xs">
          {issues.map((i) => (
            <div key={i.issue} className="bg-white rounded p-2">
              <strong>{i.issue}</strong>
              <div className="text-zinc-500 mt-1">Cause: {i.cause}</div>
              <div className="text-green-600 mt-1">Resolution: {i.resolution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Attendance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set clear attendance policy. 2. Choose appropriate tracking method. 3. Configure system properly. 4. Train all employees. 5. Collect time data consistently. 6. Review records regularly. 7. Address discrepancies promptly. 8. Calculate hours accurately. 9. Generate useful reports. 10. Integrate with payroll system. Attendance tracking = accurate records. Policy set. Method chosen. System configured. Employees trained. Data collected. Records reviewed. Discrepancies addressed. Hours calculated. Reports generated. Payroll integrated.
        </div>
      </div>
    </main>
  );
}