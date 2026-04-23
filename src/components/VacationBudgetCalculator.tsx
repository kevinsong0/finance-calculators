'use client';

import { useState, useMemo } from 'react';

export default function VacationBudgetCalculator() {
  const [destination, setDestination] = useState<string>('Beach Resort');
  const [tripDuration, setTripDuration] = useState<string>('7');
  const [numTravelers, setNumTravelers] = useState<string>('2');
  const [flightCost, setFlightCost] = useState<string>('400');
  const [accommodationPerNight, setAccommodationPerNight] = useState<string>('150');
  const [dailyFoodBudget, setDailyFoodBudget] = useState<string>('60');
  const [dailyActivityBudget, setDailyActivityBudget] = useState<string>('50');
  const [transportationLocal, setTransportationLocal] = useState<string>('100');
  const [travelInsurance, setTravelInsurance] = useState<string>('80');
  const [souvenirBudget, setSouvenirBudget] = useState<string>('100');
  const [contingencyPercent, setContingencyPercent] = useState<string>('10');
  const [currentSavings, setCurrentSavings] = useState<string>('1000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('200');
  const [tripDateMonths, setTripDateMonths] = useState<string>('6');

  const result = useMemo(() => {
    const duration = parseFloat(tripDuration) || 0;
    const travelers = parseFloat(numTravelers) || 1;
    const flight = parseFloat(flightCost) || 0;
    const accommodation = parseFloat(accommodationPerNight) || 0;
    const food = parseFloat(dailyFoodBudget) || 0;
    const activity = parseFloat(dailyActivityBudget) || 0;
    const localTransport = parseFloat(transportationLocal) || 0;
    const insurance = parseFloat(travelInsurance) || 0;
    const souvenir = parseFloat(souvenirBudget) || 0;
    const contingency = parseFloat(contingencyPercent) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const contribution = parseFloat(monthlyContribution) || 0;
    const monthsToTrip = parseFloat(tripDateMonths) || 0;

    // Calculate costs
    const flightTotal = flight * travelers;
    const accommodationTotal = accommodation * duration;
    const foodTotal = food * travelers * duration;
    const activityTotal = activity * travelers * duration;
    const insuranceTotal = insurance * travelers;

    const baseTotal = flightTotal + accommodationTotal + foodTotal + activityTotal + localTransport + insuranceTotal + souvenir;
    const contingencyAmount = baseTotal * (contingency / 100);
    const totalCost = baseTotal + contingencyAmount;

    // Per traveler breakdown
    const perTravelerCost = totalCost / travelers;
    const perDayCost = totalCost / duration;

    // Cost categories
    const categories = [
      { name: 'Flights', amount: flightTotal, percent: (flightTotal / totalCost) * 100 },
      { name: 'Accommodation', amount: accommodationTotal, percent: (accommodationTotal / totalCost) * 100 },
      { name: 'Food', amount: foodTotal, percent: (foodTotal / totalCost) * 100 },
      { name: 'Activities', amount: activityTotal, percent: (activityTotal / totalCost) * 100 },
      { name: 'Local Transport', amount: localTransport, percent: (localTransport / totalCost) * 100 },
      { name: 'Insurance', amount: insuranceTotal, percent: (insuranceTotal / totalCost) * 100 },
      { name: 'Souvenirs', amount: souvenir, percent: (souvenir / totalCost) * 100 },
      { name: 'Contingency', amount: contingencyAmount, percent: (contingencyAmount / totalCost) * 100 }
    ].sort((a, b) => b.amount - a.amount);

    // Savings timeline
    const shortfall = Math.max(0, totalCost - savings);
    const monthsToSave = contribution > 0 ? Math.ceil(shortfall / contribution) : 0;
    const canAfford = savings >= totalCost || (contribution > 0 && monthsToSave <= monthsToTrip);
    const additionalNeeded = canAfford ? 0 : shortfall - (contribution * monthsToTrip);

    // Recommendations
    const recommendations: string[] = [];

    if (!canAfford) {
      recommendations.push('Current savings trajectory falls short - increase monthly contribution or delay trip');
    }

    if (flightTotal > totalCost * 0.4) {
      recommendations.push('Flights exceed 40% of budget - consider alternative dates or airlines');
    }

    if (accommodationTotal > totalCost * 0.3) {
      recommendations.push('Accommodation high - look for deals, alternative lodging, or shorter stay');
    }

    if (contingency < 10) {
      recommendations.push('Low contingency buffer - consider 15-20% for unexpected expenses');
    }

    if (insurance === 0) {
      recommendations.push('No travel insurance budgeted - strongly recommended for international trips');
    }

    if (duration > 10 && food * travelers > 80) {
      recommendations.push('Long trip with high food budget - consider cooking some meals');
    }

    return {
      totalCost,
      perTravelerCost,
      perDayCost,
      categories,
      baseTotal,
      contingencyAmount,
      shortfall,
      monthsToSave,
      canAfford,
      additionalNeeded,
      recommendations,
      savings,
      contribution,
      monthsToTrip,
      flightTotal,
      accommodationTotal,
      foodTotal,
      activityTotal
    };
  }, [tripDuration, numTravelers, flightCost, accommodationPerNight, dailyFoodBudget, dailyActivityBudget, transportationLocal, travelInsurance, souvenirBudget, contingencyPercent, currentSavings, monthlyContribution, tripDateMonths]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Vacation Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Plan and budget for your next trip with comprehensive cost analysis</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Trip Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Beach Resort"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trip Duration (days)</label>
            <input
              type="number"
              value={tripDuration}
              onChange={(e) => setTripDuration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="7"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
            <input
              type="number"
              value={numTravelers}
              onChange={(e) => setNumTravelers(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flight Cost (per person) ($)</label>
            <input
              type="number"
              value={flightCost}
              onChange={(e) => setFlightCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Accommodation (per night) ($)</label>
            <input
              type="number"
              value={accommodationPerNight}
              onChange={(e) => setAccommodationPerNight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="150"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Food Budget (per person) ($)</label>
            <input
              type="number"
              value={dailyFoodBudget}
              onChange={(e) => setDailyFoodBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="60"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Additional Costs</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Activities (per person) ($)</label>
            <input
              type="number"
              value={dailyActivityBudget}
              onChange={(e) => setDailyActivityBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Local Transportation ($)</label>
            <input
              type="number"
              value={transportationLocal}
              onChange={(e) => setTransportationLocal(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Travel Insurance (per person) ($)</label>
            <input
              type="number"
              value={travelInsurance}
              onChange={(e) => setTravelInsurance(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Souvenirs/Misc ($)</label>
            <input
              type="number"
              value={souvenirBudget}
              onChange={(e) => setSouvenirBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contingency Buffer (%)</label>
            <input
              type="number"
              value={contingencyPercent}
              onChange={(e) => setContingencyPercent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10"
              max="30"
            />
          </div>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Savings Plan</h4>
            <div className="space-y-2">
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Current savings"
              />
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Monthly contribution"
              />
              <input
                type="number"
                value={tripDateMonths}
                onChange={(e) => setTripDateMonths(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Months until trip"
              />
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-teal-50 border border-teal-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Vacation Budget for {destination}</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Total Trip Cost</h4>
              <p className="text-xl font-bold text-teal-700">$${result.totalCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Including {contingencyPercent}% contingency</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Per Traveler</h4>
              <p className="text-xl font-bold text-blue-700">$${result.perTravelerCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">For {numTravelers} travelers</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Per Day</h4>
              <p className="text-xl font-bold text-purple-700">$${result.perDayCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">For {tripDuration} days</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Cost Breakdown</h4>
            <div className="space-y-2 mt-2">
              {result.categories.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{cat.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-teal-600">$${cat.amount.toFixed(0)}</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-3 rounded border mb-4 ${result.canAfford ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h4 className="font-medium ${result.canAfford ? 'text-green-800' : 'text-red-800'}">Savings Feasibility</h4>
            {result.canAfford ? (
              <p className="text-sm text-green-700">✓ Trip is affordable! You&apos;ll have enough saved by travel date.</p>
            ) : (
              <p className="text-sm text-red-700">✗ Shortfall of $${result.additionalNeeded.toFixed(0)} - need to adjust plan</p>
            )}
            <p className="text-sm text-gray-600 mt-1">
              Savings needed: $${result.shortfall.toFixed(0)} | Months to save: {result.monthsToSave} | Timeline: {result.monthsToTrip} months
            </p>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Budget Recommendations</h4>
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
        <p><strong>Note:</strong> Include contingency buffer (10-20%) for unexpected expenses. Travel insurance recommended for international trips. Book flights early for better prices. Consider off-season travel for discounts. Track actual expenses during trip to inform future budgets.</p>
      </div>
    </div>
  );
}