'use client';

import { useState, useMemo } from 'react';

export default function TaxCollectionTimelineCalculator() {
  const [debtAmount, setDebtAmount] = useState<string>('20000');
  const [debtType, setDebtType] = useState<string>('income_tax');
  const [filingDate, setFilingDate] = useState<string>('2024-04-15');
  const [currentStatus, setCurrentStatus] = useState<string>('assessment');
  const [hasResponded, setHasResponded] = useState<boolean>(false);

  const result = useMemo(() => {
    const debt = parseFloat(debtAmount) || 0;
    const filedDate = new Date(filingDate);
    const today = new Date();

    // Calculate timeline phases
    const phases: { name: string; duration: string; description: string; status: string }[] = [];

    // Phase 1: Assessment
    const assessmentDate = new Date(filedDate);
    assessmentDate.setMonth(assessmentDate.getMonth() + 6);
    phases.push({
      name: 'Assessment',
      duration: '6 months from filing',
      description: 'IRS reviews return and determines tax owed',
      status: currentStatus === 'assessment' ? 'current' : 'completed'
    });

    // Phase 2: Billing
    const firstBillDate = new Date(assessmentDate);
    firstBillDate.setDate(firstBillDate.getDate() + 30);
    phases.push({
      name: 'First Billing Notice',
      duration: '30 days after assessment',
      description: 'CP14 - Balance due notice sent',
      status: currentStatus === 'billing' ? 'current' : currentStatus === 'assessment' ? 'pending' : 'completed'
    });

    // Phase 3: Second Notice
    const secondBillDate = new Date(firstBillDate);
    secondBillDate.setDate(secondBillDate.getDate() + 30);
    phases.push({
      name: 'Second Billing Notice',
      duration: '60 days after first bill',
      description: 'CP501 - Reminder notice sent',
      status: currentStatus === 'second_notice' ? 'current' : ['assessment', 'billing'].includes(currentStatus) ? 'pending' : 'completed'
    });

    // Phase 4: Final Notice
    const finalNoticeDate = new Date(secondBillDate);
    finalNoticeDate.setDate(finalNoticeDate.getDate() + 30);
    phases.push({
      name: 'Final Notice Before Levy',
      duration: '90 days after first bill',
      description: 'CP504/LT11 - Intent to levy notice',
      status: currentStatus === 'final_notice' ? 'current' : ['assessment', 'billing', 'second_notice'].includes(currentStatus) ? 'pending' : 'completed'
    });

    // Phase 5: Levy Action
    const levyDate = new Date(finalNoticeDate);
    levyDate.setDate(levyDate.getDate() + 30);
    phases.push({
      name: 'Levy Action',
      duration: '30 days after final notice',
      description: 'Bank levy, wage garnishment begins',
      status: currentStatus === 'levy' ? 'current' : ['assessment', 'billing', 'second_notice', 'final_notice'].includes(currentStatus) ? 'pending' : 'completed'
    });

    // Phase 6: Lien Filing
    phases.push({
      name: 'Tax Lien Filing',
      duration: 'After debt exceeds threshold',
      description: 'Federal tax lien filed publicly',
      status: debt > 10000 && ['levy', 'lien'].includes(currentStatus) ? 'current' : 'pending'
    });

    // Calculate statute of limitations
    const assessmentStatute = new Date(assessmentDate);
    assessmentStatute.setFullYear(assessmentStatute.getFullYear() + 10);
    const collectionStatute = new Date(assessmentDate);
    collectionStatute.setFullYear(collectionStatute.getFullYear() + 10);

    // Days remaining estimates
    const getCurrentPhaseDaysRemaining = () => {
      if (currentStatus === 'assessment') return Math.ceil((assessmentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (currentStatus === 'billing') return 30;
      if (currentStatus === 'second_notice') return 30;
      if (currentStatus === 'final_notice') return 30;
      return 0;
    };

    // Action recommendations
    let recommendations: string[] = [];
    if (!hasResponded) {
      if (currentStatus === 'billing') {
        recommendations.push('Respond immediately - request payment plan or dispute');
      } else if (currentStatus === 'second_notice') {
        recommendations.push('Contact IRS now - deadline approaching');
      } else if (currentStatus === 'final_notice') {
        recommendations.push('Request CDP hearing within 30 days - critical!');
      } else if (currentStatus === 'levy') {
        recommendations.push('Urgent: Contact IRS or tax professional immediately');
      }
    }

    if (debt > 50000) {
      recommendations.push('Large debt - consider Offer in Compromise');
    }

    return {
      phases,
      assessmentStatute,
      collectionStatute,
      currentPhaseDaysRemaining: getCurrentPhaseDaysRemaining(),
      recommendations
    };
  }, [debtAmount, debtType, filingDate, currentStatus, hasResponded]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Collection Timeline Calculator</h1>
      <p className="text-gray-600 mb-6">Understand IRS collection phases and plan your response</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Debt Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Debt Amount ($)</label>
            <input
              type="number"
              value={debtAmount}
              onChange={(e) => setDebtAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="20000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Debt Type</label>
            <select
              value={debtType}
              onChange={(e) => setDebtType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="income_tax">Income Tax</option>
              <option value="payroll_tax">Payroll Tax</option>
              <option value="business_tax">Business Tax</option>
              <option value="penalty">Penalties/Interest</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Filing Date</label>
            <input
              type="date"
              value={filingDate}
              onChange={(e) => setFilingDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Current Status</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Collection Phase</label>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="assessment">Assessment (Return filed)</option>
              <option value="billing">First Bill Received (CP14)</option>
              <option value="second_notice">Second Notice (CP501)</option>
              <option value="final_notice">Final Notice (CP504/LT11)</option>
              <option value="levy">Levy/Garnishment Active</option>
              <option value="lien">Lien Filed</option>
            </select>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              checked={hasResponded}
              onChange={(e) => setHasResponded(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Have responded to IRS notices</span>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Collection Timeline</h3>

          {result.phases.map((phase, i) => (
            <div key={i} className={`p-3 mb-2 rounded border ${phase.status === 'current' ? 'bg-orange-50 border-orange-300' : phase.status === 'completed' ? 'bg-green-50 border-green-300' : 'bg-white'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-medium ${phase.status === 'current' ? 'text-orange-800' : ''}`}>{phase.name}</h4>
                  <p className="text-sm text-gray-600">{phase.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{phase.duration}</p>
                  <span className={`px-2 py-1 rounded text-xs ${phase.status === 'current' ? 'bg-orange-200 text-orange-800' : phase.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {phase.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 p-3 bg-white rounded border">
            <h4 className="font-medium text-gray-800">Collection Statute Expiration Date (CSED)</h4>
            <p className="text-gray-700">{result.collectionStatute.toLocaleDateString()} (10 years from assessment)</p>
          </div>
        </div>
      )}

      {result && result.recommendations.length > 0 && (
        <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-3">Critical Actions</h3>
          <ul className="space-y-2 text-red-700">
            {result.recommendations.map((rec, i) => <li key={i}>• {rec}</li>)}
          </ul>
        </div>
      )}

      <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-3">Response Options by Phase</h3>
        <div className="space-y-3 text-green-700">
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">First Bill (CP14)</h4>
            <p>Pay in full, request installment agreement, or dispute if error</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Second Notice (CP501)</h4>
            <p>Same options + penalty abatement request</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Final Notice (CP504/LT11)</h4>
            <p>Request CDP hearing within 30 days - critical deadline</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Levy Active</h4>
            <p>Contact IRS immediately, request levy release, may need professional help</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Collection timeline varies based on IRS processing and your responses. Timely action at each phase prevents escalation. CDP hearing requests stop levy action temporarily.</p>
      </div>
    </div>
  );
}