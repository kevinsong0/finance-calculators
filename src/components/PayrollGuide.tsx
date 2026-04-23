'use client'

export default function PayrollGuide() {
  const components = [
    { component: 'Gross Pay', desc: 'Total earnings', calc: 'Hours worked x rate' },
    { component: 'Deductions', desc: 'Amounts withheld', calc: 'Tax, benefit contributions' },
    { component: 'Net Pay', desc: 'Final amount', calc: 'Gross - deductions' },
    { component: 'Employer Taxes', desc: 'Company-paid taxes', calc: 'Social security, unemployment' },
  ];

  const deductions = [
    { type: 'Federal Income Tax', desc: 'Based on withholding', mandatory: true },
    { type: 'State Income Tax', desc: 'State-specific', mandatory: 'Varies' },
    { type: 'Social Security', desc: 'FICA contribution', mandatory: true },
    { type: 'Medicare', desc: 'FICA contribution', mandatory: true },
    { type: 'Benefits', desc: 'Health, retirement', mandatory: 'If enrolled' },
    { type: 'Other', desc: '401k, garnishments', mandatory: 'Varies' },
  ];

  const process = [
    'Collect time data',
    'Verify hours worked',
    'Calculate gross pay',
    'Apply deductions',
    'Calculate net pay',
    'Review for accuracy',
    'Process payments',
    'Record transaction',
    'Report taxes',
    'Maintain records',
  ];

  const compliance = [
    'Tax withholding accuracy',
    'Timely tax payments',
    'W-2 preparation',
    'Minimum wage compliance',
    'Overtime calculation',
    'Equal pay requirements',
    'Record retention',
    'Audit preparation',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Payroll Management Guide</h1>
      <p className="text-zinc-600">Payroll components, deductions, process, and compliance.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payroll Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">Calc: {c.calc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Deductions</h3>
        <div className="space-y-1 text-xs">
          {deductions.map((d) => (
            <div key={d.type} className="bg-white rounded p-2">
              <strong>{d.type}</strong>
              <div className="text-zinc-500 mt-1">{d.desc}</div>
              <div className="text-red-600 mt-1">Mandatory: {d.mandatory.toString()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payroll Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, i) => (
            <div key={p} className="bg-white rounded p-2">{i + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Requirements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {compliance.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payroll Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set up payroll system properly. 2. Collect time/attendance data. 3. Verify employee classifications. 4. Calculate gross pay accurately. 5. Apply correct deductions. 6. Review before processing. 7. Pay employees timely. 8. Record all transactions. 9. Report taxes correctly. 10. Maintain required records. 11. Prepare annual reports (W-2). 12. Audit payroll regularly. Payroll = accuracy critical. Compliance mandatory. Timely processing. Record everything. Review before paying. Use reliable system."
        </div>
      </div>
    </main>
  );
}