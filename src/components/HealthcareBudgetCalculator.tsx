'use client';

import { useState, useMemo } from 'react';

export default function HealthcareBudgetCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('300');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [currentSpending, setCurrentSpending] = useState<string>('400');
  const [insuranceType, setInsuranceType] = useState<string>('employer');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('3');
  const [insurancePremium, setInsurancePremium] = useState<string>('200');
  const [deductible, setDeductible] = useState<string>('1500');
  const [copayPrimary, setCopayPrimary] = useState<string>('25');
  const [copaySpecialist, setCopaySpecialist] = useState<string>('50');
  const [prescriptionCost, setPrescriptionCost] = useState<string>('50');
  const [doctorVisitsPrimary, setDoctorVisitsPrimary] = useState<string>('4');
  const [doctorVisitsSpecialist, setDoctorVisitsSpecialist] = useState<string>('2');
  const [dentalCost, setDentalCost] = useState<string>('100');
  const [visionCost, setVisionCost] = useState<string>('50');
  const [healthStatus, setHealthStatus] = useState<string>('average');
  const [hasHSA, setHasHSA] = useState<string>('yes');
  const [hsaContribution, setHsaContribution] = useState<string>('200');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const people = parseFloat(numberOfPeople) || 1;
    const premium = parseFloat(insurancePremium) || 0;
    const ded = parseFloat(deductible) || 0;
    const copayPrim = parseFloat(copayPrimary) || 0;
    const copaySpec = parseFloat(copaySpecialist) || 0;
    const rx = parseFloat(prescriptionCost) || 0;
    const visitsPrim = parseFloat(doctorVisitsPrimary) || 0;
    const visitsSpec = parseFloat(doctorVisitsSpecialist) || 0;
    const dental = parseFloat(dentalCost) || 0;
    const vision = parseFloat(visionCost) || 0;
    const hsaCont = parseFloat(hsaContribution) || 0;

    // Health status multiplier for expected utilization
    const healthMults: Record<string, number> = { excellent: 0.5, good: 0.75, average: 1, fair: 1.5, poor: 2 };
    const healthMult = healthMults[healthStatus] || 1;

    // Monthly costs
    const monthlyPremium = premium;
    const monthlyDoctorVisits = ((visitsPrim * copayPrim) + (visitsSpec * copaySpec)) / 12 * healthMult;
    const monthlyPrescriptions = rx * healthMult;
    const monthlyDental = dental;
    const monthlyVision = vision / 12;
    const monthlyDeductibleReserve = ded / 12 * healthMult; // Reserve for deductible usage

    const totalMonthly = monthlyPremium + monthlyDoctorVisits + monthlyPrescriptions + monthlyDental + monthlyVision + monthlyDeductibleReserve;
    const totalAnnual = totalMonthly * 12;

    // Budget analysis
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;
    const percentOfIncome = income > 0 ? (spending / income) * 100 : 0;
    const perPersonCost = totalMonthly / people;

    // Out-of-pocket maximum estimate
    const oopEstimate = ded + (visitsPrim * copayPrim * 12) + (visitsSpec * copaySpec * 12) + (rx * 12);

    // Category breakdown
    const categories = [
      { name: 'Insurance Premium', amount: monthlyPremium, percent: (monthlyPremium / totalMonthly) * 100 },
      { name: 'Doctor Visits', amount: monthlyDoctorVisits, percent: (monthlyDoctorVisits / totalMonthly) * 100 },
      { name: 'Prescriptions', amount: monthlyPrescriptions, percent: (monthlyPrescriptions / totalMonthly) * 100 },
      { name: 'Dental', amount: monthlyDental, percent: (monthlyDental / totalMonthly) * 100 },
      { name: 'Vision', amount: monthlyVision, percent: (monthlyVision / totalMonthly) * 100 },
      { name: 'Deductible Reserve', amount: monthlyDeductibleReserve, percent: (monthlyDeductibleReserve / totalMonthly) * 100 }
    ];

    // HSA/FSA analysis
    const hsaTaxSavings = hasHSA === 'yes' ? hsaCont * 0.3 : 0; // ~30% tax savings
    const hsaAnnualContribution = hsaCont * 12;
    const hsaLimit2026 = people > 1 ? 8300 : 4150; // Family vs individual

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - optimize plan choice');
    }

    if (percentOfIncome > 8) {
      recommendations.push('Healthcare exceeds 8% of income - typical is 3-6%');
    }

    if (ded > 2000 && healthStatus === 'fair' || healthStatus === 'poor') {
      recommendations.push('High deductible with health concerns - consider lower deductible plan');
    }

    if (premium > income * 0.05) {
      recommendations.push('Premium exceeds 5% of income - compare plan options');
    }

    if (hasHSA === 'no' && insuranceType === 'hdhp') {
      recommendations.push('HDHP without HSA - maximize tax benefits with HSA');
    }

    if (hsaCont < hsaLimit2026 / 12 * 0.5) {
      recommendations.push('HSA contribution below optimal - aim to max out');
    }

    return {
      totalMonthly,
      totalAnnual,
      budgetVariance,
      isOverBudget,
      percentOfIncome,
      perPersonCost,
      oopEstimate,
      categories,
      hsaTaxSavings,
      hsaAnnualContribution,
      hsaLimit2026,
      recommendations,
      budget,
      spending,
      people,
      premium,
      ded
    };
  }, [monthlyBudget, monthlyIncome, currentSpending, insuranceType, numberOfPeople, insurancePremium, deductible, copayPrimary, copaySpecialist, prescriptionCost, doctorVisitsPrimary, doctorVisitsSpecialist, dentalCost, visionCost, healthStatus, hasHSA, hsaContribution]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Healthcare Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Plan healthcare expenses including insurance, medical visits, and HSA contributions</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Insurance & Budget</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Healthcare Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income ($)</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Monthly Spending ($)</label>
            <input
              type="number"
              value={currentSpending}
              onChange={(e) => setCurrentSpending(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Type</label>
            <select
              value={insuranceType}
              onChange={(e) => setInsuranceType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="employer">Employer-Sponsored</option>
              <option value="aca">ACA/Marketplace</option>
              <option value="hdhp">High Deductible Health Plan</option>
              <option value="medicare">Medicare</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Covered Family Members</label>
            <input
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
            <select
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor/Chronic Conditions</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Medical Costs</h3>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Premium ($)</label>
              <input
                type="number"
                value={insurancePremium}
                onChange={(e) => setInsurancePremium(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Deductible ($)</label>
              <input
                type="number"
                value={deductible}
                onChange={(e) => setDeductible(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Copay ($)</label>
              <input
                type="number"
                value={copayPrimary}
                onChange={(e) => setCopayPrimary(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialist Copay ($)</label>
              <input
                type="number"
                value={copaySpecialist}
                onChange={(e) => setCopaySpecialist(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Visits/Year</label>
              <input
                type="number"
                value={doctorVisitsPrimary}
                onChange={(e) => setDoctorVisitsPrimary(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialist Visits/Year</label>
              <input
                type="number"
                value={doctorVisitsSpecialist}
                onChange={(e) => setDoctorVisitsSpecialist(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="2"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prescriptions ($/mo)</label>
              <input
                type="number"
                value={prescriptionCost}
                onChange={(e) => setPrescriptionCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dental ($/mo)</label>
              <input
                type="number"
                value={dentalCost}
                onChange={(e) => setDentalCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vision (Annual $)</label>
              <input
                type="number"
                value={visionCost}
                onChange={(e) => setVisionCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">HSA/FSA</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Has HSA?</label>
                <select
                  value={hasHSA}
                  onChange={(e) => setHasHSA(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-700">HSA Contribution ($/mo)</label>
                <input
                  type="number"
                  value={hsaContribution}
                  onChange={(e) => setHsaContribution(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Healthcare Budget Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Cost</h4>
              <p className="text-xl font-bold text-red-700">$${result.totalMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.people} covered</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Per Person</h4>
              <p className="text-xl font-bold text-orange-700">$${result.perPersonCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Monthly per person</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Budget Status</h4>
              <p className={`text-xl font-bold ${result.isOverBudget ? 'text-red-700' : 'text-green-700'}`}>
                {result.isOverBudget ? '-' : '+'}$${Math.abs(result.budgetVariance).toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">{result.isOverBudget ? 'Over budget' : 'Under budget'}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Cost Breakdown</h4>
            <div className="space-y-2 mt-2">
              {result.categories.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{cat.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-red-600">$${cat.amount.toFixed(0)}/mo</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 font-medium text-gray-700">
              Annual Total: $${result.totalAnnual.toFixed(0)} | Potential OOP: $${result.oopEstimate.toFixed(0)}
            </p>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded mb-4">
            <h4 className="font-medium text-green-800">HSA Benefits</h4>
            <p className="text-sm mt-1 text-green-700">
              Annual Contribution: $${result.hsaAnnualContribution.toFixed(0)} (Limit: $${result.hsaLimit2026})
            </p>
            <p className="text-sm text-green-700">
              Tax Savings: $${result.hsaTaxSavings.toFixed(0)}/year (~30% effective)
            </p>
            <p className="text-sm text-green-700">
              Triple tax benefit: Pre-tax contribution, tax-free growth, tax-free withdrawal for medical
            </p>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <h4 className="font-medium text-blue-800">Key Numbers</h4>
            <p className="text-sm mt-1 text-blue-700">
              Premium: $${result.premium}/mo | Deductible: $${result.ded}/year
            </p>
            <p className="text-sm text-blue-700">
              % of Income: {result.percentOfIncome.toFixed(1)}% (Typical: 3-6%)
            </p>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Healthcare Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-red-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Healthcare should be 3-6% of income. Employer plans average $200-600/month premium. High deductible plans pair with HSA for tax savings. 2026 HSA limits: $4,150 individual, $8,300 family. Always have deductible reserve. Consider dental/vision separately. Preventive care is typically free. Factor in health status for utilization estimates.</p>
      </div>
    </div>
  );
}