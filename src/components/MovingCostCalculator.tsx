'use client';

import { useState, useMemo } from 'react';

export default function MovingCostCalculator() {
  const [moveDistance, setMoveDistance] = useState<string>('local');
  const [moveSize, setMoveSize] = useState<string>('2br');
  const [monthlyBudget, setMonthlyBudget] = useState<string>('500');
  const [currentHomeSize, setCurrentHomeSize] = useState<string>('1000');
  const [newHomeSize, setNewHomeSize] = useState<string>('1200');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('2');
  const [hiringMovers, setHiringMovers] = useState<string>('full');
  const [packingService, setPackingService] = useState<string>('self');
  const [storageNeeded, setStorageNeeded] = useState<string>('no');
  const [storageMonths, setStorageMonths] = useState<string>('0');
  const [travelDistance, setTravelDistance] = useState<string>('50');
  const [travelMethod, setTravelMethod] = useState<string>('drive');
  const [vehicleCount, setVehicleCount] = useState<string>('1');
  const [hotelNights, setHotelNights] = useState<string>('0');
  const [insuranceCost, setInsuranceCost] = useState<string>('0');
  const [currentSpending, setCurrentSpending] = useState<string>('3500');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const currentSize = parseFloat(currentHomeSize) || 0;
    const newSize = parseFloat(newHomeSize) || 0;
    const people = parseFloat(numberOfPeople) || 1;
    const distance = parseFloat(travelDistance) || 0;
    const vehicles = parseFloat(vehicleCount) || 1;
    const hotels = parseFloat(hotelNights) || 0;
    const insurance = parseFloat(insuranceCost) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const storageMos = parseFloat(storageMonths) || 0;

    // Moving costs by size and distance
    const moverCosts: Record<string, Record<string, number>> = {
      studio: { local: 400, long: 1500, crossCountry: 2500 },
      '1br': { local: 600, long: 2000, crossCountry: 3500 },
      '2br': { local: 800, long: 3000, crossCountry: 5000 },
      '3br': { local: 1200, long: 4000, crossCountry: 7000 },
      '4br': { local: 1800, long: 6000, crossCountry: 10000 }
    };
    const moverCost = moverCosts[moveSize]?.[moveDistance] || 800;

    // Adjust for hiring type
    const hiringMultiplier: Record<string, number> = { full: 1, partial: 0.7, self: 0.2 };
    const adjustedMoverCost = moverCost * (hiringMultiplier[hiringMovers] || 1);

    // Packing costs
    const packingCosts: Record<string, number> = { self: 100, partial: 300, full: 500 };
    const packingCost = packingCosts[packingService] || 100;

    // Supplies estimate
    const suppliesCost = currentSize * 0.5; // ~$0.50 per sq ft for boxes, tape, etc

    // Storage costs
    const monthlyStorageCost = moveSize === 'studio' ? 50 : moveSize === '1br' ? 75 : moveSize === '2br' ? 100 : moveSize === '3br' ? 150 : 200;
    const totalStorageCost = storageNeeded === 'yes' ? monthlyStorageCost * storageMos : 0;

    // Travel costs
    const gasCost = distance * vehicles * 0.15; // ~$0.15 per mile per vehicle
    const hotelCost = hotels * 100; // $100/night average
    const flightCost = travelMethod === 'fly' ? people * 300 : 0;
    const travelTotal = gasCost + hotelCost + flightCost;

    // Utility/setup costs at new location
    const setupCosts = 200; // Deposits, installation, etc

    // Total
    const totalCost = adjustedMoverCost + packingCost + suppliesCost + totalStorageCost + travelTotal + setupCosts + insurance;

    // Budget analysis
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;
    const perPersonCost = totalCost / people;

    // Cost breakdown
    const categories = [
      { name: 'Movers', amount: adjustedMoverCost, percent: (adjustedMoverCost / totalCost) * 100 },
      { name: 'Packing', amount: packingCost, percent: (packingCost / totalCost) * 100 },
      { name: 'Supplies', amount: suppliesCost, percent: (suppliesCost / totalCost) * 100 },
      { name: 'Storage', amount: totalStorageCost, percent: (totalStorageCost / totalCost) * 100 },
      { name: 'Travel', amount: travelTotal, percent: (travelTotal / totalCost) * 100 },
      { name: 'Setup', amount: setupCosts, percent: (setupCosts / totalCost) * 100 },
      { name: 'Insurance', amount: insurance, percent: (insurance / totalCost) * 100 }
    ].filter(c => c.amount > 0);

    // Savings opportunities
    const savingsOpportunities: { action: string; savings: number }[] = [];

    if (hiringMovers === 'full') {
      savingsOpportunities.push({ action: 'Self-move or hybrid approach', savings: moverCost * 0.5 });
    }

    if (packingService === 'full') {
      savingsOpportunities.push({ action: 'Pack yourself', savings: 400 });
    }

    if (storageNeeded === 'yes' && storageMos > 2) {
      savingsOpportunities.push({ action: 'Minimize storage duration', savings: monthlyStorageCost * storageMos * 0.3 });
    }

    if (travelMethod === 'fly' && people > 2) {
      savingsOpportunities.push({ action: 'Consider driving instead', savings: (people - 1) * 300 });
    }

    const totalPotentialSavings = savingsOpportunities.reduce((sum, o) => sum + o.savings, 0);

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget estimate by $${Math.abs(budgetVariance).toFixed(0)} - adjust approach');
    }

    if (moveDistance === 'crossCountry' && hiringMovers === 'full') {
      recommendations.push('Cross-country move - compare quotes from multiple movers');
    }

    if (packingService === 'self' && currentSize > 1500) {
      recommendations.push('Large home self-packing - start early, buy supplies in bulk');
    }

    if (storageNeeded === 'yes') {
      recommendations.push('Storage needed - declutter before move to reduce storage');
    }

    if (distance > 100 && travelMethod === 'fly') {
      recommendations.push('Long distance - weigh flying vs driving costs');
    }

    return {
      totalCost,
      budgetVariance,
      isOverBudget,
      perPersonCost,
      categories,
      savingsOpportunities,
      totalPotentialSavings,
      recommendations,
      budget,
      spending,
      people,
      moverCost,
      adjustedMoverCost
    };
  }, [moveDistance, moveSize, monthlyBudget, currentHomeSize, newHomeSize, numberOfPeople, hiringMovers, packingService, storageNeeded, storageMonths, travelDistance, travelMethod, vehicleCount, hotelNights, insuranceCost, currentSpending]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Moving Cost Calculator</h1>
      <p className="text-gray-600 mb-6">Estimate relocation expenses including movers, packing, travel, and storage</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Move Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Move Distance</label>
            <select
              value={moveDistance}
              onChange={(e) => setMoveDistance(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="local">Local (same city)</option>
              <option value="long">Long distance (same state)</option>
              <option value="crossCountry">Cross-country</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Size</label>
            <select
              value={moveSize}
              onChange={(e) => setMoveSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="studio">Studio/Small</option>
              <option value="1br">1 Bedroom</option>
              <option value="2br">2 Bedroom</option>
              <option value="3br">3 Bedroom</option>
              <option value="4br">4+ Bedroom</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Size (sq ft)</label>
              <input
                type="number"
                value={currentHomeSize}
                onChange={(e) => setCurrentHomeSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Size (sq ft)</label>
              <input
                type="number"
                value={newHomeSize}
                onChange={(e) => setNewHomeSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of People</label>
              <input
                type="number"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost ($)</label>
            <input
              type="number"
              value={currentSpending}
              onChange={(e) => setCurrentSpending(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Services & Travel</h3>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Movers</label>
              <select
                value={hiringMovers}
                onChange={(e) => setHiringMovers(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="full">Full service</option>
                <option value="partial">Partial (load/unload)</option>
                <option value="self">Self-move (truck rental)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Packing</label>
              <select
                value={packingService}
                onChange={(e) => setPackingService(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="self">Self-pack</option>
                <option value="partial">Partial help</option>
                <option value="full">Full packing service</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Storage Needed?</label>
              <select
                value={storageNeeded}
                onChange={(e) => setStorageNeeded(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Storage Months</label>
              <input
                type="number"
                value={storageMonths}
                onChange={(e) => setStorageMonths(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Distance (mi)</label>
              <input
                type="number"
                value={travelDistance}
                onChange={(e) => setTravelDistance(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Method</label>
              <select
                value={travelMethod}
                onChange={(e) => setTravelMethod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="drive">Drive</option>
                <option value="fly">Fly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicles</label>
              <input
                type="number"
                value={vehicleCount}
                onChange={(e) => setVehicleCount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Nights</label>
              <input
                type="number"
                value={hotelNights}
                onChange={(e) => setHotelNights(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Moving Insurance ($)</label>
            <input
              type="number"
              value={insuranceCost}
              onChange={(e) => setInsuranceCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Moving Cost Estimate</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Estimated Total</h4>
              <p className="text-xl font-bold text-orange-700">$${result.totalCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">All moving expenses</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Per Person</h4>
              <p className="text-xl font-bold text-blue-700">$${result.perPersonCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.people} people moving</p>
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
                    <span className="font-bold text-orange-600">$${cat.amount.toFixed(0)}</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <h4 className="font-medium text-blue-800">Mover Cost Reference</h4>
            <p className="text-sm mt-1 text-blue-700">
              Base mover cost: $${result.moverCost} | Adjusted: $${result.adjustedMoverCost.toFixed(0)}
            </p>
            <p className="text-sm text-blue-700">
              Local moves: $400-1800 | Long distance: $1500-6000 | Cross-country: $2500-10000
            </p>
          </div>

          {result.savingsOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Cost Reduction Ideas</h4>
              <div className="space-y-2 mt-2">
                {result.savingsOpportunities.map((opp, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">{opp.action}</span>
                    <span className="font-bold text-green-600">-$${opp.savings.toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2 text-gray-600">
                Potential savings: <span className="font-bold text-green-700">$${result.totalPotentialSavings.toFixed(0)}</span>
              </p>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Moving Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-orange-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Local moves cost $400-1,800, long-distance $1,500-6,000, cross-country $2,500-10,000. Full-service movers handle everything, self-move costs 80% less. Packing adds $100-500. Storage $50-200/month. Budget for deposits, utility setup, travel costs, and insurance. Declutter before moving to reduce costs. Get multiple quotes from movers.</p>
      </div>
    </div>
  );
}