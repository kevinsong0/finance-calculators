'use client';

import { useState, useMemo } from 'react';

export default function TaxEventImpactCalculator() {
  const [eventType, setEventType] = useState<string>('job_change');
  const [currentIncome, setCurrentIncome] = useState<string>('80000');
  const [newIncome, setNewIncome] = useState<string>('100000');
  const [eventDate, setEventDate] = useState<string>('2024-07-01');
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [hasSpouseIncome, setHasSpouseIncome] = useState<boolean>(false);
  const [spouseIncome, setSpouseIncome] = useState<string>('0');
  const [ownHome, setOwnHome] = useState<boolean>(false);
  const [hasDependents, setHasDependents] = useState<boolean>(false);
  const [dependentCount, setDependentCount] = useState<string>('0');

  const result = useMemo(() => {
    const current = parseFloat(currentIncome) || 0;
    const newInc = parseFloat(newIncome) || 0;
    const spouse = parseFloat(spouseIncome) || 0;
    const dependents = parseInt(dependentCount) || 0;

    const incomeChange = newInc - current;
    const isIncrease = incomeChange > 0;

    // Calculate tax impact estimate
    const currentTaxable = current - 15000; // Simplified standard deduction
    const newTaxable = newInc - 15000;

    // Simplified tax calculation
    const calculateTax = (taxable: number, status: string) => {
      let tax = 0;
      const brackets = status === 'married_joint' ? [
        { min: 0, max: 23200, rate: 0.10 },
        { min: 23200, max: 94300, rate: 0.12 },
        { min: 94300, max: 201050, rate: 0.22 },
        { min: 201050, max: 383900, rate: 0.24 }
      ] : [
        { min: 0, max: 11600, rate: 0.10 },
        { min: 11600, max: 47150, rate: 0.12 },
        { min: 47150, max: 100525, rate: 0.22 },
        { min: 100525, max: 191950, rate: 0.24 }
      ];

      for (const bracket of brackets) {
        if (taxable > bracket.min) {
          const inBracket = Math.min(taxable, bracket.max) - bracket.min;
          tax += inBracket * bracket.rate;
        }
      }
      return tax;
    };

    const currentTax = calculateTax(currentTaxable, filingStatus);
    const newTax = calculateTax(newTaxable, filingStatus);
    const taxChange = newTax - currentTax;

    // Calculate withholding adjustment needed
    const withholdingNeeded = newTax / 12;
    const withholdingChange = withholdingNeeded - (currentTax / 12);

    // Calculate benefits/deductions impact
    const impacts: { item: string; impact: number; action: string }[] = [];

    if (isIncrease && incomeChange > 10000) {
      impacts.push({
        item: 'Tax Bracket',
        impact: newTaxable > 100525 ? 1 : 0,
        action: 'May enter higher bracket - review withholding'
      });
    }

    if (hasDependents && dependents > 0) {
      const creditPerDependent = 2000;
      impacts.push({
        item: 'Child Tax Credit',
        impact: creditPerDependent * dependents,
        action: 'Update W-4 to claim credits properly'
      });
    }

    if (ownHome) {
      impacts.push({
        item: 'Mortgage Interest Deduction',
        impact: 12000,
        action: 'Itemize if deductions exceed standard'
      });
    }

    if (eventType === 'marriage') {
      const jointTax = calculateTax((current + spouse) - 30000, 'married_joint');
      const separateTax = currentTax + calculateTax(spouse - 15000, 'married_separate');
      impacts.push({
        item: 'Marriage Tax Impact',
        impact: jointTax - separateTax,
        action: jointTax < separateTax ? 'File jointly for savings' : 'Evaluate both options'
      });
    }

    // Calculate refund/owed change
    const currentRefundOwed = 0; // Assume balanced withholding
    const newRefundOwed = incomeChange > 0 ? -taxChange : Math.abs(taxChange);

    return {
      incomeChange,
      taxChange,
      withholdingChange,
      withholdingNeeded,
      impacts,
      isIncrease,
      newTaxable,
      currentTaxable,
      currentTax,
      newTax,
      filingStatusChange: eventType === 'marriage'
    };
  }, [eventType, currentIncome, newIncome, eventDate, filingStatus, hasSpouseIncome, spouseIncome, ownHome, hasDependents, dependentCount]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Event Impact Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate tax implications of major life events</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Life Event</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="job_change">Job Change / Promotion</option>
              <option value="marriage">Marriage</option>
              <option value="divorce">Divorce</option>
              <option value="new_child">New Child</option>
              <option value="home_purchase">Home Purchase</option>
              <option value="retirement">Retirement</option>
              <option value="side_income">Started Side Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Annual Income ($)</label>
            <input
              type="number"
              value={currentIncome}
              onChange={(e) => setCurrentIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="80000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Income After Event ($)</label>
            <input
              type="number"
              value={newIncome}
              onChange={(e) => setNewIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="single">Single</option>
              <option value="married_joint">Married Filing Jointly</option>
              <option value="married_separate">Married Filing Separately</option>
              <option value="head_household">Head of Household</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Other Factors</h3>
          {eventType === 'marriage' && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={hasSpouseIncome}
                  onChange={(e) => setHasSpouseIncome(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span className="text-gray-700">Spouse has income</span>
              </div>
              {hasSpouseIncome && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Income ($)</label>
                  <input
                    type="number"
                    value={spouseIncome}
                    onChange={(e) => setSpouseIncome(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="60000"
                  />
                </div>
              )}
            </div>
          )}

          {eventType === 'new_child' && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasDependents}
                onChange={(e) => setHasDependents(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Add dependent</span>
            </div>
          )}

          {eventType === 'home_purchase' && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={ownHome}
                onChange={(e) => setOwnHome(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Own home (mortgage interest)</span>
            </div>
          )}

          {hasDependents && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Dependents</label>
              <input
                type="number"
                value={dependentCount}
                onChange={(e) => setDependentCount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1"
              />
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className={`mt-6 p-6 ${result.isIncrease ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'} border rounded-lg`}>
          <h3 className="text-xl font-semibold mb-4">Tax Impact Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Income Change</h4>
              <p className={`text-xl font-bold ${result.isIncrease ? 'text-green-700' : 'text-red-700'}`}>
                {result.isIncrease ? '+' : ''}${result.incomeChange.toFixed(0)}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Tax Change</h4>
              <p className={`text-xl font-bold ${result.taxChange > 0 ? 'text-red-700' : 'text-green-700'}`}>
                {result.taxChange > 0 ? '+' : ''}${result.taxChange.toFixed(0)}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Monthly Withholding Adjustment</h4>
              <p className={`text-lg font-bold ${result.withholdingChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                ${Math.abs(result.withholdingChange).toFixed(0)}
                {result.withholdingChange > 0 ? ' more needed' : ' less needed'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Tax Actions Required:</h4>
            {result.impacts.map((impact, i) => (
              <div key={i} className="p-3 bg-white rounded border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{impact.item}</p>
                    <p className="text-sm text-gray-600 mt-1">{impact.action}</p>
                  </div>
                  <p className={`font-bold ${impact.impact > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {impact.impact > 0 ? `+$${impact.impact}` : `-$${Math.abs(impact.impact)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-white rounded border">
            <h4 className="font-medium text-gray-800">Immediate Action</h4>
            <p className="text-gray-700 mt-1">Submit updated W-4 to employer within 10 days of event to adjust withholding</p>
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-800 mb-3">Event-Specific Tax Tips</h3>
        <div className="space-y-3 text-purple-700">
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Job Change</h4>
            <p>Update W-4 immediately. Check 401(k) rollover options. Review stock options timing.</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Marriage</h4>
            <p>Compare joint vs separate filing. Update withholding for combined income. Review benefit elections.</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">New Child</h4>
            <p>Claim Child Tax Credit ($2,000). Update W-4 for dependent credits. Consider childcare credit.</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Home Purchase</h4>
            <p>Mortgage interest deduction. Property tax deduction (SALT limit). First-time buyer credits.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Tax calculations are simplified estimates. Actual impact depends on full tax situation, deductions, credits, and current tax law. Consult tax professional for major life events.</p>
      </div>
    </div>
  );
}