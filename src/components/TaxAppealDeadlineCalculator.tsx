'use client';

import { useState, useMemo } from 'react';

export default function TaxAppealDeadlineCalculator() {
  const [noticeType, setNoticeType] = useState<string>('cp2000');
  const [noticeDate, setNoticeDate] = useState<string>('');
  const [disputeAmount, setDisputeAmount] = useState<string>('5000');
  const [wantTaxCourt, setWantTaxCourt] = useState<boolean>(false);
  const [wantAppeals, setWantAppeals] = useState<boolean>(true);
  const [wantCollectionAppeal, setWantCollectionAppeal] = useState<boolean>(false);

  const result = useMemo(() => {
    if (!noticeDate) {
      return null;
    }

    const date = new Date(noticeDate);
    const amount = parseFloat(disputeAmount) || 0;

    // Calculate deadlines based on notice type
    let appealDeadline = new Date(date);
    let taxCourtDeadline = new Date(date);
    let collectionDeadline = new Date(date);
    let cdpDeadline = new Date(date);

    const deadlines: { name: string; date: Date; days: number; description: string }[] = [];

    // CP2000 - 30 days for response, 90 days for Tax Court if notice of deficiency
    if (noticeType === 'cp2000') {
      appealDeadline.setDate(date.getDate() + 30);
      deadlines.push({
        name: 'Response Deadline',
        date: appealDeadline,
        days: 30,
        description: 'Submit written response to proposed adjustment'
      });

      // If deficiency notice attached
      taxCourtDeadline.setDate(date.getDate() + 90);
      deadlines.push({
        name: 'Tax Court Petition',
        date: taxCourtDeadline,
        days: 90,
        description: 'File petition with Tax Court (if deficiency notice)'
      });
    }

    // CP504 - 30 days before levy
    if (noticeType === 'cp504') {
      appealDeadline.setDate(date.getDate() + 30);
      deadlines.push({
        name: 'Levy Prevention',
        date: appealDeadline,
        days: 30,
        description: 'Pay or appeal before levy action'
      });

      cdpDeadline.setDate(date.getDate() + 30);
      deadlines.push({
        name: 'CDP Hearing Request',
        date: cdpDeadline,
        days: 30,
        description: 'Request Collection Due Process hearing'
      });
    }

    // LT11 - Final notice before levy, 30 days
    if (noticeType === 'lt11') {
      cdpDeadline.setDate(date.getDate() + 30);
      deadlines.push({
        name: 'CDP Hearing Deadline',
        date: cdpDeadline,
        days: 30,
        description: 'Critical: Request CDP hearing or levy proceeds'
      });
    }

    // Audit report - 30 days for Appeals, 90 days for Tax Court
    if (noticeType === 'audit_report') {
      appealDeadline.setDate(date.getDate() + 30);
      deadlines.push({
        name: 'Appeals Request',
        date: appealDeadline,
        days: 30,
        description: 'Request Office of Appeals review'
      });

      taxCourtDeadline.setDate(date.getDate() + 90);
      deadlines.push({
        name: 'Tax Court Petition',
        date: taxCourtDeadline,
        days: 90,
        description: 'File petition within 90 days of deficiency notice'
      });
    }

    // Penalty notice - 30 days
    if (noticeType === 'penalty_notice') {
      appealDeadline.setDate(date.getDate() + 30);
      deadlines.push({
        name: 'Penalty Appeal',
        date: appealDeadline,
        days: 30,
        description: 'Request penalty abatement or appeal'
      });
    }

    // Calculate days remaining from today
    const today = new Date();
    const processedDeadlines = deadlines.map(d => ({
      ...d,
      daysRemaining: Math.ceil((d.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
      status: d.date > today ? 'active' : 'expired'
    }));

    // Urgency level
    const minDaysRemaining = Math.min(...processedDeadlines.map(d => d.daysRemaining));
    let urgencyLevel = 'normal';
    if (minDaysRemaining <= 10) urgencyLevel = 'critical';
    else if (minDaysRemaining <= 20) urgencyLevel = 'urgent';
    else if (minDaysRemaining <= 30) urgencyLevel = 'moderate';

    return {
      deadlines: processedDeadlines,
      urgencyLevel,
      minDaysRemaining,
      taxCourtEligible: amount > 0
    };
  }, [noticeType, noticeDate, disputeAmount]);

  const getUrgencyColor = (level: string) => {
    if (level === 'critical') return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
    if (level === 'urgent') return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' };
    if (level === 'moderate') return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' };
    return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
  };

  const colors = result ? getUrgencyColor(result.urgencyLevel) : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Appeal Deadline Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate critical deadlines for IRS appeals and responses</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notice Type</label>
            <select
              value={noticeType}
              onChange={(e) => setNoticeType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="cp2000">CP2000 (Underreporter Notice)</option>
              <option value="cp504">CP504 (Balance Due Notice)</option>
              <option value="lt11">LT11 (Final Notice Before Levy)</option>
              <option value="audit_report">Audit Report/Deficiency Notice</option>
              <option value="penalty_notice">Penalty Assessment Notice</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notice Date</label>
            <input
              type="date"
              value={noticeDate}
              onChange={(e) => setNoticeDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Disputed Amount ($)</label>
            <input
              type="number"
              value={disputeAmount}
              onChange={(e) => setDisputeAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Appeal Options Considered</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={wantAppeals}
                onChange={(e) => setWantAppeals(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Office of Appeals</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={wantTaxCourt}
                onChange={(e) => setWantTaxCourt(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Tax Court petition</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={wantCollectionAppeal}
                onChange={(e) => setWantCollectionAppeal(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Collection Due Process (CDP)</span>
            </div>
          </div>
        </div>
      </div>

      {result && colors && (
        <div className={`mt-6 p-6 ${colors.bg} ${colors.border} border rounded-lg`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Your Deadlines</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>
              {result.urgencyLevel.toUpperCase()}
            </span>
          </div>

          {result.deadlines.map((deadline, i) => (
            <div key={i} className={`p-4 mb-3 rounded-lg ${deadline.status === 'expired' ? 'bg-gray-100' : 'bg-white'} border`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">{deadline.name}</h4>
                  <p className="text-sm text-gray-600">{deadline.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    {deadline.status === 'expired' ? 'EXPIRED' : `${deadline.daysRemaining} days`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {deadline.date.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {result.minDaysRemaining <= 0 && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-800 font-medium">⚠️ Some deadlines have passed. Contact a tax professional immediately.</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-800 mb-3">Deadline Rules Reference</h3>
        <ul className="space-y-2 text-purple-700">
          <li>• CP2000: 30 days to respond, 90 days for Tax Court if deficiency notice</li>
          <li>• CP504/LT11: 30 days to request CDP hearing before levy</li>
          <li>• Audit Report: 30 days for Appeals, 90 days for Tax Court</li>
          <li>• Penalty Notice: 30 days to request abatement or appeal</li>
          <li>• Missing deadlines = automatic adjustment + collection action</li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Deadlines are calculated from notice date shown. IRS mailing delays may affect actual deadline. Verify actual deadline from your notice documents.</p>
      </div>
    </div>
  );
}