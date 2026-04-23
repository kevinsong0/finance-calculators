'use client';

import { useState, useMemo } from 'react';

export default function TaxInterestAbatementCalculator() {
  const [interestAmount, setInterestAmount] = useState<string>('2000');
  const [taxDebt, setTaxDebt] = useState<string>('15000');
  const [debtStartDate, setDebtStartDate] = useState<string>('2024-04-15');
  const [paymentDate, setPaymentDate] = useState<string>('2024-12-15');
  const [interestRate, setInterestRate] = useState<string>('8');
  const [hasReasonableCause, setHasReasonableCause] = useState<boolean>(false);
  const [isGovernmentError, setIsGovernmentError] = useState<boolean>(false);
  const [hasMilitaryService, setHasMilitaryService] = useState<boolean>(false);
  const [isDisasterArea, setIsDisasterArea] = useState<boolean>(false);
  const [circumstanceType, setCircumstanceType] = useState<string>('none');

  const result = useMemo(() => {
    const interest = parseFloat(interestAmount) || 0;
    const debt = parseFloat(taxDebt) || 0;
    const rate = parseFloat(interestRate) || 8;

    const start = new Date(debtStartDate);
    const payment = new Date(paymentDate);
    const monthsDiff = Math.ceil((payment.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));

    // Calculate theoretical interest
    const theoreticalInterest = debt * (rate / 100) * (monthsDiff / 12);

    // Evaluate abatement options - Note: Interest abatement is very limited
    const abatementOptions: { type: string; eligible: boolean; abatementAmount: number; description: string }[] = [];

    // Interest abatement is generally NOT available except in specific cases
    // 1. IRS error/delay (very rare)
    abatementOptions.push({
      type: 'IRS Administrative Error',
      eligible: isGovernmentError,
      abatementAmount: isGovernmentError ? interest : 0,
      description: 'Interest caused by IRS error or unreasonable delay (rare)'
    });

    // 2. Military service deferment
    abatementOptions.push({
      type: 'Military Service Relief',
      eligible: hasMilitaryService,
      abatementAmount: hasMilitaryService ? interest * 0.5 : 0,
      description: 'Partial relief for active military service members'
    });

    // 3. Disaster area extension
    abatementOptions.push({
      type: 'Disaster Relief Extension',
      eligible: isDisasterArea,
      abatementAmount: isDisasterArea ? interest * 0.3 : 0,
      description: 'Interest suspension during declared disaster period'
    });

    // Reasonable cause does NOT apply to interest
    abatementOptions.push({
      type: 'Reasonable Cause (Interest)',
      eligible: false,
      abatementAmount: 0,
      description: 'NOT applicable to interest - only penalties'
    });

    const maxAbatement = Math.max(...abatementOptions.filter(o => o.eligible).map(o => o.abatementAmount));
    const bestOption = abatementOptions.find(o => o.eligible && o.abatementAmount === maxAbatement);

    // Calculate remaining amounts
    const remainingInterest = interest - maxAbatement;
    const totalDebtWithInterest = debt + remainingInterest;

    return {
      abatementOptions,
      bestOption,
      maxAbatement,
      remainingInterest,
      totalDebtWithInterest,
      theoreticalInterest,
      monthsDiff,
      rate,
      hasAbatementOptions: maxAbatement > 0
    };
  }, [interestAmount, taxDebt, debtStartDate, paymentDate, interestRate, hasReasonableCause, isGovernmentError, hasMilitaryService, isDisasterArea, circumstanceType]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Interest Abatement Calculator</h1>
      <p className="text-gray-600 mb-6">Evaluate limited options for IRS interest reduction</p>

      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 font-medium">⚠️ Important: Interest abatement is extremely limited. Unlike penalties, reasonable cause does NOT apply to interest. Only specific statutory exceptions may qualify.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Interest Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Charged ($)</label>
            <input
              type="number"
              value={interestAmount}
              onChange={(e) => setInterestAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Debt Amount ($)</label>
            <input
              type="number"
              value={taxDebt}
              onChange={(e) => setTaxDebt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="15000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Debt Start Date</label>
            <input
              type="date"
              value={debtStartDate}
              onChange={(e) => setDebtStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment/Resolution Date</label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">IRS Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="8"
              step="0.5"
            />
            <p className="text-sm text-gray-500 mt-1">Current rate ~8% (changes quarterly)</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Abatement Qualifications</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isGovernmentError}
                onChange={(e) => setIsGovernmentError(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">IRS administrative error caused delay</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasMilitaryService}
                onChange={(e) => setHasMilitaryService(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Active military service member</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isDisasterArea}
                onChange={(e) => setIsDisasterArea(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Located in declared disaster area</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasReasonableCause}
                onChange={(e) => setHasReasonableCause(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Have reasonable cause circumstances</span>
            </div>
          </div>

          {hasReasonableCause && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-700 text-sm">Note: Reasonable cause does NOT qualify for interest abatement - only for penalty relief.</p>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Interest Abatement Assessment</h3>

          {!result.hasAbatementOptions ? (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">No abatement options currently eligible. Interest generally cannot be reduced except in very specific circumstances.</p>
              <p className="text-red-600 mt-2">Unlike penalties, interest is mandatory by statute and compensates the government for the time value of money.</p>
            </div>
          ) : (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800">Best Available Relief: {result.bestOption?.type}</h4>
              <p className="text-orange-700 text-2xl font-bold mt-1">${result.maxAbatement.toFixed(2)} abatement</p>
              <p className="text-gray-600 mt-1">{result.bestOption?.description}</p>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-4 mb-4 text-gray-700">
            <div>
              <h4 className="font-medium">Remaining Interest</h4>
              <p className="text-xl font-bold">${result.remainingInterest.toFixed(2)}</p>
            </div>
            <div>
              <h4 className="font-medium">Total Debt + Interest</h4>
              <p className="text-xl font-bold">${result.totalDebtWithInterest.toFixed(2)}</p>
            </div>
            <div>
              <h4 className="font-medium">Interest Period</h4>
              <p className="text-lg">{result.monthsDiff} months</p>
            </div>
          </div>

          <div className="space-y-2">
            {result.abatementOptions.map((opt, i) => (
              <div key={i} className={`p-3 rounded border ${opt.eligible ? 'bg-white border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex justify-between">
                  <span className="font-medium">{opt.type}</span>
                  <span className={`text-sm ${opt.eligible ? 'text-orange-600' : 'text-gray-500'}`}>
                    {opt.eligible ? `$${opt.abatementAmount.toFixed(2)}` : 'Not eligible'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{opt.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Interest vs Penalty Abatement</h3>
        <div className="space-y-3 text-blue-700">
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Penalties</h4>
            <p>May be abated with reasonable cause, first-time abatement, or statutory exceptions.</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Interest</h4>
            <p>Generally NOT abatable. Only reduced for IRS errors, military service, or disaster extensions in specific cases.</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Key Difference</h4>
            <p>Interest compensates government for time value of money - not a penalty. Statutory requirement, not discretionary.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Interest abatement requests require Form 843 or written correspondence. IRS rarely grants interest abatement unless clear administrative error is documented. Consider paying interest to stop further accrual while disputing penalties.</p>
      </div>
    </div>
  );
}