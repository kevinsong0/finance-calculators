'use client';

import { useState, useMemo } from 'react';

export default function OvertimePayCalculator() {
  const [hourlyRate, setHourlyRate] = useState<string>('25');
  const [regularHours, setRegularHours] = useState<string>('40');
  const [overtimeHours, setOvertimeHours] = useState<string>('10');
  const [overtimeRate, setOvertimeRate] = useState<string>('1.5');
  const [doubleTimeHours, setDoubleTimeHours] = useState<string>('0');
  const [holidayHours, setHolidayHours] = useState<string>('0');
  const [weeksPerYear, setWeeksPerYear] = useState<string>('52');
  const [state, setState] = useState<string>('federal');
  const [salaryExempt, setSalaryExempt] = useState<boolean>(false);
  const [annualSalary, setAnnualSalary] = useState<string>('52000');

  const result = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const regHrs = parseFloat(regularHours) || 0;
    const otHrs = parseFloat(overtimeHours) || 0;
    const otRate = parseFloat(overtimeRate) || 1.5;
    const dtHrs = parseFloat(doubleTimeHours) || 0;
    const holHrs = parseFloat(holidayHours) || 0;
    const weeks = parseFloat(weeksPerYear) || 52;
    const salary = parseFloat(annualSalary) || 0;

    // State-specific overtime rules
    let stateOtMultiplier = otRate;
    let dailyOtThreshold = 8; // hours
    let weeklyOtThreshold = 40; // hours

    if (state === 'california') {
      dailyOtThreshold = 8;
      weeklyOtThreshold = 40;
      stateOtMultiplier = 1.5;
      // California: OT after 8 hours/day, double time after 12
    } else if (state === 'colorado') {
      dailyOtThreshold = 12;
      weeklyOtThreshold = 40;
    }

    // Calculate pay
    const regularPay = salaryExempt ? salary : rate * regHrs * weeks;
    const overtimePay = salaryExempt ? 0 : rate * otRate * otHrs * weeks;
    const doubleTimePay = salaryExempt ? 0 : rate * 2 * dtHrs * weeks;
    const holidayPay = salaryExempt ? 0 : rate * otRate * holHrs * weeks;

    const totalWeeklyPay = salaryExempt ?
      salary / weeks :
      rate * regHrs + rate * otRate * otHrs + rate * 2 * dtHrs + rate * otRate * holHrs;

    const totalAnnualPay = regularPay + overtimePay + doubleTimePay + holidayPay;

    // Effective hourly rate
    const totalHoursPerWeek = regHrs + otHrs + dtHrs + holHrs;
    const totalHoursPerYear = totalHoursPerWeek * weeks;
    const effectiveHourly = salaryExempt ? salary / totalHoursPerYear : totalAnnualPay / totalHoursPerYear;

    // Overtime comparison
    const overtimePremium = overtimePay + doubleTimePay + holidayPay;
    const overtimePercent = salaryExempt ? 0 : (overtimePremium / totalAnnualPay) * 100;

    // Salary vs hourly comparison
    const equivalentSalary = totalAnnualPay;
    const hourlyEquivalent = salary > 0 ? salary / (regHrs * weeks) : 0;

    // Compliance check
    const complianceIssues: string[] = [];

    if (!salaryExempt && otHrs > 0 && otRate < 1.5) {
      complianceIssues.push('Warning: Overtime rate below federal minimum of 1.5x');
    }

    if (state === 'california' && totalHoursPerWeek > 60) {
      complianceIssues.push('California: High weekly hours may trigger additional OT requirements');
    }

    if (!salaryExempt && regHrs > 40 && otHrs > 0) {
      complianceIssues.push('Regular hours exceed 40 - check classification accuracy');
    }

    // Recommendations
    const recommendations: string[] = [];

    if (salaryExempt && effectiveHourly < rate) {
      recommendations.push('Exempt salary results in lower effective hourly rate than overtime hourly');
    }

    if (overtimePercent > 20) {
      recommendations.push('Overtime accounts for more than 20% of income - consider workload balance');
    }

    if (totalHoursPerWeek > 50) {
      recommendations.push('Weekly hours exceed 50 - potential burnout risk, evaluate work-life balance');
    }

    if (!salaryExempt && rate < 20) {
      recommendations.push('Low hourly rate - overtime critical for meeting income needs');
    }

    return {
      regularPay,
      overtimePay,
      doubleTimePay,
      holidayPay,
      totalWeeklyPay,
      totalAnnualPay,
      effectiveHourly,
      overtimePremium,
      overtimePercent,
      equivalentSalary,
      hourlyEquivalent,
      totalHoursPerWeek,
      totalHoursPerYear,
      complianceIssues,
      recommendations,
      salaryExempt
    };
  }, [hourlyRate, regularHours, overtimeHours, overtimeRate, doubleTimeHours, holidayHours, weeksPerYear, state, salaryExempt, annualSalary]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Overtime Pay Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate overtime pay including state-specific rules and exemptions</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Hourly Pay Structure</h3>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={salaryExempt}
              onChange={(e) => setSalaryExempt(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Salaried/Exempt from overtime</span>
          </div>

          {salaryExempt ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary ($)</label>
              <input
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="52000"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="25"
              />
            </div>
          )}

          {!salaryExempt && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Regular Hours/Week</label>
              <input
                type="number"
                value={regularHours}
                onChange={(e) => setRegularHours(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="40"
              />
            </div>
          )}

          {!salaryExempt && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Overtime Hours/Week</label>
              <input
                type="number"
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="10"
              />
            </div>
          )}

          {!salaryExempt && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Overtime Rate Multiplier</label>
              <select
                value={overtimeRate}
                onChange={(e) => setOvertimeRate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="1.5">1.5x (Standard FLSA)</option>
                <option value="2">2x (Double time)</option>
                <option value="1.25">1.25x (Some states)</option>
              </select>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Additional Hours</h3>
          {!salaryExempt && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Double Time Hours/Week</label>
              <input
                type="number"
                value={doubleTimeHours}
                onChange={(e) => setDoubleTimeHours(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          )}

          {!salaryExempt && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Holiday Hours/Week</label>
              <input
                type="number"
                value={holidayHours}
                onChange={(e) => setHolidayHours(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State for OT Rules</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="federal">Federal (FLSA standard)</option>
              <option value="california">California</option>
              <option value="colorado">Colorado</option>
              <option value="other">Other states</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weeks Worked/Year</label>
            <input
              type="number"
              value={weeksPerYear}
              onChange={(e) => setWeeksPerYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="52"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Overtime Pay Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Weekly Pay</h4>
              <p className="text-xl font-bold text-orange-700">$${result.totalWeeklyPay.toFixed(2)}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Annual Pay</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.totalAnnualPay.toFixed(0)}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Effective Hourly</h4>
              <p className="text-xl font-bold text-purple-700">$${result.effectiveHourly.toFixed(2)}</p>
              <p className="text-xs text-gray-500">All hours included</p>
            </div>
          </div>

          {!result.salaryExempt && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Pay Breakdown</h4>
              <div className="grid md:grid-cols-4 gap-2 mt-2 text-sm">
                <div>
                  <p className="text-gray-600">Regular</p>
                  <p className="font-bold">$${result.regularPay.toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Overtime</p>
                  <p className="font-bold text-orange-600">$${result.overtimePay.toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Double Time</p>
                  <p className="font-bold text-red-600">$${result.doubleTimePay.toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Holiday</p>
                  <p className="font-bold text-purple-600">$${result.holidayPay.toFixed(0)}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Overtime Premium</h4>
              <p className="text-lg font-bold text-orange-700">$${result.overtimePremium.toFixed(0)}</p>
              <p className="text-sm text-gray-600">{result.overtimePercent.toFixed(1)}% of total pay</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Hours Worked</h4>
              <p className="text-lg font-bold">{result.totalHoursPerWeek}/week | {result.totalHoursPerYear}/year</p>
              <p className="text-sm text-gray-600">Total hours including overtime</p>
            </div>
          </div>

          {result.complianceIssues.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded mb-4">
              <h4 className="font-medium text-red-800">Compliance Issues</h4>
              <ul className="mt-2 space-y-1">
                {result.complianceIssues.map((issue, i) => (
                  <li key={i} className="text-sm text-red-600">⚠️ {issue}</li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Work-Life Balance</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-gray-600">• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Federal FLSA requires 1.5x overtime after 40 hours/week for non-exempt employees. Some states (California, Colorado) have additional daily overtime rules. Exempt employees (salaried above threshold, certain job duties) are not entitled to overtime. Verify exemption status with employer and state labor laws.</p>
      </div>
    </div>
  );
}