'use client'

export default function BusinessFinancialReportingGuide() {
  const statements = [
    { statement: 'Balance sheet', purpose: 'Assets, liabilities, equity', frequency: 'Periodic' },
    { statement: 'Income statement', purpose: 'Revenue, expenses, profit', frequency: 'Periodic' },
    { statement: 'Cash flow statement', purpose: 'Cash movements', frequency: 'Periodic' },
    { statement: 'Equity statement', purpose: 'Owner changes', frequency: 'Periodic' },
    { statement: 'Notes to statements', purpose: 'Details, context', frequency: 'Periodic' },
    { statement: 'Management report', purpose: 'Internal analysis', frequency: 'Regular' },
  ];

  const standards = [
    'GAAP compliance',
    'IFRS alignment',
    'Consistent methods',
    'Accurate timing',
    'Full disclosure',
    'Materiality principle',
    'Going concern basis',
    'Comparative format',
  ];

  const process = [
    'Collect financial data',
    'Verify accuracy',
    'Apply accounting rules',
    'Prepare statements',
    'Review for errors',
    'Add disclosures',
    'Obtain approval',
    'Distribute reports',
    'Archive documents',
    'Review compliance',
  ];

  const users = [
    { user: 'Management', need: 'Operational decisions', use: 'Internal analysis' },
    { user: 'Investors', need: 'Performance evaluation', use: 'Investment decisions' },
    { user: 'Lenders', need: 'Credit assessment', use: 'Loan decisions' },
    { user: 'Regulators', need: 'Compliance verification', use: 'Regulatory review' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Financial Reporting Guide</h1>
      <p className="text-zinc-600">Statements, standards, process, and users.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Financial Statements</h3>
        <div className="space-y-1 text-xs">
          {statements.map((s) => (
            <div key={s.statement} className="bg-white rounded p-2">
              <strong>{s.statement}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {s.purpose}</div>
              <div className="text-green-600 mt-1">Frequency: {s.frequency}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Reporting Standards</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {standards.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Reporting Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Report Users</h3>
        <div className="space-y-1 text-xs">
          {users.map((u) => (
            <div key={u.user} className="bg-white rounded p-2">
              <strong>{u.user}</strong>
              <div className="text-zinc-500 mt-1">Need: {u.need}</div>
              <div className="text-green-600 mt-1">Use: {u.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Financial Reporting Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Collect all financial data. 2. Verify data accuracy. 3. Apply accounting rules correctly. 4. Prepare complete statements. 5. Review for errors thoroughly. 6. Add required disclosures. 7. Obtain management approval. 8. Distribute reports timely. 9. Archive documents properly. 10. Review compliance status. Financial reporting = transparency foundation. Data collected. Accuracy verified. Rules applied. Statements prepared. Errors reviewed. Disclosures added. Approval obtained. Reports distributed. Documents archived. Compliance reviewed.
        </div>
      </div>
    </main>
  );
}