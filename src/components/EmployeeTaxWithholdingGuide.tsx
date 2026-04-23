'use client'

export default function EmployeeTaxWithholdingGuide() {
  const taxes = [
    { tax: 'Federal income tax', basis: 'Wage amount, filing status', rate: 'Progressive brackets' },
    { tax: 'State income tax', basis: 'State residence', rate: 'State-specific' },
    { tax: 'Social security', basis: 'Wages up to cap', rate: '6.2% employee' },
    { tax: 'Medicare', basis: 'All wages', rate: '1.45% employee' },
    { tax: 'Local tax', basis: 'Local jurisdiction', rate: 'Local-specific' },
    { tax: 'Additional Medicare', basis: 'High earners', rate: '0.9% above threshold' },
  ];

  const forms = [
    'W-4 Federal withholding',
    'State withholding forms',
    'I-9 Employment eligibility',
    'W-2 Year-end reporting',
    '1099 Contractor reporting',
    '941 Quarterly filing',
    '940 Annual unemployment',
    'State tax returns',
  ];

  const calculation = [
    'Determine filing status',
    'Check allowances claimed',
    'Use withholding tables',
    'Apply wage brackets',
    'Calculate periodic withholding',
    'Adjust for additional withholding',
    'Verify total withholding',
    'Report on pay stub',
  ];

  const adjustments = [
    { adjustment: 'Filing status change', trigger: 'Marriage, divorce', action: 'Update W-4' },
    { adjustment: 'Allowance change', trigger: 'Dependent changes', action: 'Revise withholding' },
    { adjustment: 'Additional withholding', trigger: 'Tax planning', action: 'Extra amount' },
    { adjustment: 'Exempt status', trigger: 'No tax liability', action: 'Claim exemption' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Tax Withholding Guide</h1>
      <p className="text-zinc-600">Taxes, forms, calculation, and adjustments.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Types</h3>
        <div className="space-y-1 text-xs">
          {taxes.map((t) => (
            <div key={t.tax} className="bg-white rounded p-2">
              <strong>{t.tax}</strong>
              <div className="text-zinc-500 mt-1">Basis: {t.basis}</div>
              <div className="text-green-600 mt-1">Rate: {t.rate}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Forms</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {forms.map((f, idx) => (
            <div key={f} className="bg-white rounded p-2">{idx + 1}. {f}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Calculation Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {calculation.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Adjustment Triggers</h3>
        <div className="space-y-1 text-xs">
          {adjustments.map((a) => (
            <div key={a.adjustment} className="bg-white rounded p-2">
              <strong>{a.adjustment}</strong>
              <div className="text-zinc-500 mt-1">Trigger: {a.trigger}</div>
              <div className="text-green-600 mt-1">Action: {a.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Withholding Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Collect W-4 from new employees. 2. Verify filing status claimed. 3. Use correct withholding tables. 4. Calculate withholding per pay period. 5. Include all required taxes. 6. Apply Social Security cap. 7. Calculate Medicare correctly. 8. Apply additional withholding if requested. 9. Report withholding on pay stub. 10. Collect state withholding forms. 11. Update when status changes. 12. Report year-end correctly. Tax withholding = accurate compliance. Forms collected. Status verified. Tables used. Calculations accurate. All taxes included. Pay stub reporting. Year-end reporting. Updates timely.
        </div>
      </div>
    </main>
  );
}