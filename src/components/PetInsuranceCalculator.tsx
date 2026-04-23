'use client';

import { useState, useMemo } from 'react';

export default function PetInsuranceCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('100');
  const [petType, setPetType] = useState<string>('dog');
  const [petAge, setPetAge] = useState<string>('young');
  const [petSize, setPetSize] = useState<string>('medium');
  const [breedCategory, setBreedCategory] = useState<string>('standard');
  const [currentPremium, setCurrentPremium] = useState<string>('50');
  const [coverageLevel, setCoverageLevel] = useState<string>('standard');
  const [deductible, setDeductible] = useState<string>('250');
  const [reimbursementRate, setReimbursementRate] = useState<string>('80');
  const [annualLimit, setAnnualLimit] = useState<string>('10000');
  const [vetCosts, setVetCosts] = useState<string>('500');
  const [emergencyFund, setEmergencyFund] = useState<string>('0');
  const [routineCare, setRoutineCare] = useState<string>('200');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const premium = parseFloat(currentPremium) || 0;
    const deductibleAmt = parseFloat(deductible) || 0;
    const reimbursement = parseFloat(reimbursementRate) || 80;
    const limit = parseFloat(annualLimit) || 0;
    const vet = parseFloat(vetCosts) || 0;
    const emergency = parseFloat(emergencyFund) || 0;
    const routine = parseFloat(routineCare) || 0;

    // Base premium estimates by pet type/size/age
    const basePremiums: Record<string, Record<string, Record<string, number>>> = {
      dog: {
        small: { young: 30, adult: 40, senior: 60 },
        medium: { young: 40, adult: 50, senior: 75 },
        large: { young: 50, adult: 65, senior: 90 }
      },
      cat: {
        small: { young: 25, adult: 35, senior: 50 },
        medium: { young: 25, adult: 35, senior: 50 },
        large: { young: 30, adult: 40, senior: 55 }
      }
    };

    const basePremium = basePremiums[petType]?.[petSize]?.[petAge] || 40;

    // Breed category adjustment (high-risk breeds cost more)
    const breedMultiplier: Record<string, number> = { standard: 1, moderate: 1.2, high: 1.5 };
    const adjustedPremium = basePremium * (breedMultiplier[breedCategory] || 1);

    // Coverage level adjustment
    const coverageMultiplier: Record<string, number> = { basic: 0.7, standard: 1, premium: 1.3, comprehensive: 1.5 };
    const finalPremium = adjustedPremium * (coverageMultiplier[coverageLevel] || 1);

    // Annual costs
    const annualPremium = premium * 12;
    const totalVetCosts = vet + emergency + routine;

    // Insurance benefit calculation (if vet costs exceed deductible)
    const claimableAmount = Math.max(0, vet - deductibleAmt);
    const reimbursementAmount = (claimableAmount * reimbursement) / 100;
    const cappedReimbursement = Math.min(reimbursementAmount, limit);
    const netInsuranceValue = cappedReimbursement - annualPremium;

    // Self-insurance comparison (save instead of insure)
    const selfInsuranceSavings = budget * 12;
    const selfInsuranceBreakeven = vet > 0 ? selfInsuranceSavings / vet : 0;

    // Out-of-pocket with insurance
    const outOfPocketWithInsurance = deductibleAmt + (claimableAmount * (100 - reimbursement) / 100) + routine + annualPremium;

    // Out-of-pocket without insurance
    const outOfPocketWithoutInsurance = totalVetCosts;

    // Savings from insurance (if claim made)
    const insuranceSavings = outOfPocketWithoutInsurance - outOfPocketWithInsurance;

    // Provider comparison
    const providers = [
      { name: 'Basic Coverage', premium: finalPremium * 0.7, deductible: 500, limit: 5000, reimbursement: 70 },
      { name: 'Standard Coverage', premium: finalPremium, deductible: 250, limit: 10000, reimbursement: 80 },
      { name: 'Premium Coverage', premium: finalPremium * 1.3, deductible: 100, limit: 15000, reimbursement: 90 },
      { name: 'Comprehensive', premium: finalPremium * 1.5, deductible: 0, limit: 25000, reimbursement: 100 }
    ];

    // Recommendations
    const recommendations: string[] = [];

    if (petAge === 'senior') {
      recommendations.push('Senior pets have higher premiums - consider wellness plans instead');
    }

    if (breedCategory === 'high') {
      recommendations.push('High-risk breed - insurance highly recommended for unexpected conditions');
    }

    if (annualPremium > vet * 2) {
      recommendations.push('Premium exceeds typical vet costs - self-insurance may be better');
    }

    if (petType === 'cat' && coverageLevel === 'comprehensive') {
      recommendations.push('Cats have fewer breed-specific issues - standard coverage often sufficient');
    }

    if (emergency > 1000) {
      recommendations.push('High emergency risk - insurance provides financial protection');
    }

    // Breakeven analysis
    const yearsToBreakeven = annualPremium > 0 ? deductibleAmt / annualPremium : 0;

    return {
      finalPremium,
      annualPremium,
      totalVetCosts,
      claimableAmount,
      reimbursementAmount,
      netInsuranceValue,
      selfInsuranceSavings,
      insuranceSavings,
      outOfPocketWithInsurance,
      outOfPocketWithoutInsurance,
      providers,
      recommendations,
      yearsToBreakeven,
      budget,
      premium,
      petType,
      petAge,
      petSize,
      coverageLevel,
      deductibleAmt,
      reimbursement,
      limit
    };
  }, [monthlyBudget, petType, petAge, petSize, breedCategory, currentPremium, coverageLevel, deductible, reimbursementRate, annualLimit, vetCosts, emergencyFund, routineCare]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Pet Insurance Calculator</h1>
      <p className="text-gray-600 mb-6">Compare pet insurance options and decide if coverage is worth it for your pet</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Pet Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Type</label>
            <select
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Age</label>
            <select
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="young">Young (0-3 years)</option>
              <option value="adult">Adult (4-7 years)</option>
              <option value="senior">Senior (8+ years)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Size</label>
            <select
              value={petSize}
              onChange={(e) => setPetSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">Small (under 20 lbs)</option>
              <option value="medium">Medium (20-50 lbs)</option>
              <option value="large">Large (over 50 lbs)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Breed Risk Category</label>
            <select
              value={breedCategory}
              onChange={(e) => setBreedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard Risk</option>
              <option value="moderate">Moderate Risk (some breed issues)</option>
              <option value="high">High Risk (prone to health issues)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget for Pet Care ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Insurance & Costs</h3>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Level</label>
              <select
                value={coverageLevel}
                onChange={(e) => setCoverageLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                <option value="comprehensive">Comprehensive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Premium ($/mo)</label>
              <input
                type="number"
                value={currentPremium}
                onChange={(e) => setCurrentPremium(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deductible ($)</label>
              <input
                type="number"
                value={deductible}
                onChange={(e) => setDeductible(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="250"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reimbursement (%)</label>
              <input
                type="number"
                value={reimbursementRate}
                onChange={(e) => setReimbursementRate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Limit ($)</label>
              <input
                type="number"
                value={annualLimit}
                onChange={(e) => setAnnualLimit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="10000"
              />
            </div>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Veterinary Costs</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Routine Care ($/yr)</label>
                <input
                  type="number"
                  value={routineCare}
                  onChange={(e) => setRoutineCare(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="200"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Expected Vet ($/yr)</label>
                <input
                  type="number"
                  value={vetCosts}
                  onChange={(e) => setVetCosts(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Emergency Fund ($)</label>
                <input
                  type="number"
                  value={emergencyFund}
                  onChange={(e) => setEmergencyFund(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Pet Insurance Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Estimated Premium</h4>
              <p className="text-xl font-bold text-green-700">$${result.finalPremium.toFixed(0)}/mo</p>
              <p className="text-xs text-gray-500">{result.petType}, {result.petAge}, {result.petSize}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Annual Premium</h4>
              <p className="text-xl font-bold text-blue-700">$${result.annualPremium.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.coverageLevel} coverage</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Insurance Value</h4>
              <p className={`text-xl font-bold ${result.insuranceSavings > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {result.insuranceSavings > 0 ? '+' : ''}$${result.insuranceSavings.toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">{result.insuranceSavings > 0 ? 'Potential savings' : 'May cost more'}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Cost Comparison</h4>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">With Insurance (annual)</span>
                <span className="font-bold text-green-600">$${result.outOfPocketWithInsurance.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Without Insurance (annual)</span>
                <span className="font-bold text-red-600">$${result.outOfPocketWithoutInsurance.toFixed(0)}</span>
              </div>
            </div>
            <p className="text-sm mt-2 text-gray-600">
              Deductible: $${result.deductibleAmt} | Reimbursement: {result.reimbursement}% | Limit: $${result.limit}
            </p>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <h4 className="font-medium text-blue-800">Coverage Options Comparison</h4>
            <div className="space-y-2 mt-2">
              {result.providers.map((p, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-2 bg-white rounded">
                  <span className="text-gray-600">{p.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-blue-600">$${p.premium.toFixed(0)}/mo</span>
                    <span className="text-xs text-gray-500 ml-1">(D: $${p.deductible}, L: $${p.limit})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Pet Insurance Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-green-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Pet insurance costs $25-90/month depending on pet type, age, size, and breed. Dogs average $40-65/month, cats $25-40/month. Senior pets pay 50-100% more. High-risk breeds (bulldogs, German shepherds) cost 20-50% more. Most plans exclude pre-existing conditions. Compare premiums vs expected vet costs. Emergency vet visits average $500-2,000. Consider wellness plans for routine care. Self-insurance works for young, healthy pets with low breed risk.</p>
      </div>
    </div>
  );
}