'use client'

export default function EmployeePayrollProcessingGuide() {
  const steps = [
    'Gather time data',
    'Calculate hours worked',
    'Determine pay rates',
    'Calculate gross pay',
    'Apply deductions',
    'Calculate overtime',
    'Process bonuses',
    'Apply taxes',
    'Calculate net pay',
    'Review accuracy',
    'Process payment',
    'Distribute pay',
    'Record transactions',
    'Report compliance',
  ];

  const deductions = [
    { deduction: 'Federal tax', type: 'Mandatory', basis: 'Wage bracket' },
    { deduction: 'State tax', type: 'Mandatory', basis: 'State rates' },
    { deduction: 'Social security', type: 'Mandatory', basis: 'Fixed rate' },
    { deduction: 'Medicare', type: 'Mandatory', basis: 'Fixed rate' },
    { deduction: 'Retirement', type: 'Voluntary', basis: 'Employee choice' },
    { deduction: 'Health insurance', type: 'Voluntary', basis: 'Plan selection' },
  ];

  const compliance = [
    'Tax withholding accuracy',
    'Pay frequency requirements',
    'Minimum wage compliance',
    'Overtime calculation correct',
    'Pay stub requirements',
    'Record retention',
    'Reporting deadlines',
    'Tax deposit timing',
  ];

  const bestPractices = [
    'Automate processing',
    'Double-check calculations',
    'Maintain records',
    'Stay current on laws',
    'Communicate to employees',
    'Handle errors promptly',
    'Audit regularly',
    'Train payroll staff',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Payroll Processing Guide</h1>
      <p className="text-zinc-600">Steps, deductions, compliance, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Processing Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Deductions</h3>
        <div className="space-y-1 text-xs">
          {deductions.map((d) => (
            <div key={d.deduction} className="bg-white rounded p-2">
              <strong>{d.deduction}</strong>
              <div className="text-zinc-500 mt-1">Type: {d.type}</div>
              <div className="text-green-600 mt-1">Basis: {d.basis}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Requirements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {compliance.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payroll Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Collect time and attendance data. 2. Verify hours worked. 3. Apply correct pay rates. 4. Calculate overtime properly. 5. Process bonuses and adjustments. 6. Calculate deductions correctly. 7. Apply tax withholdings accurately. 8. Calculate net pay. 9. Review for accuracy. 10. Process payment timely. 11. Distribute pay appropriately. 12. Record transactions. 13. Maintain compliance records. 14. Report as required. Payroll = accurate processing. Data collected. Hours verified. Rates applied. Deductions calculated. Taxes withheld. Net pay accurate. Payment timely. Records maintained. Compliance ensured.
        </div>
      </div>
    </main>
  );
}