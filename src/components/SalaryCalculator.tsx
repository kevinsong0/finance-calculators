'use client'

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalaryCalculator() {
  const [hourlyRate, setHourlyRate] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState(1.5);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [vacationDays, setVacationDays] = useState(10);

  const result = useMemo(() => {
    const regularHours = hoursPerWeek * weeksPerYear - vacationDays * hoursPerWeek / 5;
    const overtimePay = overtimeHours * hourlyRate * overtimeMultiplier * weeksPerYear;
    const regularPay = regularHours * hourlyRate;
    const grossAnnual = regularPay + overtimePay + bonus;
    const grossMonthly = grossAnnual / 12;
    const grossWeekly = grossAnnual / weeksPerYear;
    const grossDaily = grossAnnual / (weeksPerYear * hoursPerWeek / 8);

    const trajectory = [];
    for (let i = 0; i <= 10; i++) {
      trajectory.push({
        year: i,
        annual: grossAnnual * Math.pow(1.03, i), // 3% annual growth
        hourly: hourlyRate * Math.pow(1.03, i),
      });
    }

    return {
      grossAnnual,
      grossMonthly,
      grossWeekly,
      grossDaily,
      regularHours,
      regularPay,
      overtimePay,
      trajectory
    };
  }, [hourlyRate, hoursPerWeek, weeksPerYear, overtimeMultiplier, overtimeHours, bonus, vacationDays]);

  const formatMoney = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Salary Calculator</h1>
      <p className="text-zinc-600">Convert hourly wage to annual salary. Calculate overtime, bonuses, and projected growth.</p>

      <div className="card space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Hourly Rate ($)</label>
            <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} className="w-full" step="0.5" />
            <div className="flex gap-2 mt-2">
              {[15, 20, 25, 30, 50].map((v) => (
                <button key={v} onClick={() => setHourlyRate(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">$${v}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Hours per Week</label>
            <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} className="w-full" />
            <div className="flex gap-2 mt-2">
              {[20, 30, 40, 50].map((v) => (
                <button key={v} onClick={() => setHoursPerWeek(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{v}h</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Weeks per Year</label>
            <input type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(Number(e.target.value))} className="w-full" min="1" max="52" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Vacation Days</label>
            <input type="number" value={vacationDays} onChange={(e) => setVacationDays(Number(e.target.value))} className="w-full" min="0" max="30" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Overtime Hours/Week</label>
            <input type="number" value={overtimeHours} onChange={(e) => setOvertimeHours(Number(e.target.value))} className="w-full" min="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Overtime Multiplier</label>
            <select value={overtimeMultiplier} onChange={(e) => setOvertimeMultiplier(Number(e.target.value))} className="w-full">
              <option value={1.5}>1.5x (Standard)</option>
              <option value={1.75}>1.75x</option>
              <option value={2}>2x (Double)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Annual Bonus ($)</label>
            <input type="number" value={bonus} onChange={(e) => setBonus(Number(e.target.value))} className="w-full" min="0" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card bg-blue-50">
          <div className="text-xs text-zinc-500 mb-1">Annual Salary</div>
          <div className="text-xl font-bold text-blue-600">{formatMoney(result.grossAnnual)}</div>
        </div>
        <div className="card bg-green-50">
          <div className="text-xs text-zinc-500 mb-1">Monthly Pay</div>
          <div className="text-xl font-bold text-green-600">{formatMoney(result.grossMonthly)}</div>
        </div>
        <div className="card bg-purple-50">
          <div className="text-xs text-zinc-500 mb-1">Weekly Pay</div>
          <div className="text-xl font-bold text-purple-600">{formatMoney(result.grossWeekly)}</div>
        </div>
        <div className="card bg-orange-50">
          <div className="text-xs text-zinc-500 mb-1">Daily Pay</div>
          <div className="text-xl font-bold text-orange-600">{formatMoney(result.grossDaily)}</div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="card">
        <h3 className="font-medium mb-3">Salary Breakdown</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-zinc-50 rounded p-2">
            <div className="text-xs text-zinc-500">Regular Pay</div>
            <div className="font-bold">{formatMoney(result.regularPay)}</div>
            <div className="text-xs">{result.regularHours.toFixed(0)} hours</div>
          </div>
          {overtimeHours > 0 && (
            <div className="bg-yellow-50 rounded p-2">
              <div className="text-xs text-zinc-500">Overtime Pay</div>
              <div className="font-bold text-yellow-600">{formatMoney(result.overtimePay)}</div>
              <div className="text-xs">{overtimeHours * weeksPerYear} OT hours</div>
            </div>
          )}
          {bonus > 0 && (
            <div className="bg-indigo-50 rounded p-2">
              <div className="text-xs text-zinc-500">Bonus</div>
              <div className="font-bold text-indigo-600">{formatMoney(bonus)}</div>
            </div>
          )}
        </div>
      </div>

      {/* Growth Projection */}
      <div className="card">
        <h3 className="font-medium mb-2">10-Year Growth Projection (3% annual increase)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={result.trajectory}>
              <XAxis dataKey="year" tickFormatter={(v) => `Year ${v}`} />
              <YAxis tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip formatter={(v) => formatMoney(Number(v))} labelFormatter={(l) => `Year ${l}`} />
              <Line type="monotone" dataKey="annual" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} name="Annual" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Hourly to Salary Conversions</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          {[15, 20, 25, 30, 40, 50, 60, 75].map((rate) => (
            <div key={rate} className="bg-white rounded p-2 text-center">
              <div className="font-medium">${rate}/hr</div>
              <div className="text-zinc-600">{formatMoney(rate * 40 * 52)}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}