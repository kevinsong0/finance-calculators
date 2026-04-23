'use client'

export default function StudentLoanCalculator() {
  const loanTypes = [
    { type: 'Federal Direct Subsidized', desc: 'Government pays interest while in school', rate: '5.50%' },
    { type: 'Federal Direct Unsubsidized', desc: 'Interest accrues immediately', rate: '5.50-7.05%' },
    { type: 'Federal PLUS', desc: 'Parent or graduate student loans', rate: '8.05%' },
    { type: 'Private Student Loans', desc: 'Bank/private lender, credit-based', rate: '4-15%' },
  ];

  const repaymentPlans = [
    { plan: 'Standard', term: '10 years', desc: 'Fixed monthly payment, fastest payoff' },
    { plan: 'Graduated', term: '10 years', desc: 'Payments start low, increase over time' },
    { plan: 'Extended', term: '25 years', desc: 'Lower monthly, more interest total' },
    { plan: 'Income-Driven', term: '20-25 years', desc: 'Payment based on income (IBR, PAYE, REPAYE)' },
  ];

  const strategies = [
    { strategy: 'Pay extra', desc: 'Additional payments reduce principal, save interest' },
    { strategy: 'Refinance', desc: 'Lower rate if credit improved (lose federal benefits)' },
    { strategy: 'Auto-pay discount', desc: 'Many lenders offer 0.25% rate reduction' },
    { strategy: 'Target high-rate loans', desc: 'Avalanche method - pay highest rate first' },
    { strategy: 'Employer programs', desc: 'Some employers offer student loan assistance' },
  ];

  const tips = [
    'Borrow only what you need',
    'Understand interest accrual',
    'Know your repayment options',
    'Avoid default (contact servicer if struggling)',
    'Consider income-driven plans if income low',
    'Track total debt and interest',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Student Loan Guide</h1>
      <p className="text-zinc-600">Loan types, repayment plans, strategies, and tips for student debt.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Student Loan Types</h3>
        <div className="space-y-1 text-xs">
          {loanTypes.map((l) => (
            <div key={l.type} className="bg-white rounded p-2">
              <strong>{l.type}</strong>
              <div className="text-zinc-500 mt-1">{l.desc}</div>
              <div className="text-green-600 mt-1">Rate: {l.rate}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Repayment Plans</h3>
        <div className="space-y-1 text-xs">
          {repaymentPlans.map((r) => (
            <div key={r.plan} className="bg-white rounded p-2">
              <strong>{r.plan}</strong> ({r.term})
              <div className="text-zinc-500 mt-1">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payoff Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-green-50 rounded p-2">
              <strong className="text-green-600">{s.strategy}</strong>
              <div className="text-zinc-600 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Student Loan Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Important Notes</h3>
        <div className="text-xs text-zinc-600">
          Federal loans offer protections (income-driven, forgiveness, deferment). Private loans less flexible. Refinancing federal loans loses benefits. Default severe consequences (credit damage, wage garnishment, no bankruptcy discharge). Contact servicer immediately if unable to pay. Know your total debt and understand interest capitalization.
        </div>
      </div>
    </main>
  );
}