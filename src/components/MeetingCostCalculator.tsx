'use client'

import { useState } from 'react';

export default function MeetingCostCalculator() {
  const [duration, setDuration] = useState('60');
  const [participants, setParticipants] = useState([{ salary: '100000', count: '3' }]);
  const [result, setResult] = useState<{ total: number; perMinute: number; breakdown: string[] } | null>(null);

  const addParticipantGroup = () => {
    setParticipants([...participants, { salary: '', count: '' }]);
  };

  const removeParticipantGroup = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const updateParticipant = (index: number, field: 'salary' | 'count', value: string) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const calculateCost = () => {
    const durationMinutes = parseFloat(duration) || 0;
    let totalCost = 0;
    const breakdownList: string[] = [];

    participants.forEach((p, i) => {
      const salary = parseFloat(p.salary) || 0;
      const count = parseInt(p.count) || 0;
      // Annual salary to hourly rate: salary / (52 weeks * 40 hours)
      const hourlyRate = salary / (52 * 40);
      // Cost for this group: hourly rate * duration hours * count
      const groupCost = hourlyRate * (durationMinutes / 60) * count;
      totalCost += groupCost;
      breakdownList.push(`Group ${i + 1}: ${count} people at $${salary.toLocaleString()}/year = $${groupCost.toFixed(2)}`);
    });

    const perMinuteCost = totalCost / durationMinutes;
    setResult({ total: totalCost, perMinute: perMinuteCost, breakdown: breakdownList });
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Meeting Cost Calculator</h1>
      <p className="text-zinc-600">Calculate the real cost of meetings based on participant salaries. See how much time and money meetings consume. Make meetings more efficient.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Meeting Duration</h3>
        <div className="flex gap-4 items-center">
          <input type="number" className="w-24 p-2 border rounded" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <span className="text-zinc-600">minutes</span>
        </div>
        <div className="flex gap-2 mt-2">
          <button onClick={() => setDuration('15')} className="btn-secondary text-xs">15 min</button>
          <button onClick={() => setDuration('30')} className="btn-secondary text-xs">30 min</button>
          <button onClick={() => setDuration('60')} className="btn-secondary text-xs">60 min</button>
          <button onClick={() => setDuration('90')} className="btn-secondary text-xs">90 min</button>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Participants by Salary Group</h3>
        {participants.map((p, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 mb-2">
            <div>
              <label className="text-sm text-zinc-600">Avg Salary ($/year)</label>
              <input type="number" className="w-full p-2 border rounded" value={p.salary} onChange={(e) => updateParticipant(i, 'salary', e.target.value)} placeholder="100000" />
            </div>
            <div>
              <label className="text-sm text-zinc-600">Number of People</label>
              <input type="number" className="w-full p-2 border rounded" value={p.count} onChange={(e) => updateParticipant(i, 'count', e.target.value)} placeholder="3" />
            </div>
            <div className="flex items-end">
              {participants.length > 1 && (
                <button onClick={() => removeParticipantGroup(i)} className="btn-secondary text-xs">Remove</button>
              )}
            </div>
          </div>
        ))}
        <button onClick={addParticipantGroup} className="btn-secondary text-xs mt-2">Add Group</button>
      </div>

      <button onClick={calculateCost} className="btn-primary w-full">Calculate Meeting Cost</button>

      {result && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Meeting Cost</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded p-3">
              <div className="text-3xl font-bold text-red-600">${result.total.toFixed(2)}</div>
              <div className="text-xs text-zinc-500">Total Cost</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold">${result.perMinute.toFixed(2)}</div>
              <div className="text-xs text-zinc-500">Per Minute</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold">${(result.total * 52).toFixed(0)}</div>
              <div className="text-xs text-zinc-500">If Weekly</div>
            </div>
          </div>
          <div className="mt-4 text-xs text-zinc-600">
            <strong>Breakdown:</strong>
            {result.breakdown.map((b, i) => (
              <div key={i} className="ml-2">{b}</div>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Cost Comparison</h3>
          <div className="text-xs text-zinc-600">
            ${result.total.toFixed(2)} could buy: {(result.total / 20).toFixed(0)} coffees, {(result.total / 15).toFixed(0)} lunches, {(result.total / 50).toFixed(0)} software licenses. Weekly meeting: ${(result.total * 52).toFixed(0)}/year. Monthly meeting: ${(result.total * 12).toFixed(0)}/year. Consider: is the meeting worth this cost?
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tips to Reduce Meeting Costs</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">Shorter duration: 30 min instead of 60</div>
          <div className="bg-white rounded p-2">Fewer participants: only essential people</div>
          <div className="bg-white rounded p-2">Async alternatives: email, Slack, docs</div>
          <div className="bg-white rounded p-2">Clear agenda: stay focused, end early</div>
          <div className="bg-white rounded p-2">No recurring: cancel if not needed</div>
          <div className="bg-white rounded p-2">Stand-ups: quick updates, not discussions</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">How Costs Are Calculated</h3>
        <div className="text-xs text-zinc-600">
          Hourly rate = Annual salary / (52 weeks × 40 hours). Meeting cost = Hourly rate × (Duration / 60) × Participants. Example: $100k salary = $48/hr. 5 people for 1 hour = $240. Includes overhead costs: prep time, context switching loss.
        </div>
      </div>
    </main>
  );
}