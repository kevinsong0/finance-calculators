'use client';

import { useState, useMemo } from 'react';

export default function PetExpenseCalculator() {
  const [petType, setPetType] = useState<string>('dog');
  const [petSize, setPetSize] = useState<string>('medium');
  const [petAge, setPetAge] = useState<string>('adult');
  const [numberOfPets, setNumberOfPets] = useState<string>('1');
  const [monthlyBudget, setMonthlyBudget] = useState<string>('150');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [currentSpending, setCurrentSpending] = useState<string>('200');
  const [foodCost, setFoodCost] = useState<string>('60');
  const [vetVisits, setVetVisits] = useState<string>('2');
  const [vetAvgCost, setVetAvgCost] = useState<string>('150');
  const [groomingFrequency, setGroomingFrequency] = useState<string>('monthly');
  const [groomingCost, setGroomingCost] = useState<string>('50');
  const [petInsurance, setPetInsurance] = useState<string>('0');
  const [toySupplyCost, setToySupplyCost] = useState<string>('20');
  const [boardingCost, setBoardingCost] = useState<string>('0');
  const [trainingCost, setTrainingCost] = useState<string>('0');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const pets = parseFloat(numberOfPets) || 1;
    const food = parseFloat(foodCost) || 0;
    const vetVis = parseFloat(vetVisits) || 0;
    const vetCost = parseFloat(vetAvgCost) || 0;
    const groomFreqMap: Record<string, number> = { weekly: 4, monthly: 1, quarterly: 0.33, rarely: 0.1 };
    const groomPerMonth = groomFreqMap[groomingFrequency] || 1;
    const groom = parseFloat(groomingCost) || 0;
    const insurance = parseFloat(petInsurance) || 0;
    const toys = parseFloat(toySupplyCost) || 0;
    const board = parseFloat(boardingCost) || 0;
    const train = parseFloat(trainingCost) || 0;

    // Calculate monthly costs
    const monthlyFood = food;
    const monthlyVet = (vetVis * vetCost) / 12; // Annual divided by 12
    const monthlyGrooming = groom * groomPerMonth;
    const monthlyInsurance = insurance;
    const monthlySupplies = toys;
    const monthlyBoarding = board;
    const monthlyTraining = train;

    const totalMonthly = (monthlyFood + monthlyVet + monthlyGrooming + monthlyInsurance + monthlySupplies + monthlyBoarding + monthlyTraining) * pets;
    const totalAnnual = totalMonthly * 12;

    // Baseline estimates by pet type and size
    const baseCosts: Record<string, Record<string, number>> = {
      dog: { small: 50, medium: 80, large: 120 },
      cat: { small: 40, medium: 50, large: 60 },
      bird: { small: 30, medium: 50, large: 80 },
      rabbit: { small: 40, medium: 50, large: 60 },
      fish: { small: 20, medium: 40, large: 60 },
      reptile: { small: 30, medium: 50, large: 80 }
    };
    const baselineMonthly = baseCosts[petType]?.[petSize] || 60;
    const baselineAnnual = baselineMonthly * 12 * pets;

    // Budget analysis
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;
    const percentOfIncome = income > 0 ? (spending / income) * 100 : 0;

    // Category breakdown
    const categories = [
      { name: 'Food', amount: monthlyFood * pets, percent: (monthlyFood / totalMonthly) * 100 },
      { name: 'Veterinary', amount: monthlyVet * pets, percent: (monthlyVet / totalMonthly) * 100 },
      { name: 'Grooming', amount: monthlyGrooming * pets, percent: (monthlyGrooming / totalMonthly) * 100 },
      { name: 'Insurance', amount: monthlyInsurance * pets, percent: (monthlyInsurance / totalMonthly) * 100 },
      { name: 'Supplies/Toys', amount: monthlySupplies * pets, percent: (monthlySupplies / totalMonthly) * 100 },
      { name: 'Boarding', amount: monthlyBoarding * pets, percent: (monthlyBoarding / totalMonthly) * 100 },
      { name: 'Training', amount: monthlyTraining * pets, percent: (monthlyTraining / totalMonthly) * 100 }
    ].filter(c => c.amount > 0);

    // Life stage considerations
    const lifeStageCosts: { stage: string; additional: number; reason: string }[] = [];
    if (petAge === 'puppy' || petAge === 'kitten') {
      lifeStageCosts.push({ stage: 'Young', additional: 50, reason: 'Initial vaccinations, training, supplies' });
    }
    if (petAge === 'senior') {
      lifeStageCosts.push({ stage: 'Senior', additional: 30, reason: 'More frequent vet visits, medications' });
    }

    // Savings opportunities
    const savingsOpportunities: { action: string; savings: number; difficulty: string }[] = [];

    if (insurance === 0 && vetVis > 1) {
      savingsOpportunities.push({
        action: 'Consider pet insurance for unexpected vet costs',
        savings: 0,
        difficulty: 'Planning'
      });
    }

    if (groomPerMonth > 1 && groom > 40) {
      savingsOpportunities.push({
        action: 'Learn basic grooming at home',
        savings: groom * (groomPerMonth - 1) * 0.5,
        difficulty: 'Medium'
      });
    }

    if (food > baselineMonthly * 0.6) {
      savingsOpportunities.push({
        action: 'Buy food in bulk or compare brands',
        savings: food * 0.15,
        difficulty: 'Easy'
      });
    }

    if (toys > 30) {
      savingsOpportunities.push({
        action: 'Reduce toy spending - pets prefer interaction',
        savings: toys * 0.5,
        difficulty: 'Easy'
      });
    }

    if (board > 50) {
      savingsOpportunities.push({
        action: 'Find pet sitter instead of boarding',
        savings: board * 0.4,
        difficulty: 'Medium'
      });
    }

    const totalPotentialSavings = savingsOpportunities.reduce((sum, o) => sum + o.savings, 0);

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - review expenses');
    }

    if (percentOfIncome > 5) {
      recommendations.push('Pet spending exceeds 5% of income - typical is 1-3%');
    }

    if (insurance === 0 && (petType === 'dog' || petType === 'cat')) {
      recommendations.push('Pet insurance recommended - unexpected vet bills can exceed $5,000');
    }

    if (vetVis < 1 && petAge === 'senior') {
      recommendations.push('Senior pets need more frequent checkups - at least 2/year');
    }

    if (pets > 2) {
      recommendations.push('Multiple pets multiply costs - ensure budget can handle emergencies');
    }

    return {
      totalMonthly,
      totalAnnual,
      baselineMonthly,
      baselineAnnual,
      budgetVariance,
      isOverBudget,
      percentOfIncome,
      categories,
      lifeStageCosts,
      savingsOpportunities,
      totalPotentialSavings,
      recommendations,
      budget,
      spending,
      pets
    };
  }, [petType, petSize, petAge, numberOfPets, monthlyBudget, monthlyIncome, currentSpending, foodCost, vetVisits, vetAvgCost, groomingFrequency, groomingCost, petInsurance, toySupplyCost, boardingCost, trainingCost]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Pet Expense Calculator</h1>
      <p className="text-gray-600 mb-6">Estimate pet ownership costs and plan your pet budget</p>

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
              <option value="bird">Bird</option>
              <option value="rabbit">Rabbit</option>
              <option value="fish">Fish</option>
              <option value="reptile">Reptile</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Size</label>
            <select
              value={petSize}
              onChange={(e) => setPetSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Age</label>
            <select
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="puppy">Puppy/Kitten (0-1 year)</option>
              <option value="adult">Adult (1-7 years)</option>
              <option value="senior">Senior (7+ years)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Pets</label>
            <input
              type="number"
              value={numberOfPets}
              onChange={(e) => setNumberOfPets(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Pet Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="150"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Monthly Spending ($)</label>
            <input
              type="number"
              value={currentSpending}
              onChange={(e) => setCurrentSpending(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="200"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Expense Categories</h3>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food ($/mo)</label>
              <input
                type="number"
                value={foodCost}
                onChange={(e) => setFoodCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pet Insurance ($/mo)</label>
              <input
                type="number"
                value={petInsurance}
                onChange={(e) => setPetInsurance(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Veterinary</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Visits per year</label>
                <input
                  type="number"
                  value={vetVisits}
                  onChange={(e) => setVetVisits(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="2"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Avg cost ($)</label>
                <input
                  type="number"
                  value={vetAvgCost}
                  onChange={(e) => setVetAvgCost(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="150"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grooming Frequency</label>
              <select
                value={groomingFrequency}
                onChange={(e) => setGroomingFrequency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Every 3 months</option>
                <option value="rarely">Rarely</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grooming Cost ($)</label>
              <input
                type="number"
                value={groomingCost}
                onChange={(e) => setGroomingCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplies/Toys</label>
              <input
                type="number"
                value={toySupplyCost}
                onChange={(e) => setToySupplyCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Boarding</label>
              <input
                type="number"
                value={boardingCost}
                onChange={(e) => setBoardingCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Training</label>
              <input
                type="number"
                value={trainingCost}
                onChange={(e) => setTrainingCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-teal-50 border border-teal-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Pet Expense Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Cost</h4>
              <p className="text-xl font-bold text-teal-700">$${result.totalMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.pets} pets</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Annual Cost</h4>
              <p className="text-xl font-bold text-purple-700">$${result.totalAnnual.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Lifetime can exceed $20,000</p>
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
            <h4 className="font-medium text-gray-800">Expense Breakdown</h4>
            <div className="space-y-2 mt-2">
              {result.categories.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{cat.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-teal-600">$${cat.amount.toFixed(0)}/mo</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <h4 className="font-medium text-blue-800">Benchmark Comparison</h4>
            <p className="text-sm mt-1 text-blue-700">
              Typical cost for {petType} ({petSize}): $${result.baselineMonthly}/month ($${result.baselineAnnual}/year)
            </p>
          </div>

          {result.lifeStageCosts.length > 0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded mb-4">
              <h4 className="font-medium text-yellow-800">Life Stage Considerations</h4>
              <ul className="mt-2 space-y-1">
                {result.lifeStageCosts.map((lc, i) => (
                  <li key={i} className="text-sm text-yellow-700">
                    {lc.stage}: +$${lc.additional}/mo for {lc.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.savingsOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Cost Saving Ideas</h4>
              <div className="space-y-2 mt-2">
                {result.savingsOpportunities.map((opp, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <div>
                      <span className="text-gray-600">{opp.action}</span>
                      <span className="text-xs text-gray-400 ml-2">({opp.difficulty})</span>
                    </div>
                    {opp.savings > 0 && (
                      <span className="font-bold text-green-600">$${opp.savings.toFixed(0)}/mo</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Pet Budget Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-teal-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> First-year pet costs are 2-3x higher than ongoing costs. Dogs typically cost $1,000-2,000 initially, cats $500-1,000. Emergency vet bills can exceed $5,000 without insurance. Budget for unexpected expenses. Senior pets require more care. Factor in lifestyle costs like boarding during travel.</p>
      </div>
    </div>
  );
}