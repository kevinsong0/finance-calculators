'use client';

import { useState, useMemo } from 'react';

export default function TaxPenaltyReliefCalculator() {
  const [penaltyType, setPenaltyType] = useState<string>('failure_to_file');
  const [penaltyAmount, setPenaltyAmount] = useState<string>('500');
  const [taxDue, setTaxDue] = useState<string>('10000');
  const [lateDays, setLateDays] = useState<string>('30');
  const [hasReasonableCause, setHasReasonableCause] = useState<boolean>(false);
  const [cleanHistoryYears, setCleanHistoryYears] = useState<string>('3');
  const [firstTimePenalty, setFirstTimePenalty] = useState<boolean>(true);
  const [circumstanceType, setCircumstanceType] = useState<string>('none');

  const result = useMemo(() => {
    const penalty = parseFloat(penaltyAmount) || 0;
    const tax = parseFloat(taxDue) || 0;
    const days = parseInt(lateDays) || 0;
    const cleanYears = parseInt(cleanHistoryYears) || 0;

    // Calculate potential relief options
    const reliefOptions: { type: string; eligible: boolean; reliefAmount: number; description: string }[] = [];

    // First-Time Penalty Abatement (FTA)
    const ftaEligible = firstTimePenalty && cleanYears >= 3 && penaltyType !== 'accuracy_related';
    reliefOptions.push({
      type: 'First-Time Abatement',
      eligible: ftaEligible,
      reliefAmount: ftaEligible ? penalty : 0,
      description: 'One-time relief for taxpayers with clean 3-year compliance history'
    });

    // Reasonable Cause Relief
    const rcEligible = hasReasonableCause && ['medical', 'death', 'disaster', 'unable_to_obtain_records', 'unavoidable_absence'].includes(circumstanceType);
    let rcReliefPercent = 0;
    if (rcEligible) {
      if (['medical', 'death', 'disaster'].includes(circumstanceType)) {
        rcReliefPercent = 100;
      } else if (['unable_to_obtain_records', 'unavoidable_absence'].includes(circumstanceType)) {
        rcReliefPercent = 80;
      }
    }
    reliefOptions.push({
      type: 'Reasonable Cause',
      eligible: rcEligible,
      reliefAmount: penalty * (rcReliefPercent / 100),
      description: 'Full or partial relief due to circumstances beyond control'
    });

    // Statutory Exception
    const statException = penaltyType === 'failure_to_pay' && days <= 10 && tax === 0;
    reliefOptions.push({
      type: 'Statutory Exception',
      eligible: statException,
      reliefAmount: statException ? penalty : 0,
      description: '10-day grace period for failure-to-pay when no tax due'
    });

    // Calculate total potential relief
    const maxRelief = Math.max(...reliefOptions.filter(o => o.eligible).map(o => o.reliefAmount));
    const bestOption = reliefOptions.find(o => o.eligible && o.reliefAmount === maxRelief);

    // Penalty calculation details
    let calculatedPenalty = 0;
    let penaltyRate = '';
    if (penaltyType === 'failure_to_file') {
      calculatedPenalty = tax * 0.05 * Math.min(Math.ceil(days / 30), 5);
      penaltyRate = '5% per month, max 25%';
    } else if (penaltyType === 'failure_to_pay') {
      calculatedPenalty = tax * 0.005 * Math.min(Math.ceil(days / 30), 25);
      penaltyRate = '0.5% per month, max 25%';
    } else if (penaltyType === 'accuracy_related') {
      calculatedPenalty = tax * 0.20;
      penaltyRate = '20% of underpayment';
    } else if (penaltyType === 'fraud') {
      calculatedPenalty = tax * 0.75;
      penaltyRate = '75% of underpayment';
    }

    return {
      reliefOptions,
      bestOption,
      maxRelief,
      remainingPenalty: penalty - maxRelief,
      calculatedPenalty,
      penaltyRate,
      cleanYears,
      ftaEligible,
      rcEligible
    };
  }, [penaltyType, penaltyAmount, taxDue, lateDays, hasReasonableCause, cleanHistoryYears, firstTimePenalty, circumstanceType]);

  const getCircumstanceDescription = (type: string) => {
    const descriptions: Record<string, string> = {
      'medical': 'Serious illness, hospitalization, or medical emergency',
      'death': 'Death of taxpayer or immediate family member',
      'disaster': 'Natural disaster, fire, casualty event',
      'unable_to_obtain_records': 'Unable to obtain necessary records',
      'unavoidable_absence': 'Extended unavoidable absence',
      'none': 'No specific reasonable cause circumstance'
    };
    return descriptions[type] || '';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Penalty Relief Calculator</h1>
      <p className="text-gray-600 mb-6">Evaluate eligibility for IRS penalty abatement options</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Penalty Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Penalty Type</label>
            <select
              value={penaltyType}
              onChange={(e) => setPenaltyType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="failure_to_file">Failure to File (FTF)</option>
              <option value="failure_to_pay">Failure to Pay (FTP)</option>
              <option value="accuracy_related">Accuracy-Related Penalty</option>
              <option value="fraud">Fraud Penalty</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Penalty Amount ($)</label>
            <input
              type="number"
              value={penaltyAmount}
              onChange={(e) => setPenaltyAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Due/Underpayment ($)</label>
            <input
              type="number"
              value={taxDue}
              onChange={(e) => setTaxDue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Days Late</label>
            <input
              type="number"
              value={lateDays}
              onChange={(e) => setLateDays(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="30"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Relief Qualifications</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clean Compliance History (years)</label>
            <input
              type="number"
              value={cleanHistoryYears}
              onChange={(e) => setCleanHistoryYears(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
              min="0"
              max="10"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={firstTimePenalty}
              onChange={(e) => setFirstTimePenalty(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">First-time penalty for this type</span>
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

          {hasReasonableCause && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Circumstance Type</label>
              <select
                value={circumstanceType}
                onChange={(e) => setCircumstanceType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">None selected</option>
                <option value="medical">Medical emergency/illness</option>
                <option value="death">Death in family</option>
                <option value="disaster">Natural disaster</option>
                <option value="unable_to_obtain_records">Unable to obtain records</option>
                <option value="unavoidable_absence">Unavoidable absence</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Relief Assessment Results</h3>

          {result.bestOption ? (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800">Best Available Relief: {result.bestOption.type}</h4>
              <p className="text-green-700 text-2xl font-bold mt-1">${result.maxRelief.toFixed(2)} relief</p>
              <p className="text-gray-600 mt-1">{result.bestOption.description}</p>
            </div>
          ) : (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-700">No relief options currently eligible. Consider improving compliance history or documenting reasonable cause.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-4 text-gray-700">
            <div>
              <h4 className="font-medium">Remaining Penalty</h4>
              <p className="text-xl font-bold">${result.remainingPenalty.toFixed(2)}</p>
            </div>
            <div>
              <h4 className="font-medium">Calculated Penalty Rate</h4>
              <p className="text-lg">{result.penaltyRate}</p>
            </div>
          </div>

          <div className="space-y-2">
            {result.reliefOptions.map((opt, i) => (
              <div key={i} className={`p-3 rounded border ${opt.eligible ? 'bg-white border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex justify-between">
                  <span className="font-medium">{opt.type}</span>
                  <span className={`text-sm ${opt.eligible ? 'text-green-600' : 'text-gray-500'}`}>
                    {opt.eligible ? `$${opt.reliefAmount.toFixed(2)} relief` : 'Not eligible'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{opt.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Penalty Relief Types</h3>
        <div className="space-y-3 text-blue-700">
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">First-Time Abatement (FTA)</h4>
            <p>Requires: 3 years clean history, filed all returns, paid/no balance due. One-time per penalty type.</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Reasonable Cause Relief</h4>
            <p>Circumstances beyond your control: illness, death, disaster, fire, casualty. Must document circumstances.</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Statutory Exception</h4>
            <p>10-day grace for FTP when reasonable cause. Specific statutory provisions may apply.</p>
          </div>
        </div>
      </div>

      {hasReasonableCause && circumstanceType !== 'none' && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-medium text-purple-800 mb-2">Reasonable Cause Documentation</h4>
          <p className="text-purple-700">{getCircumstanceDescription(circumstanceType)}</p>
          <p className="text-sm text-purple-600 mt-2">Provide supporting documents: medical records, death certificate, FEMA documentation, etc.</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Penalty relief is discretionary. IRS evaluates each request individually. Accuracy-related and fraud penalties generally not eligible for FTA. Submit relief request with Form 843 or correspondence.</p>
      </div>
    </div>
  );
}