'use client'

import { useState, useMemo } from 'react';

export default function DateCalculator() {
  const [mode, setMode] = useState('difference');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [baseDate, setBaseDate] = useState('');
  const [daysToAdd, setDaysToAdd] = useState(0);
  const [targetDate, setTargetDate] = useState('');

  const result = useMemo(() => {
    if (mode === 'difference' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffWeeks = Math.floor(diffDays / 7);
      const diffMonths = Math.floor(diffDays / 30);
      const diffYears = Math.floor(diffDays / 365);
      return {
        days: diffDays,
        weeks: diffWeeks,
        remainingDays: diffDays - diffWeeks * 7,
        months: diffMonths,
        years: diffYears,
        direction: end > start ? 'after' : 'before',
      };
    }

    if (mode === 'add' && baseDate) {
      const base = new Date(baseDate);
      const resultDate = new Date(base.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
      return {
        resultDate: resultDate.toISOString().split('T')[0],
        formatted: resultDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      };
    }

    if (mode === ' countdown' && targetDate) {
      const now = new Date();
      const target = new Date(targetDate);
      const diffTime = target.getTime() - now.getTime();
      if (diffTime <= 0) {
        return { expired: true };
      }
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      return {
        days: diffDays,
        hours,
        minutes,
        totalHours: Math.floor(diffTime / (1000 * 60 * 60)),
      };
    }

    return null;
  }, [mode, startDate, endDate, baseDate, daysToAdd, targetDate]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Date Calculator</h1>
      <p className="text-zinc-600">Calculate days between dates, add/subtract days, and countdown to events.</p>

      <div className="card space-y-4">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Calculation Mode</label>
          <div className="flex gap-2">
            {[
              { id: 'difference', name: 'Days Between' },
              { id: 'add', name: 'Add/Subtract Days' },
              { id: 'countdown', name: 'Countdown' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-4 py-2 rounded ${mode === m.id ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Difference Mode */}
        {mode === 'difference' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
                max="2100-12-31"
                min="1900-01-01"
              />
              <button
                onClick={() => setStartDate(today)}
                className="mt-2 px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
              >
                Today
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
                max="2100-12-31"
                min="1900-01-01"
              />
              <button
                onClick={() => setEndDate(today)}
                className="mt-2 px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
              >
                Today
              </button>
            </div>
          </div>
        )}

        {/* Add/Subtract Mode */}
        {mode === 'add' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Base Date</label>
            <input
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="w-full"
              max="2100-12-31"
              min="1900-01-01"
            />
            <button
              onClick={() => setBaseDate(today)}
              className="mt-2 px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
            >
              Today
            </button>
            <div className="mt-4">
              <label className="block text-sm font-medium text-zinc-700 mb-2">Days to Add/Subtract</label>
              <input
                type="number"
                value={daysToAdd}
                onChange={(e) => setDaysToAdd(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex gap-2 mt-2">
                {[7, 14, 30, 90, 365].map((d) => (
                  <button key={d} onClick={() => setDaysToAdd(d)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                    +{d}
                  </button>
                ))}
                <button onClick={() => setDaysToAdd(-daysToAdd || -7)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                  Negate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Countdown Mode */}
        {mode === 'countdown' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full"
              min={today}
            />
            <div className="flex gap-2 mt-2">
              {[7, 30, 90, 180, 365].map((d) => {
                const futureDate = new Date(Date.now() + d * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                return (
                  <button key={d} onClick={() => setTargetDate(futureDate)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                    {d} days
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="card bg-blue-50 text-center p-6">
          {mode === 'difference' && (
            <>
              <div className="text-sm text-zinc-500 mb-2">Days Between</div>
              <div className="text-4xl font-bold text-blue-600">{result.days} days</div>
              <div className="text-sm text-zinc-600 mt-2">
                ≈ {result.years} years, {result.months} months
              </div>
              <div className="text-sm text-zinc-600">
                ≈ {result.weeks} weeks and {result.remainingDays} days
              </div>
              {result.direction === 'before' && (
                <div className="text-xs text-zinc-500 mt-2">End date is before start date</div>
              )}
            </>
          )}

          {mode === 'add' && (
            <>
              <div className="text-sm text-zinc-500 mb-2">Result Date</div>
              <div className="text-4xl font-bold text-blue-600">{result.resultDate}</div>
              <div className="text-sm text-zinc-600 mt-2">{result.formatted}</div>
              <div className="text-xs text-zinc-500 mt-2">
                {daysToAdd > 0 ? `Added ${daysToAdd} days` : `Subtracted ${Math.abs(daysToAdd)} days`}
              </div>
            </>
          )}

          {mode === 'countdown' && (
            <>
              {result.expired ? (
                <div className="text-4xl font-bold text-red-600">Event has passed!</div>
              ) : (
                <>
                  <div className="text-sm text-zinc-500 mb-2">Time Remaining</div>
                  <div className="text-4xl font-bold text-blue-600">{result.days} days</div>
                  <div className="text-sm text-zinc-600 mt-2">
                    {result.hours} hours, {result.minutes} minutes
                  </div>
                  <div className="text-xs text-zinc-500 mt-2">
                    Total: {(result.totalHours ?? 0).toLocaleString()} hours
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* Quick Reference */}
      <div className="card">
        <h3 className="font-medium mb-2">Common Date Calculations</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">1 Week</div>
            <div className="text-zinc-600">= 7 days</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">1 Month</div>
            <div className="text-zinc-600">≈ 30 days</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">1 Year</div>
            <div className="text-zinc-600">= 365 days</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Leap Year</div>
            <div className="text-zinc-600">= 366 days</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Quarter</div>
            <div className="text-zinc-600">≈ 90 days</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Decade</div>
            <div className="text-zinc-600">= 3,652 days</div>
          </div>
        </div>
      </div>
    </main>
  );
}